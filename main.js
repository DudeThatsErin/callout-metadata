var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CalloutMetadataPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/parser.ts
function parseMetadata(raw) {
  const result = {};
  const tokens = raw.split("|").map((t) => t.trim()).filter(Boolean);
  for (const token of tokens) {
    if (token.includes("=")) {
      const eq = token.indexOf("=");
      const key = token.substring(0, eq).toLowerCase();
      const value = token.substring(eq + 1);
      if (key === "css") {
        const classes = value.split(/[,\s]+/).filter(Boolean);
        result.css = result.css ? result.css + " " + classes.join(" ") : classes.join(" ");
      }
      continue;
    }
    if (/^\d+$/.test(token)) {
      result.width = Number(token);
      continue;
    }
    switch (token.toLowerCase()) {
      case "left":
      case "right":
      case "center":
        result.align = token.toLowerCase();
        continue;
      case "shadow":
        result.shadow = true;
        continue;
      case "rounded":
        result.rounded = true;
        continue;
      case "outline":
        result.outline = true;
        continue;
    }
    result.color = token;
  }
  return result;
}

// src/utils.ts
var _ctx;
function getContext() {
  if (_ctx === void 0) {
    const c = document.createElement("canvas");
    c.width = 1;
    c.height = 1;
    _ctx = c.getContext("2d");
  }
  return _ctx;
}
function parseHex(hex) {
  const m = hex.match(/^#([0-9a-f]{3,8})$/i);
  if (!m)
    return null;
  let h = m[1];
  if (h.length === 3)
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length !== 6 && h.length !== 8)
    return null;
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}
function resolveColor(input) {
  if (!input)
    return null;
  if (/^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$/.test(input)) {
    return input;
  }
  if (input.startsWith("#")) {
    return parseHex(input);
  }
  const ctx = getContext();
  if (!ctx)
    return null;
  const sentinel = "#010203";
  ctx.fillStyle = sentinel;
  ctx.fillStyle = input;
  if (ctx.fillStyle === sentinel && input.toLowerCase() !== sentinel) {
    return null;
  }
  const resolved = ctx.fillStyle;
  if (resolved.startsWith("#")) {
    return parseHex(resolved);
  }
  const m = resolved.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  return m ? `${m[1]}, ${m[2]}, ${m[3]}` : null;
}

// src/processor.ts
var PROCESSED = "data-cm-processed";
function processCallouts(container) {
  const callouts = container.querySelectorAll(
    `.callout[data-callout-metadata]:not([${PROCESSED}])`
  );
  callouts.forEach((el) => {
    el.setAttribute(PROCESSED, "");
    const raw = el.getAttribute("data-callout-metadata");
    if (!raw)
      return;
    applyMetadata(el, parseMetadata(raw));
  });
}
function applyMetadata(el, meta) {
  const wrapper = el.closest(".cm-embed-block");
  if (meta.width != null) {
    el.dataset.width = String(meta.width);
    if (wrapper) {
      wrapper.style.width = `${meta.width}%`;
      el.style.width = "100%";
    } else {
      el.style.width = `${meta.width}%`;
    }
  }
  if (meta.color) {
    const rgb = resolveColor(meta.color);
    if (rgb) {
      el.style.setProperty("--callout-color", rgb);
    }
    el.dataset.color = meta.color;
  }
  if (meta.align) {
    el.dataset.align = meta.align;
    if (wrapper) {
      wrapper.dataset.align = meta.align;
    }
  }
  if (meta.shadow) {
    el.setAttribute("data-shadow", "");
  }
  if (meta.rounded) {
    el.setAttribute("data-rounded", "");
  }
  if (meta.outline) {
    el.setAttribute("data-outline", "");
  }
  if (meta.css) {
    meta.css.split(/\s+/).forEach((cls) => {
      if (cls)
        el.classList.add(cls);
    });
    el.dataset.css = meta.css;
  }
}

// src/settings.ts
var import_obsidian = require("obsidian");

// src/constants.ts
var SUPPORT_LINKS = [
  {
    text: "\u2615 Buy Me a Coffee",
    href: "https://buymeacoffee.com/erinskidds",
    cls: "coffee-link"
  },
  {
    text: "\u2B50 Star on GitHub",
    href: "https://github.com/DudeThatsErin/CalloutMetadata",
    cls: "github-link"
  },
  {
    text: "\u{1F41B} Report Issues",
    href: "https://github.com/DudeThatsErin/CalloutMetadata/issues",
    cls: "issues-link"
  },
  {
    text: "\u{1F4AC} Discord Support",
    href: "https://discord.gg/XcJWhE3SEA",
    cls: "discord-link"
  }
];
var PLUGIN_INFO = {
  name: "Callout Metadata",
  version: "1.0.0",
  author: "Erin Skidds"
};

// src/settings.ts
var CalloutMetadataSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", {
      text: "Callout Metadata"
    });
    this.addSupportLinks(containerEl);
    containerEl.createEl("h3", {
      text: "Appearance"
    });
    new import_obsidian.Setting(containerEl).setName("Border Radius").setDesc("Corner radius for rounded callouts").addSlider((slider) => {
      slider.setLimits(0, 32, 1).setValue(this.plugin.settings.roundedRadius).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.roundedRadius = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Shadow Strength").setDesc("CSS shadow offset and blur").addText((text) => {
      text.setValue(this.plugin.settings.shadowStrength).onChange(async (value) => {
        this.plugin.settings.shadowStrength = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Shadow Color (Light)").setDesc("Shadow color in light mode").addColorPicker((color) => {
      color.setValue(this.plugin.settings.shadowColorLight).onChange(async (value) => {
        this.plugin.settings.shadowColorLight = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Shadow Color (Dark)").setDesc("Shadow color in dark mode").addColorPicker((color) => {
      color.setValue(this.plugin.settings.shadowColorDark).onChange(async (value) => {
        this.plugin.settings.shadowColorDark = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Outline Width").setDesc("Border width for outline callouts").addSlider((slider) => {
      slider.setLimits(1, 6, 1).setValue(this.plugin.settings.outlineWidth).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.outlineWidth = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Outline Color (Light)").setDesc("Outline color in light mode").addColorPicker((color) => {
      color.setValue(this.plugin.settings.outlineColorLight).onChange(async (value) => {
        this.plugin.settings.outlineColorLight = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Outline Color (Dark)").setDesc("Outline color in dark mode").addColorPicker((color) => {
      color.setValue(this.plugin.settings.outlineColorDark).onChange(async (value) => {
        this.plugin.settings.outlineColorDark = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Outline Style").setDesc("Border style for outline callouts").addDropdown((dropdown) => {
      dropdown.addOption("solid", "Solid").addOption("dashed", "Dashed").addOption("dotted", "Dotted").setValue(this.plugin.settings.outlineStyle).onChange(async (value) => {
        this.plugin.settings.outlineStyle = value;
        await this.plugin.saveSettings();
        this.plugin.applyCSSVariables();
      });
    });
    containerEl.createEl("h3", {
      text: "Tokens"
    });
    const code = containerEl.createEl("pre");
    code.createEl("code", {
      text: "> [!note|50|orange|center|shadow|rounded|outline]"
    });
    const list = containerEl.createEl("ul");
    [
      "Number (0-100) \u2192 width percentage",
      "left / center / right \u2192 alignment",
      "shadow \u2192 adds drop shadow",
      "rounded \u2192 rounded corners",
      "outline \u2192 outline border",
      "css=classname \u2192 custom CSS class",
      "Anything else \u2192 callout color"
    ].forEach((item) => {
      list.createEl("li", {
        text: item
      });
    });
    containerEl.createEl("h3", {
      text: "About"
    });
    containerEl.createEl("p", {
      text: `${PLUGIN_INFO.name} v${PLUGIN_INFO.version} by ${PLUGIN_INFO.author}`
    });
  }
  addSupportLinks(containerEl) {
    containerEl.createEl("h3", {
      text: "Support & Links"
    });
    const wrapper = containerEl.createDiv();
    wrapper.addClass(
      "callout-metadata-support"
    );
    SUPPORT_LINKS.forEach((link) => {
      const a = wrapper.createEl("a", {
        text: link.text,
        href: link.href
      });
      a.className = link.cls;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }
};

// src/types.ts
var DEFAULT_SETTINGS = {
  roundedRadius: 12,
  shadowStrength: "0 2px 8px",
  shadowColorLight: "#00000026",
  shadowColorDark: "#00000040",
  outlineWidth: 2,
  outlineColorLight: "#888888",
  outlineColorDark: "#aaaaaa",
  outlineStyle: "solid"
};

// src/main.ts
var CalloutMetadataPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.debouncedProcess = (0, import_obsidian2.debounce)(
      () => this.processAllViews(),
      200,
      true
    );
  }
  async onload() {
    await this.loadSettings();
    this.applyCSSVariables();
    this.registerMarkdownPostProcessor((el) => {
      processCallouts(el);
    });
    this.app.workspace.onLayoutReady(() => {
      this.processAllViews();
      this.applyCSSVariables();
      this.app.workspace.trigger("css-change");
    });
    this.registerEvent(
      this.app.workspace.on(
        "layout-change",
        () => {
          this.debouncedProcess();
        }
      )
    );
    this.registerEvent(
      this.app.workspace.on(
        "css-change",
        () => {
          this.applyCSSVariables();
        }
      )
    );
    this.addSettingTab(
      new CalloutMetadataSettingTab(
        this.app,
        this
      )
    );
  }
  /*
   * Inject plugin settings into CSS variables
   */
  applyCSSVariables() {
    const root = document.documentElement;
    const dark = document.body.classList.contains(
      "theme-dark"
    );
    root.style.setProperty(
      "--cm-rounded-radius",
      `${this.settings.roundedRadius}px`
    );
    root.style.setProperty(
      "--cm-shadow-strength",
      this.settings.shadowStrength
    );
    root.style.setProperty(
      "--cm-shadow-color",
      dark ? this.settings.shadowColorDark : this.settings.shadowColorLight
    );
    root.style.setProperty(
      "--cm-outline-width",
      `${this.settings.outlineWidth}px`
    );
    root.style.setProperty(
      "--cm-outline-color",
      dark ? this.settings.outlineColorDark : this.settings.outlineColorLight
    );
    document.body.classList.remove(
      "cm-outline-solid",
      "cm-outline-dashed",
      "cm-outline-dotted"
    );
    document.body.classList.add(
      `cm-outline-${this.settings.outlineStyle}`
    );
  }
  processAllViews() {
    this.app.workspace.iterateAllLeaves(
      (leaf) => {
        if (leaf.view instanceof import_obsidian2.MarkdownView) {
          processCallouts(
            leaf.view.containerEl
          );
        }
      }
    );
  }
  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }
  async saveSettings() {
    await this.saveData(
      this.settings
    );
  }
};
