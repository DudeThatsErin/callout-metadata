import { App, PluginSettingTab, Setting } from "obsidian";
import type CalloutMetadataPlugin from "./main";
import { SUPPORT_LINKS, PLUGIN_INFO } from "./constants";


export class CalloutMetadataSettingTab extends PluginSettingTab {

    plugin: CalloutMetadataPlugin;


    constructor(app: App, plugin: CalloutMetadataPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }


    display(): void {

        const { containerEl } = this;

        containerEl.empty();


        containerEl.createEl("h2", {
            text: "Callout Metadata"
        });


        this.addSupportLinks(containerEl);


        containerEl.createEl("h3", {
            text: "Appearance"
        });


        /*
         * Rounded corners
         */
        new Setting(containerEl)
            .setName("Border Radius")
            .setDesc("Corner radius for rounded callouts")
            .addSlider(slider => {

                slider
                    .setLimits(0, 32, 1)
                    .setValue(this.plugin.settings.roundedRadius)
                    .setDynamicTooltip()
                    .onChange(async value => {

                        this.plugin.settings.roundedRadius = value;

                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });
            });



        /*
         * Shadow
         */
        new Setting(containerEl)
            .setName("Shadow Strength")
            .setDesc("CSS shadow offset and blur")
            .addText(text => {

                text
                    .setValue(this.plugin.settings.shadowStrength)
                    .onChange(async value => {

                        this.plugin.settings.shadowStrength = value;

                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });

            });



        new Setting(containerEl)
            .setName("Shadow Color (Light)")
            .setDesc("Shadow color in light mode")
            .addColorPicker(color => {

                color
                    .setValue(this.plugin.settings.shadowColorLight)
                    .onChange(async value => {

                        this.plugin.settings.shadowColorLight = value;

                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });

            });



        new Setting(containerEl)
            .setName("Shadow Color (Dark)")
            .setDesc("Shadow color in dark mode")
            .addColorPicker(color => {

                color
                    .setValue(this.plugin.settings.shadowColorDark)
                    .onChange(async value => {

                        this.plugin.settings.shadowColorDark = value;

                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });

            });



        /*
         * Outline
         */

        new Setting(containerEl)
            .setName("Outline Width")
            .setDesc("Border width for outline callouts")
            .addSlider(slider => {

                slider
                    .setLimits(1, 6, 1)
                    .setValue(this.plugin.settings.outlineWidth)
                    .setDynamicTooltip()
                    .onChange(async value => {

                        this.plugin.settings.outlineWidth = value;

                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });

            });



        new Setting(containerEl)
            .setName("Outline Color (Light)")
            .setDesc("Outline color in light mode")
            .addColorPicker(color => {

                color
                    .setValue(this.plugin.settings.outlineColorLight)
                    .onChange(async value => {

                        this.plugin.settings.outlineColorLight = value;

                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });

            });



        new Setting(containerEl)
            .setName("Outline Color (Dark)")
            .setDesc("Outline color in dark mode")
            .addColorPicker(color => {

                color
                    .setValue(this.plugin.settings.outlineColorDark)
                    .onChange(async value => {

                        this.plugin.settings.outlineColorDark = value;

                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });

            });



        new Setting(containerEl)
            .setName("Outline Style")
            .setDesc("Border style for outline callouts")
            .addDropdown(dropdown => {

                dropdown
                    .addOption("solid", "Solid")
                    .addOption("dashed", "Dashed")
                    .addOption("dotted", "Dotted")
                    .setValue(this.plugin.settings.outlineStyle)
                    .onChange(async value => {

                        this.plugin.settings.outlineStyle =
                            value as "solid" | "dashed" | "dotted";


                        await this.plugin.saveSettings();

                        this.plugin.applyCSSVariables();
                    });

            });



        /*
         * Tokens documentation
         */

        containerEl.createEl("h3", {
            text: "Tokens"
        });


        const code = containerEl.createEl("pre");

        code.createEl("code", {
            text: "> [!note|50|orange|center|shadow|rounded|outline]"
        });



        const list = containerEl.createEl("ul");


        [
            "Number (0-100) → width percentage",
            "left / center / right → alignment",
            "shadow → adds drop shadow",
            "rounded → rounded corners",
            "outline → outline border",
            "css=classname → custom CSS class",
            "Anything else → callout color",
        ].forEach(item => {

            list.createEl("li", {
                text: item
            });

        });



        /*
         * About section
         */

        containerEl.createEl("h3", {
            text: "About"
        });


        containerEl.createEl("p", {
            text:
                `${PLUGIN_INFO.name} v${PLUGIN_INFO.version} by ${PLUGIN_INFO.author}`
        });

    }



    private addSupportLinks(containerEl: HTMLElement) {


        containerEl.createEl("h3", {
            text: "Support & Links"
        });


        const wrapper = containerEl.createDiv();

        wrapper.addClass(
            "callout-metadata-support"
        );


        SUPPORT_LINKS.forEach(link => {

            const a = wrapper.createEl("a", {
                text: link.text,
                href: link.href
            });


            a.className = link.cls;

            a.target = "_blank";

            a.rel = "noopener noreferrer";

        });

    }

}