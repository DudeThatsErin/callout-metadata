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
     * Get the correct document instance.
     *
     * Supports Obsidian popout windows.
     */
    private getDocument(): Document {

        return this.app.workspace.containerEl.ownerDocument;

    }





    /**
     * Apply CSS variables from settings.
     */
    applyCSSVariables() {

        const doc =
            this.getDocument();


        const root =
            doc.documentElement;


        const body =
            doc.body;


        const dark =
            body.classList.contains(
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


        body.classList.remove(
            "cm-outline-solid",
            "cm-outline-dashed",
            "cm-outline-dotted"
        );


        body.classList.add(
            `cm-outline-${this.settings.outlineStyle}`
        );

    }





    /**
     * Enable/disable optional effects
     * through body classes.
     */
    applyEffectClasses() {

        const doc =
            this.getDocument();


        const body =
            doc.body;


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


        (
            Object.keys(effects) as Array<
                keyof typeof effects
            >
        )
        .forEach(
            (name) => {

                body.toggleClass(
                    `cm-${name}-disabled`,
                    !effects[name]
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

    const data: unknown =
        await this.loadData();


    const savedSettings =
        typeof data === "object" &&
        data !== null
            ? data as Partial<CalloutMetadataSettings>
            : {};


    this.settings =
        Object.assign(
            {},
            DEFAULT_SETTINGS,
            savedSettings
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