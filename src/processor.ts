import { parseMetadata } from "./parser";
import { resolveColor } from "./utils";
import { CalloutMetadata } from "./types";

const PROCESSED = "data-cm-processed";

export function processCallouts(container: HTMLElement): void {
    const callouts =
        container.querySelectorAll<HTMLElement>(
            `.callout[data-callout-metadata]:not([${PROCESSED}])`
        );

    callouts.forEach((el) => {
        el.setAttribute(PROCESSED, "");

        const raw =
            el.getAttribute("data-callout-metadata");

        if (!raw) return;

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
        ) as HTMLElement | null;


    /*
     * Width
     */
    if (meta.width != null) {

        el.dataset.width =
            String(meta.width);


        if (wrapper) {

            wrapper.style.width =
                `${meta.width}%`;

            el.style.width =
                "100%";

        } else {

            el.style.width =
                `${meta.width}%`;

        }

    }



    /*
     * Color
     */
    if (meta.color) {

        const rgb =
            resolveColor(meta.color);


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


        if (wrapper) {

            wrapper.dataset.align =
                meta.align;

        }

    }



    /*
     * Boolean style tokens
     */
    if (meta.shadow) {

        el.dataset.shadow =
            "";

    }


    if (meta.rounded) {

        el.dataset.rounded =
            "";

    }


    if (meta.outline) {

        el.dataset.outline =
            "";

    }


    if (meta.glass) {

        el.dataset.glass =
            "";

    }


    if (meta.gradient) {

        el.dataset.gradient =
            "";

    }


    if (meta.borderless) {

        el.dataset.borderless =
            "";

    }


    if (meta.compact) {

        el.dataset.compact =
            "";

    }


    if (meta.hover) {

        el.dataset.hover =
            "";

    }


    if (meta.sticky) {

        el.dataset.sticky =
            "";

    }



    /*
     * Custom CSS classes
     */
    if (meta.css) {

        meta.css
            .split(/\s+/)
            .filter(Boolean)
            .forEach((cls) => {

                el.classList.add(cls);

            });


        el.dataset.css =
            meta.css;

    }

}