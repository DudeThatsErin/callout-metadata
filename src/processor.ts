import { parseMetadata } from "./parser";
import { resolveColor } from "./utils";
import { CalloutMetadata } from "./types";


const PROCESSED = "data-cm-processed";


type StyleFlag =
    | "shadow"
    | "rounded"
    | "outline"
    | "glass"
    | "gradient"
    | "borderless"
    | "compact"
    | "hover"
    | "sticky";


const STYLE_FLAGS: StyleFlag[] = [
    "shadow",
    "rounded",
    "outline",
    "glass",
    "gradient",
    "borderless",
    "compact",
    "hover",
    "sticky",
];



export function processCallouts(
    container: HTMLElement
): void {

    const callouts =
        container.querySelectorAll<HTMLElement>(
            `.callout[data-callout-metadata]:not([${PROCESSED}])`
        );


    callouts.forEach((el) => {

        el.setAttribute(
            PROCESSED,
            ""
        );


        const raw =
            el.getAttribute(
                "data-callout-metadata"
            );


        if (!raw) {
            return;
        }


        applyMetadata(
            el,
            parseMetadata(raw)
        );

    });

}





function applyMetadata(
    el: HTMLElement,
    meta: CalloutMetadata
): void {


    const wrapper =
        el.closest(
            ".cm-embed-block"
        );



    /*
     * Width
     *
     * Example:
     * > [!note|50]
     */
    if (meta.width != null) {

        el.dataset.width =
            String(meta.width);


        el.style.setProperty(
            "--cm-callout-width",
            `${meta.width}%`
        );


        if (wrapper instanceof HTMLElement) {

            wrapper.style.setProperty(
                "--cm-callout-width",
                `${meta.width}%`
            );

        }

    }




    /*
     * Color
     *
     * Example:
     * > [!note|orange]
     */
    if (meta.color) {

        const rgb =
            resolveColor(
                meta.color
            );


        if (rgb) {

            el.style.setProperty(
                "--callout-color",
                rgb
            );

        }


        el.dataset.color =
            meta.color;

    }





    /*
     * Alignment
     */
    if (meta.align) {

        el.dataset.align =
            meta.align;


        if (wrapper instanceof HTMLElement) {

            wrapper.dataset.align =
                meta.align;

        }

    }





    /*
     * Boolean style tokens
     *
     * Example:
     * > [!note|shadow|rounded]
     */
    STYLE_FLAGS.forEach(
        flag => {

            if (meta[flag]) {

                el.dataset[flag] =
                    "";

            }

        }
    );





    /*
     * Custom CSS classes
     *
     * Example:
     * > [!note|css=my-class]
     */
    if (meta.css) {

        meta.css
            .split(/\s+/)
            .filter(Boolean)
            .forEach(
                cls => {

                    el.classList.add(
                        cls
                    );

                }
            );


        el.dataset.css =
            meta.css;

    }

}