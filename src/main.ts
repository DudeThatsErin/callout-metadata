import {
    Plugin,
    MarkdownView,
    debounce
} from "obsidian";

import {
    processCallouts
} from "./processor";

import {
    CalloutMetadataSettingTab
} from "./settings";

import {
    CalloutMetadataSettings,
    DEFAULT_SETTINGS
} from "./types";



export default class CalloutMetadataPlugin extends Plugin {

    settings: CalloutMetadataSettings = {
        ...DEFAULT_SETTINGS
    };



    async onload() {

        await this.loadSettings();

        this.applyCSSVariables();
        this.applyEffectClasses();



        this.registerMarkdownPostProcessor(
            (el) => {

                processCallouts(el);

            }
        );



        this.app.workspace.onLayoutReady(
            () => {

                this.processAllViews();

                this.applyCSSVariables();
                this.applyEffectClasses();

                this.app.workspace.trigger(
                    "css-change"
                );

            }
        );



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
                    this.applyEffectClasses();

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







    /**
     * Apply CSS variables from settings
     */
    applyCSSVariables() {

        const root =
            document.documentElement;


        const dark =
            document.body.classList.contains(
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
            dark
                ? this.settings.shadowColorDark
                : this.settings.shadowColorLight
        );



        root.style.setProperty(
            "--cm-outline-width",
            `${this.settings.outlineWidth}px`
        );



        root.style.setProperty(
            "--cm-outline-color",
            dark
                ? this.settings.outlineColorDark
                : this.settings.outlineColorLight
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








    /**
     * Enable/disable optional effects
     * through body classes.
     */
    applyEffectClasses() {

        const body =
            document.body;



        const effects = {

            glass:
                this.settings.enableGlass,

            gradient:
                this.settings.enableGradient,

            compact:
                this.settings.enableCompact,

            hover:
                this.settings.enableHover,

            sticky:
                this.settings.enableSticky

        };



        Object.entries(effects)
            .forEach(
                ([name, enabled]) => {

                    body.toggleClass(
                        `cm-${name}-disabled`,
                        !enabled
                    );

                }
            );

    }









    private debouncedProcess =
        debounce(
            () => this.processAllViews(),
            200,
            true
        );








    private processAllViews() {

        this.app.workspace.iterateAllLeaves(
            (leaf) => {

                if (
                    leaf.view instanceof MarkdownView
                ) {

                    processCallouts(
                        leaf.view.containerEl
                    );

                }

            }
        );

    }









    async loadSettings() {

        this.settings =
            Object.assign(
                {},
                DEFAULT_SETTINGS,
                await this.loadData()
            );

    }








    async saveSettings() {

        await this.saveData(
            this.settings
        );


        this.applyCSSVariables();

        this.applyEffectClasses();

        this.app.workspace.trigger(
            "css-change"
        );

    }

}