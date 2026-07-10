import {
    App,
    PluginSettingTab,
    Setting
} from "obsidian";

import type CalloutMetadataPlugin from "./main";

import {
    SUPPORT_LINKS,
    PLUGIN_INFO
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



        containerEl.createEl(
            "h2",
            {
                text: "Callout Metadata"
            }
        );



        this.addSupportLinks(containerEl);


        containerEl.createEl(
            "h3",
            {
                text: "Appearance"
            }
        );


        this.addAppearanceSettings(
            containerEl
        );



        containerEl.createEl(
            "h3",
            {
                text: "Effects"
            }
        );


        this.addEffectSettings(
            containerEl
        );



        containerEl.createEl(
            "h3",
            {
                text: "Tokens"
            }
        );


        this.addTokenHelp(
            containerEl
        );



        containerEl.createEl(
            "h3",
            {
                text: "About"
            }
        );


        containerEl.createEl(
            "p",
            {
                text:
                    `${PLUGIN_INFO.name} v${PLUGIN_INFO.version} by ${PLUGIN_INFO.author}`
            }
        );

    }








    private addSupportLinks(
        containerEl: HTMLElement
    ) {


        new Setting(containerEl)
            .setName("Support & Links")
            .setDesc(
                "Support development, report bugs, or get help."
            )
            .addButton(() => {});



        const wrapper =
            containerEl.createDiv(
                {
                    cls:
                        "cm-support-links"
                }
            );


        wrapper.style.cssText =
            `
            display:flex;
            flex-wrap:wrap;
            gap:8px;
            margin:0 0 20px 0;
            `;



        SUPPORT_LINKS.forEach(
            link => {

                const button =
                    wrapper.createEl(
                        "a",
                        {
                            text:
                                link.text,
                            href:
                                link.href
                        }
                    );


                button.className =
                    `cm-support-button ${link.cls}`;


                button.target =
                    "_blank";


                button.rel =
                    "noopener noreferrer";


                button.style.cssText =
                    `
                    padding:6px 12px;
                    border-radius:6px;
                    text-decoration:none;
                    border:1px solid var(--background-modifier-border);
                    background:var(--background-secondary);
                    cursor:pointer;
                    `;

            }
        );

    }









    private addAppearanceSettings(
        containerEl: HTMLElement
    ) {



        new Setting(containerEl)

            .setName(
                "Border Radius"
            )

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

                                this.plugin.settings.roundedRadius =
                                    value;


                                await this.plugin.saveSettings();


                                this.plugin.applyCSSVariables();

                            }
                        );

                }
            );





        new Setting(containerEl)

            .setName(
                "Shadow Strength"
            )

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

                                this.plugin.settings.shadowStrength =
                                    value;


                                await this.plugin.saveSettings();


                                this.plugin.applyCSSVariables();

                            }
                        );

                }
            );







        new Setting(containerEl)

            .setName(
                "Shadow Color (Light)"
            )

            .addColorPicker(
                picker => {

                    picker
                        .setValue(
                            this.plugin.settings.shadowColorLight
                        )

                        .onChange(
                            async value => {

                                this.plugin.settings.shadowColorLight =
                                    value;


                                await this.plugin.saveSettings();


                                this.plugin.applyCSSVariables();

                            }
                        );

                }
            );








        new Setting(containerEl)

            .setName(
                "Shadow Color (Dark)"
            )

            .addColorPicker(
                picker => {

                    picker
                        .setValue(
                            this.plugin.settings.shadowColorDark
                        )

                        .onChange(
                            async value => {

                                this.plugin.settings.shadowColorDark =
                                    value;


                                await this.plugin.saveSettings();


                                this.plugin.applyCSSVariables();

                            }
                        );

                }
            );








        new Setting(containerEl)

            .setName(
                "Outline Width"
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

                                this.plugin.settings.outlineWidth =
                                    value;


                                await this.plugin.saveSettings();


                                this.plugin.applyCSSVariables();

                            }
                        );

                }
            );









        new Setting(containerEl)

            .setName(
                "Outline Style"
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

                                this.plugin.settings.outlineStyle =
                                    value as
                                    "solid" |
                                    "dashed" |
                                    "dotted";


                                await this.plugin.saveSettings();


                                this.plugin.applyCSSVariables();

                            }
                        );

                }
            );

    }









    private addEffectSettings(
        containerEl: HTMLElement
    ) {


        const settings = [
            [
                "enableGlass",
                "Glass effect",
                "Enable translucent glass callouts"
            ],
            [
                "enableGradient",
                "Gradient effect",
                "Enable gradient backgrounds"
            ],
            [
                "enableCompact",
                "Compact callouts",
                "Reduce callout padding"
            ],
            [
                "enableHover",
                "Hover effect",
                "Add hover animation"
            ],
            [
                "enableSticky",
                "Sticky callouts",
                "Enable sticky positioning"
            ]

        ] as const;



        settings.forEach(
            ([key,name,desc]) => {


                new Setting(containerEl)

                    .setName(name)

                    .setDesc(desc)

                    .addToggle(
                        toggle => {

                            toggle
                                .setValue(
                                    this.plugin.settings[key]
                                )

                                .onChange(
                                    async value => {

                                        this.plugin.settings[key] =
                                            value;


                                        await this.plugin.saveSettings();


                                        this.plugin.applyCSSVariables();

                                    }
                                );

                        }
                    );

            }
        );


    }









    private addTokenHelp(
        containerEl: HTMLElement
    ) {


        containerEl.createEl(
            "pre",
            {
                text:
                    "> [!note|50|orange|center|shadow|rounded|outline]"
            }
        );



        const list =
            containerEl.createEl(
                "ul"
            );


        [
            "Number (0-100) → width percentage",
            "left / center / right → alignment",
            "shadow → drop shadow",
            "rounded → rounded corners",
            "outline → border outline",
            "glass → glass effect",
            "gradient → gradient effect",
            "compact → smaller padding",
            "hover → hover animation",
            "sticky → sticky positioning",
            "css=name → custom CSS class",
            "Anything else → color"
        ]

        .forEach(
            item => {

                list.createEl(
                    "li",
                    {
                        text:item
                    }
                );

            }
        );

    }

}