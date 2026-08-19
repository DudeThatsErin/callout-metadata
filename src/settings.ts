import {
    App,
    PluginSettingTab,
    Setting
} from "obsidian";

import type CalloutMetadataPlugin from "./main";

import {
    SUPPORT_LINKS
} from "./constants";


export class CalloutMetadataSettingTab extends PluginSettingTab {

    plugin: CalloutMetadataPlugin;

    constructor(
        app: App,
        plugin: CalloutMetadataPlugin
    ) {
        super(app, plugin);
        this.plugin = plugin;
    }

    getSettingDefinitions() {
        const self = this;
        const s = () => self.plugin.settings;

        return [

            {
                type: "group" as const,
                heading: "Support & Links",
                items: [{
                    name: "Support & links",
                    searchable: false,
                    render: (setting: Setting) => {
                        setting.nameEl.remove();
                        setting.descEl.remove();
                        setting.controlEl.style.cssText =
                            "display:flex;flex-wrap:wrap;gap:8px;padding:4px 0;justify-content:flex-start;width:100%";
                        SUPPORT_LINKS.forEach(({ text, href, cls }) => {
                            const a = setting.controlEl.createEl("a", { text, href });
                            a.className = `support-link ${cls}`;
                            a.target = "_blank";
                            a.rel = "noopener noreferrer";
                        });
                    },
                }],
            },

            {
                type: "group" as const,
                heading: "Rounded Corners",
                items: [
                    {
                        name: "Border Radius",
                        desc: "Corner radius for callouts using the rounded token.",
                        aliases: ["rounded", "corners", "border radius"],
                        render: (setting: Setting) => {
                            setting.addSlider(slider => {
                                slider
                                    .setLimits(0, 32, 1)
                                    .setValue(s().roundedRadius)
                                    .setDynamicTooltip()
                                    .onChange(async (value: number) => {
                                        self.plugin.settings.roundedRadius = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                ],
            },

            {
                type: "group" as const,
                heading: "Shadow",
                items: [
                    {
                        name: "Shadow Spread",
                        desc: "Box-shadow offset and blur for callouts using the shadow token.",
                        aliases: ["shadow strength", "box shadow", "shadow size"],
                        render: (setting: Setting) => {
                            setting.addText(text => {
                                text
                                    .setPlaceholder("0 2px 8px")
                                    .setValue(s().shadowStrength)
                                    .onChange(async (value: string) => {
                                        self.plugin.settings.shadowStrength = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Shadow Color (Light Mode)",
                        desc: "Shadow color when using the light theme.",
                        aliases: ["shadow color light", "light shadow"],
                        render: (setting: Setting) => {
                            setting.addColorPicker(picker => {
                                picker
                                    .setValue(s().shadowColorLight)
                                    .onChange(async (value: string) => {
                                        self.plugin.settings.shadowColorLight = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Shadow Color (Dark Mode)",
                        desc: "Shadow color when using the dark theme.",
                        aliases: ["shadow color dark", "dark shadow"],
                        render: (setting: Setting) => {
                            setting.addColorPicker(picker => {
                                picker
                                    .setValue(s().shadowColorDark)
                                    .onChange(async (value: string) => {
                                        self.plugin.settings.shadowColorDark = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                ],
            },

            {
                type: "group" as const,
                heading: "Outline",
                items: [
                    {
                        name: "Outline Width",
                        desc: "Border thickness for callouts using the outline token.",
                        aliases: ["outline size", "border width", "outline thickness"],
                        render: (setting: Setting) => {
                            setting.addSlider(slider => {
                                slider
                                    .setLimits(1, 6, 1)
                                    .setValue(s().outlineWidth)
                                    .setDynamicTooltip()
                                    .onChange(async (value: number) => {
                                        self.plugin.settings.outlineWidth = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Outline Style",
                        desc: "Border style for callouts using the outline token.",
                        aliases: ["outline dashed", "outline dotted", "border style"],
                        render: (setting: Setting) => {
                            setting.addDropdown(dropdown => {
                                dropdown
                                    .addOption("solid", "Solid")
                                    .addOption("dashed", "Dashed")
                                    .addOption("dotted", "Dotted")
                                    .setValue(s().outlineStyle)
                                    .onChange(async (value: string) => {
                                        self.plugin.settings.outlineStyle =
                                            value as "solid" | "dashed" | "dotted";
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Outline Color (Light Mode)",
                        desc: "Outline border color when using the light theme.",
                        aliases: ["outline color light", "light outline", "border color light"],
                        render: (setting: Setting) => {
                            setting.addColorPicker(picker => {
                                picker
                                    .setValue(s().outlineColorLight)
                                    .onChange(async (value: string) => {
                                        self.plugin.settings.outlineColorLight = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Outline Color (Dark Mode)",
                        desc: "Outline border color when using the dark theme.",
                        aliases: ["outline color dark", "dark outline", "border color dark"],
                        render: (setting: Setting) => {
                            setting.addColorPicker(picker => {
                                picker
                                    .setValue(s().outlineColorDark)
                                    .onChange(async (value: string) => {
                                        self.plugin.settings.outlineColorDark = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                ],
            },

            {
                type: "group" as const,
                heading: "Effects",
                items: [
                    {
                        name: "Glass",
                        desc: "Enable the glass effect token for callouts.",
                        aliases: ["glass effect", "blur", "frosted", "transparent"],
                        render: (setting: Setting) => {
                            setting.addToggle(toggle => {
                                toggle
                                    .setValue(s().enableGlass)
                                    .onChange(async (value: boolean) => {
                                        self.plugin.settings.enableGlass = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Gradient",
                        desc: "Enable the gradient effect token for callouts.",
                        aliases: ["gradient effect", "gradient background"],
                        render: (setting: Setting) => {
                            setting.addToggle(toggle => {
                                toggle
                                    .setValue(s().enableGradient)
                                    .onChange(async (value: boolean) => {
                                        self.plugin.settings.enableGradient = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Compact",
                        desc: "Enable the compact token to reduce callout padding.",
                        aliases: ["compact mode", "small padding", "tight"],
                        render: (setting: Setting) => {
                            setting.addToggle(toggle => {
                                toggle
                                    .setValue(s().enableCompact)
                                    .onChange(async (value: boolean) => {
                                        self.plugin.settings.enableCompact = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Hover",
                        desc: "Enable the hover animation token for callouts.",
                        aliases: ["hover effect", "hover animation", "lift"],
                        render: (setting: Setting) => {
                            setting.addToggle(toggle => {
                                toggle
                                    .setValue(s().enableHover)
                                    .onChange(async (value: boolean) => {
                                        self.plugin.settings.enableHover = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                    {
                        name: "Sticky",
                        desc: "Enable the sticky positioning token for callouts.",
                        aliases: ["sticky position", "pinned", "fixed"],
                        render: (setting: Setting) => {
                            setting.addToggle(toggle => {
                                toggle
                                    .setValue(s().enableSticky)
                                    .onChange(async (value: boolean) => {
                                        self.plugin.settings.enableSticky = value;
                                        await self.plugin.saveSettings();
                                    });
                            });
                        },
                    },
                ],
            },

        ];
    }
}
