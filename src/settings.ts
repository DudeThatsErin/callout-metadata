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

        const { containerEl } = this;

        containerEl.empty();


        containerEl.createEl(
            "h2",
            {
                text: "Callout Metadata"
            }
        );


        this.renderSupport(containerEl);

        this.renderAppearance(containerEl);

    }




    private async updateSettings(
        callback: () => void
    ) {

        callback();

        await this.plugin.saveSettings();

        this.plugin.applyCSSVariables();

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
            container.createDiv(
                {
                    cls: "support-container"
                }
            );


        SUPPORT_LINKS.forEach(
            link => {

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

            }
        );

    }








    private renderAppearance(
        container: HTMLElement
    ) {

        container.createEl(
            "h3",
            {
                text: "Appearance"
            }
        );



        new Setting(container)

            .setName("Border Radius")

            .setDesc(
                "Corner radius for rounded callouts"
            )

            .addSlider(
                slider => {

                    slider

                        .setLimits(
                            0,
                            32,
                            1
                        )

                        .setValue(
                            this.plugin.settings.roundedRadius
                        )

                        .setDynamicTooltip()

                        .onChange(
                            async value => {

                                await this.updateSettings(
                                    () => {
                                        this.plugin.settings.roundedRadius =
                                            value;
                                    }
                                );

                            }
                        );

                }
            );








        new Setting(container)

            .setName("Shadow Strength")

            .setDesc(
                "CSS shadow offset and blur values"
            )

            .addText(
                text => {

                    text

                        .setValue(
                            this.plugin.settings.shadowStrength
                        )

                        .onChange(
                            async value => {

                                await this.updateSettings(
                                    () => {
                                        this.plugin.settings.shadowStrength =
                                            value;
                                    }
                                );

                            }
                        );

                }
            );








        new Setting(container)

            .setName("Shadow Color (Light)")

            .setDesc(
                "Shadow color in light mode"
            )

            .addColorPicker(
                picker => {

                    picker

                        .setValue(
                            this.plugin.settings.shadowColorLight
                        )

                        .onChange(
                            async value => {

                                await this.updateSettings(
                                    () => {
                                        this.plugin.settings.shadowColorLight =
                                            value;
                                    }
                                );

                            }
                        );

                }
            );








        new Setting(container)

            .setName("Shadow Color (Dark)")

            .setDesc(
                "Shadow color in dark mode"
            )

            .addColorPicker(
                picker => {

                    picker

                        .setValue(
                            this.plugin.settings.shadowColorDark
                        )

                        .onChange(
                            async value => {

                                await this.updateSettings(
                                    () => {
                                        this.plugin.settings.shadowColorDark =
                                            value;
                                    }
                                );

                            }
                        );

                }
            );








        new Setting(container)

            .setName("Outline Width")

            .setDesc(
                "Border width for outline callouts"
            )

            .addSlider(
                slider => {

                    slider

                        .setLimits(
                            1,
                            6,
                            1
                        )

                        .setValue(
                            this.plugin.settings.outlineWidth
                        )

                        .setDynamicTooltip()

                        .onChange(
                            async value => {

                                await this.updateSettings(
                                    () => {
                                        this.plugin.settings.outlineWidth =
                                            value;
                                    }
                                );

                            }
                        );

                }
            );








        new Setting(container)

            .setName("Outline Style")

            .setDesc(
                "Border style"
            )

            .addDropdown(
                dropdown => {

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

                        .onChange(
                            async value => {

                                await this.updateSettings(
                                    () => {
                                        this.plugin.settings.outlineStyle =
                                            value as
                                            "solid" |
                                            "dashed" |
                                            "dotted";
                                    }
                                );

                            }
                        );

                }
            );

    }

}
