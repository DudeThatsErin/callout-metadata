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

    display(): void {

        const {
            containerEl
        } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName("Callout Metadata")
            .setHeading();

        this.renderSupport(containerEl);

        this.renderAppearance(containerEl);

    }

    private async updateSettings(
        callback: () => void
    ) {

        callback();

        await this.plugin.saveSettings();

    }

    private renderSupport(
        container: HTMLElement
    ) {

        new Setting(container)
            .setName("Support & Links")
            .setDesc(
                "Support development, report bugs, or get help."
            );

        const wrapper =
            container.createDiv({
                cls: "support-container"
            });

        SUPPORT_LINKS.forEach((link) => {

            const anchor =
                wrapper.createEl(
                    "a",
                    {
                        text: link.text,
                        href: link.href
                    }
                );

            anchor.classList.add(
                "support-link",
                link.cls
            );

            anchor.target =
                "_blank";

            anchor.rel =
                "noopener noreferrer";

        });

    }

private renderAppearance(
    container: HTMLElement
) {

    new Setting(container)
        .setName("Appearance")
        .setHeading();

    new Setting(container)
        .setDesc(
            "These settings customize callouts that use the matching metadata tokens. They do not change every callout in your vault. For example, Border Radius only affects callouts using |rounded, shadows only affect callouts using |shadow, and outlines only affect callouts using |outline."
        );


    new Setting(container)

        .setName("Border Radius")

        .setDesc(
            "Sets the corner radius for callouts using the 'rounded' token (example: [!note|rounded])."
        )

        .addSlider((slider) => {

            slider

                .setLimits(
                    0,
                    32,
                    1
                )

                .setValue(
                    this.plugin.settings.roundedRadius
                )

                .onChange(async (value) => {

                    await this.updateSettings(
                        () => {

                            this.plugin.settings.roundedRadius =
                                value;

                        }
                    );

                });

        });


    new Setting(container)

        .setName("Shadow Strength")

        .setDesc(
            "Sets the box-shadow values for callouts using the 'shadow' token (example: [!note|shadow])."
        )

        .addText((text) => {

            text

                .setValue(
                    this.plugin.settings.shadowStrength
                )

                .onChange(async (value) => {

                    await this.updateSettings(
                        () => {

                            this.plugin.settings.shadowStrength =
                                value;

                        }
                    );

                });

        });


    new Setting(container)

        .setName("Shadow Color (Light)")

        .setDesc(
            "Sets the shadow color for 'shadow' callouts while using the light theme."
        )

        .addColorPicker((picker) => {

            picker

                .setValue(
                    this.plugin.settings.shadowColorLight
                )

                .onChange(async (value) => {

                    await this.updateSettings(
                        () => {

                            this.plugin.settings.shadowColorLight =
                                value;

                        }
                    );

                });

        });


    new Setting(container)

        .setName("Shadow Color (Dark)")

        .setDesc(
            "Sets the shadow color for 'shadow' callouts while using the dark theme."
        )

        .addColorPicker((picker) => {

            picker

                .setValue(
                    this.plugin.settings.shadowColorDark
                )

                .onChange(async (value) => {

                    await this.updateSettings(
                        () => {

                            this.plugin.settings.shadowColorDark =
                                value;

                        }
                    );

                });

        });


    new Setting(container)

        .setName("Outline Width")

        .setDesc(
            "Sets the border thickness for callouts using the 'outline' token (example: [!warning|outline])."
        )

        .addSlider((slider) => {

            slider

                .setLimits(
                    1,
                    6,
                    1
                )

                .setValue(
                    this.plugin.settings.outlineWidth
                )

                .onChange(async (value) => {

                    await this.updateSettings(
                        () => {

                            this.plugin.settings.outlineWidth =
                                value;

                        }
                    );

                });

        });


    new Setting(container)

        .setName("Outline Style")

        .setDesc(
            "Sets the border style for callouts using the 'outline' token."
        )

        .addDropdown((dropdown) => {

            dropdown

                .addOption(
                    "solid",
                    "Solid"
                )

                .addOption(
                    "dashed",
                    "Dashed"
                )

                .addOption(
                    "dotted",
                    "Dotted"
                )

                .setValue(
                    this.plugin.settings.outlineStyle
                )

                .onChange(async (value) => {

                    await this.updateSettings(
                        () => {

                            this.plugin.settings.outlineStyle =
                                value as
                                "solid" |
                                "dashed" |
                                "dotted";

                        }
                    );

                });

        });

}

}