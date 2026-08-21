const {
    Plugin,
    PluginSettingTab,
    Setting,
    MarkdownView,
} = require("obsidian");

const DEFAULT_SETTINGS = {
    roundedRadius: 12,
    shadowStrength: "0 2px 8px",
    shadowColorLight: "#00000026",
    shadowColorDark: "#00000040",
    outlineWidth: 2,
    outlineColorLight: "#888888",
    outlineColorDark: "#aaaaaa",
    outlineStyle: "solid",
    enableGlass: true,
    enableGradient: true,
    enableCompact: true,
    enableHover: true,
    enableSticky: true,
    showSupportLinks: true,
};

const SUPPORT_LINKS = [
    {
        text: "☕ Buy Me a Coffee",
        href: "https://buymeacoffee.com/erinskidds",
        cls: "coffee-link",
    },
    {
        text: "⭐ Star on GitHub",
        href: "https://github.com/DudeThatsErin/CalloutMetadata",
        cls: "github-link",
    },
    {
        text: "🐛 Report Issues",
        href: "https://github.com/DudeThatsErin/CalloutMetadata/issues",
        cls: "issues-link",
    },
    {
        text: "💬 Discord Support",
        href: "https://discord.gg/XcJWhE3SEA",
        cls: "discord-link",
    },
];

const STYLE_TOKENS = new Set([
    "shadow",
    "rounded",
    "outline",
    "glass",
    "gradient",
    "borderless",
    "compact",
    "hover",
    "sticky",
]);

const STYLE_FLAGS = Array.from(STYLE_TOKENS);
const CALLOUT_SELECTOR = ".callout[data-callout-metadata]";
const APPLIED_ATTR = "data-cm-metadata-applied";
const ADDED_CLASSES_ATTR = "data-cm-added-classes";

function parseMetadata(raw) {
    const result = {
        cssClasses: [],
    };

    const tokens = String(raw || "")
        .split("|")
        .map((token) => token.trim())
        .filter(Boolean);

    for (const token of tokens) {
        if (token.includes("=")) {
            const separator = token.indexOf("=");
            const key = token.slice(0, separator).trim().toLowerCase();
            const value = token.slice(separator + 1).trim();

            if (key === "css" && value) {
                const classes = value
                    .split(/[\s,]+/)
                    .map((item) => item.trim())
                    .filter(Boolean);

                result.cssClasses.push(...classes);
            }

            continue;
        }

        if (/^\d+$/.test(token)) {
            const width = Number(token);
            result.width = Math.min(100, Math.max(0, width));
            continue;
        }

        const lower = token.toLowerCase();

        if (lower === "left" || lower === "center" || lower === "right") {
            result.align = lower;
            continue;
        }

        if (STYLE_TOKENS.has(lower)) {
            result[lower] = true;
            continue;
        }

        result.color = token;
    }

    result.cssClasses = Array.from(new Set(result.cssClasses));
    return result;
}

function parseHexColor(input) {
    const match = String(input || "").match(/^#([0-9a-f]{3,8})$/i);
    if (!match) return null;

    let hex = match[1];

    if (hex.length === 3 || hex.length === 4) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("");
    }

    if (hex.length !== 6 && hex.length !== 8) return null;

    return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
    ].join(", ");
}

function parseComputedColor(value) {
    const rgbMatch = String(value || "").match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i
    );

    if (rgbMatch) {
        return [
            Math.round(Number(rgbMatch[1])),
            Math.round(Number(rgbMatch[2])),
            Math.round(Number(rgbMatch[3])),
        ].join(", ");
    }

    return parseHexColor(value);
}

function resolveColor(input, doc) {
    if (!input || !doc) return null;

    const trimmed = String(input).trim();

    if (/^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$/.test(trimmed)) {
        const values = trimmed.split(",").map((part) => Number(part.trim()));
        if (values.every((value) => value >= 0 && value <= 255)) {
            return values.join(", ");
        }
        return null;
    }

    if (trimmed.startsWith("#")) {
        return parseHexColor(trimmed);
    }

    const win = doc.defaultView;
    const parent = doc.body || doc.documentElement;

    if (!win || !parent) return null;

    const probe = doc.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.color = trimmed;

    if (!probe.style.color && !trimmed.startsWith("var(")) {
        return null;
    }

    parent.appendChild(probe);

    let computed = "";
    try {
        computed = win.getComputedStyle(probe).color;
    } finally {
        probe.remove();
    }

    return parseComputedColor(computed);
}

function getLivePreviewWrapper(el) {
    const wrapper = el.closest(".cm-embed-block");
    if (!wrapper) return null;

    return wrapper.closest(".markdown-source-view") ? wrapper : null;
}

function clearWrapperMetadata(wrapper) {
    if (!wrapper) return;

    wrapper.removeAttribute("data-cm-width");
    wrapper.removeAttribute("data-cm-align");
    wrapper.style.removeProperty("--cm-callout-width");
}

function clearAppliedMetadata(el) {
    const wrapper = getLivePreviewWrapper(el);

    const addedClasses = (el.getAttribute(ADDED_CLASSES_ATTR) || "")
        .split(/\s+/)
        .filter(Boolean);

    for (const className of addedClasses) {
        el.classList.remove(className);
    }

    el.removeAttribute(ADDED_CLASSES_ATTR);
    el.removeAttribute(APPLIED_ATTR);

    el.removeAttribute("data-width");
    el.removeAttribute("data-color");
    el.removeAttribute("data-align");
    el.removeAttribute("data-css");

    for (const flag of STYLE_FLAGS) {
        el.removeAttribute(`data-${flag}`);
    }

    el.style.removeProperty("--cm-callout-width");
    el.style.removeProperty("--callout-color");
    el.style.removeProperty("width");

    clearWrapperMetadata(wrapper);
}

function applyMetadata(el, meta) {
    const wrapper = getLivePreviewWrapper(el);

    if (meta.width != null) {
        const width = `${meta.width}%`;

        el.setAttribute("data-width", String(meta.width));
        el.style.setProperty("--cm-callout-width", width);
        el.style.width = width;

        if (wrapper) {
            wrapper.setAttribute("data-cm-width", String(meta.width));
            wrapper.style.setProperty("--cm-callout-width", width);
        }
    }

    if (meta.color) {
        const rgb = resolveColor(meta.color, el.ownerDocument);

        if (rgb) {
            // Obsidian's native callout CSS reads --callout-color as RGB channels.
            // We do not touch data-callout, --callout-icon, or the icon DOM, so the
            // original callout type and its original icon are preserved.
            el.style.setProperty("--callout-color", rgb);
            el.setAttribute("data-color", meta.color);
        }
    }

    if (meta.align) {
        el.setAttribute("data-align", meta.align);

        if (wrapper) {
            wrapper.setAttribute("data-cm-align", meta.align);
        }
    }

    for (const flag of STYLE_FLAGS) {
        if (meta[flag]) {
            el.setAttribute(`data-${flag}`, "");
        }
    }

    if (meta.cssClasses.length) {
        for (const className of meta.cssClasses) {
            el.classList.add(className);
        }

        const joined = meta.cssClasses.join(" ");
        el.setAttribute("data-css", joined);
        el.setAttribute(ADDED_CLASSES_ATTR, joined);
    }
}

function processCallout(el) {
    const raw = el.getAttribute("data-callout-metadata");
    if (raw == null) return;

    const type = el.getAttribute("data-callout") || "";
    const signature = `${type}\n${raw}`;

    if (el.getAttribute(APPLIED_ATTR) === signature) {
        return;
    }

    clearAppliedMetadata(el);
    applyMetadata(el, parseMetadata(raw));
    el.setAttribute(APPLIED_ATTR, signature);
}

function processCallouts(container) {
    if (!container) return;

    if (container.matches && container.matches(CALLOUT_SELECTOR)) {
        processCallout(container);
    }

    if (!container.querySelectorAll) return;

    for (const el of container.querySelectorAll(CALLOUT_SELECTOR)) {
        processCallout(el);
    }
}

function cleanupCallouts(container) {
    if (!container || !container.querySelectorAll) return;

    const selector = `.callout[${APPLIED_ATTR}]`;

    if (container.matches && container.matches(selector)) {
        clearAppliedMetadata(container);
    }

    for (const el of container.querySelectorAll(selector)) {
        clearAppliedMetadata(el);
    }
}

function addHeading(containerEl, text) {
    const heading = containerEl.ownerDocument.createElement("h2");
    heading.textContent = text;
    containerEl.appendChild(heading);
}

class CalloutMetadataSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        addHeading(containerEl, "Support & Links");

        const support = new Setting(containerEl);
        support.settingEl.classList.add("support-setting");
        support.nameEl.remove();
        support.descEl.remove();
        support.controlEl.style.cssText =
            "display:flex;flex-wrap:wrap;gap:8px;padding:4px 0;justify-content:flex-start;width:100%";

        for (const { text, href, cls } of SUPPORT_LINKS) {
            const link = support.controlEl.ownerDocument.createElement("a");
            link.textContent = text;
            link.href = href;
            link.className = `support-link ${cls}`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            support.controlEl.appendChild(link);
        }

        addHeading(containerEl, "Rounded Corners");

        new Setting(containerEl)
            .setName("Border Radius")
            .setDesc("Corner radius for callouts using the rounded token.")
            .addSlider((slider) => {
                slider
                    .setLimits(0, 32, 1)
                    .setValue(this.plugin.settings.roundedRadius)
                    .setDynamicTooltip()
                    .onChange(async (value) => {
                        this.plugin.settings.roundedRadius = value;
                        await this.plugin.saveSettings();
                    });
            });

        addHeading(containerEl, "Shadow");

        new Setting(containerEl)
            .setName("Shadow Spread")
            .setDesc("Box-shadow offset and blur for callouts using the shadow token.")
            .addText((text) => {
                text
                    .setPlaceholder("0 2px 8px")
                    .setValue(this.plugin.settings.shadowStrength)
                    .onChange(async (value) => {
                        this.plugin.settings.shadowStrength = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Shadow Color (Light Mode)")
            .setDesc("Shadow color when using the light theme.")
            .addColorPicker((picker) => {
                picker
                    .setValue(this.plugin.settings.shadowColorLight)
                    .onChange(async (value) => {
                        this.plugin.settings.shadowColorLight = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Shadow Color (Dark Mode)")
            .setDesc("Shadow color when using the dark theme.")
            .addColorPicker((picker) => {
                picker
                    .setValue(this.plugin.settings.shadowColorDark)
                    .onChange(async (value) => {
                        this.plugin.settings.shadowColorDark = value;
                        await this.plugin.saveSettings();
                    });
            });

        addHeading(containerEl, "Outline");

        new Setting(containerEl)
            .setName("Outline Width")
            .setDesc("Border thickness for callouts using the outline token.")
            .addSlider((slider) => {
                slider
                    .setLimits(1, 6, 1)
                    .setValue(this.plugin.settings.outlineWidth)
                    .setDynamicTooltip()
                    .onChange(async (value) => {
                        this.plugin.settings.outlineWidth = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Outline Style")
            .setDesc("Border style for callouts using the outline token.")
            .addDropdown((dropdown) => {
                dropdown
                    .addOption("solid", "Solid")
                    .addOption("dashed", "Dashed")
                    .addOption("dotted", "Dotted")
                    .setValue(this.plugin.settings.outlineStyle)
                    .onChange(async (value) => {
                        this.plugin.settings.outlineStyle = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Outline Color (Light Mode)")
            .setDesc("Outline border color when using the light theme.")
            .addColorPicker((picker) => {
                picker
                    .setValue(this.plugin.settings.outlineColorLight)
                    .onChange(async (value) => {
                        this.plugin.settings.outlineColorLight = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Outline Color (Dark Mode)")
            .setDesc("Outline border color when using the dark theme.")
            .addColorPicker((picker) => {
                picker
                    .setValue(this.plugin.settings.outlineColorDark)
                    .onChange(async (value) => {
                        this.plugin.settings.outlineColorDark = value;
                        await this.plugin.saveSettings();
                    });
            });

        addHeading(containerEl, "Effects");

        this.addEffectToggle(
            containerEl,
            "Glass",
            "Enable the glass effect token for callouts.",
            "enableGlass"
        );

        this.addEffectToggle(
            containerEl,
            "Gradient",
            "Enable the gradient effect token for callouts.",
            "enableGradient"
        );

        this.addEffectToggle(
            containerEl,
            "Compact",
            "Enable the compact token to reduce callout padding.",
            "enableCompact"
        );

        this.addEffectToggle(
            containerEl,
            "Hover",
            "Enable the hover animation token for callouts.",
            "enableHover"
        );

        this.addEffectToggle(
            containerEl,
            "Sticky",
            "Enable the sticky positioning token for callouts.",
            "enableSticky"
        );
    }

    addEffectToggle(containerEl, name, desc, key) {
        new Setting(containerEl)
            .setName(name)
            .setDesc(desc)
            .addToggle((toggle) => {
                toggle
                    .setValue(Boolean(this.plugin.settings[key]))
                    .onChange(async (value) => {
                        this.plugin.settings[key] = value;
                        await this.plugin.saveSettings();
                    });
            });
    }
}

module.exports = class CalloutMetadataPlugin extends Plugin {
    async onload() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        this.observers = new Map();
        this.processTimer = null;

        this.registerMarkdownPostProcessor((el) => {
            processCallouts(el);
        });

        this.addSettingTab(new CalloutMetadataSettingTab(this.app, this));

        this.registerEvent(
            this.app.workspace.on("layout-change", () => {
                this.scheduleRefresh();
            })
        );

        this.registerEvent(
            this.app.workspace.on("css-change", () => {
                this.applySettingsToAllDocuments();
                this.processAllViews();
            })
        );

        this.app.workspace.onLayoutReady(() => {
            this.refreshObservers();
            this.applySettingsToAllDocuments();
            this.processAllViews();
        });
    }

    onunload() {
        if (this.processTimer) {
            clearTimeout(this.processTimer);
            this.processTimer = null;
        }

        for (const observer of this.observers.values()) {
            observer.disconnect();
        }
        this.observers.clear();

        this.app.workspace.iterateAllLeaves((leaf) => {
            if (leaf.view instanceof MarkdownView) {
                cleanupCallouts(leaf.view.containerEl);
            }
        });

        for (const doc of this.getWorkspaceDocuments()) {
            this.removeSettingsFromDocument(doc);
        }
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.applySettingsToAllDocuments();
        this.processAllViews();
    }

    scheduleRefresh() {
        if (this.processTimer) {
            clearTimeout(this.processTimer);
        }

        this.processTimer = setTimeout(() => {
            this.processTimer = null;
            this.refreshObservers();
            this.applySettingsToAllDocuments();
            this.processAllViews();
        }, 100);
    }

    processAllViews() {
        this.app.workspace.iterateAllLeaves((leaf) => {
            if (leaf.view instanceof MarkdownView) {
                processCallouts(leaf.view.containerEl);
            }
        });
    }

    refreshObservers() {
        const activeContainers = new Set();

        this.app.workspace.iterateAllLeaves((leaf) => {
            if (!(leaf.view instanceof MarkdownView)) return;

            const container = leaf.view.containerEl;
            activeContainers.add(container);

            if (this.observers.has(container)) return;

            const win = container.ownerDocument.defaultView;
            const MutationObserverCtor = win && win.MutationObserver;
            if (!MutationObserverCtor) return;

            const observer = new MutationObserverCtor(() => {
                processCallouts(container);
            });

            observer.observe(container, {
                subtree: true,
                childList: true,
                attributes: true,
                attributeFilter: ["data-callout", "data-callout-metadata"],
            });

            this.observers.set(container, observer);
        });

        for (const [container, observer] of this.observers.entries()) {
            if (!activeContainers.has(container) || !container.isConnected) {
                observer.disconnect();
                this.observers.delete(container);
            }
        }
    }

    getWorkspaceDocuments() {
        const docs = new Set();

        if (this.app.workspace.containerEl && this.app.workspace.containerEl.ownerDocument) {
            docs.add(this.app.workspace.containerEl.ownerDocument);
        }

        this.app.workspace.iterateAllLeaves((leaf) => {
            if (leaf.view && leaf.view.containerEl && leaf.view.containerEl.ownerDocument) {
                docs.add(leaf.view.containerEl.ownerDocument);
            }
        });

        return docs;
    }

    applySettingsToAllDocuments() {
        for (const doc of this.getWorkspaceDocuments()) {
            this.applySettingsToDocument(doc);
        }
    }

    applySettingsToDocument(doc) {
        if (!doc || !doc.documentElement || !doc.body) return;

        const root = doc.documentElement;
        const body = doc.body;
        const dark = body.classList.contains("theme-dark");

        root.style.setProperty("--cm-rounded-radius", `${this.settings.roundedRadius}px`);
        root.style.setProperty("--cm-shadow-strength", this.settings.shadowStrength);
        root.style.setProperty(
            "--cm-shadow-color",
            dark ? this.settings.shadowColorDark : this.settings.shadowColorLight
        );
        root.style.setProperty("--cm-outline-width", `${this.settings.outlineWidth}px`);
        root.style.setProperty(
            "--cm-outline-color",
            dark ? this.settings.outlineColorDark : this.settings.outlineColorLight
        );

        body.classList.remove(
            "cm-outline-solid",
            "cm-outline-dashed",
            "cm-outline-dotted"
        );
        body.classList.add(`cm-outline-${this.settings.outlineStyle}`);

        body.classList.toggle("cm-glass-disabled", !this.settings.enableGlass);
        body.classList.toggle("cm-gradient-disabled", !this.settings.enableGradient);
        body.classList.toggle("cm-compact-disabled", !this.settings.enableCompact);
        body.classList.toggle("cm-hover-disabled", !this.settings.enableHover);
        body.classList.toggle("cm-sticky-disabled", !this.settings.enableSticky);
    }

    removeSettingsFromDocument(doc) {
        if (!doc || !doc.documentElement || !doc.body) return;

        const root = doc.documentElement;
        const body = doc.body;

        root.style.removeProperty("--cm-rounded-radius");
        root.style.removeProperty("--cm-shadow-strength");
        root.style.removeProperty("--cm-shadow-color");
        root.style.removeProperty("--cm-outline-width");
        root.style.removeProperty("--cm-outline-color");

        body.classList.remove(
            "cm-outline-solid",
            "cm-outline-dashed",
            "cm-outline-dotted",
            "cm-glass-disabled",
            "cm-gradient-disabled",
            "cm-compact-disabled",
            "cm-hover-disabled",
            "cm-sticky-disabled"
        );
    }
};
