import { CalloutMetadata } from "./types";


type StyleToken =
    | "shadow"
    | "rounded"
    | "outline"
    | "glass"
    | "gradient"
    | "borderless"
    | "compact"
    | "hover"
    | "sticky";


const STYLE_TOKENS: Set<StyleToken> = new Set([
    "shadow",
    "rounded",
    "outline",
    "glass",
    "gradient",
    "borderless",
    "compact",
    "hover",
    "sticky",
]);


export function parseMetadata(
    raw: string
): CalloutMetadata {

    const result: CalloutMetadata = {};

    const tokens =
        raw
            .split("|")
            .map(token => token.trim())
            .filter(Boolean);


    for (const token of tokens) {

        /*
         * Key/value tokens
         *
         * Example:
         * css=my-class
         */
        if (token.includes("=")) {

            const separator =
                token.indexOf("=");


            const key =
                token
                    .slice(0, separator)
                    .toLowerCase();


            const value =
                token.slice(separator + 1).trim();


            if (
                key === "css" &&
                value
            ) {

                result.css =
                    result.css
                        ? `${result.css} ${value}`
                        : value;

            }


            continue;
        }



        /*
         * Width token
         *
         * Example:
         * 50
         */
        if (/^\d+$/.test(token)) {

            const width =
                Number(token);


            result.width =
                Math.min(
                    100,
                    Math.max(
                        0,
                        width
                    )
                );


            continue;
        }



        const lower =
            token.toLowerCase();



        /*
         * Alignment token
         */
        if (
            lower === "left" ||
            lower === "center" ||
            lower === "right"
        ) {

            result.align =
                lower;

            continue;

        }



        /*
         * Boolean style tokens
         */
        if (
            STYLE_TOKENS.has(
                lower as StyleToken
            )
        ) {

            result[
                lower as StyleToken
            ] = true;


            continue;

        }



        /*
         * Anything else is treated as a color.
         *
         * Supports:
         * red
         * #ff0000
         * rgb(...)
         * rgba(...)
         */
        result.color =
            token;

    }


    return result;

}