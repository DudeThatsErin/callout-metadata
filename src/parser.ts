import { CalloutMetadata } from "./types";


const STYLE_TOKENS: Array<
    keyof Pick<
        CalloutMetadata,
        | "shadow"
        | "rounded"
        | "outline"
        | "glass"
        | "gradient"
        | "borderless"
        | "compact"
        | "hover"
        | "sticky"
    >
> = [
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


export function parseMetadata(
    raw: string
): CalloutMetadata {

    const result: CalloutMetadata = {};

    const tokens =
        raw
            .split("|")
            .map(t => t.trim())
            .filter(Boolean);



    for (const token of tokens) {


        if (token.includes("=")) {

            const eq =
                token.indexOf("=");


            const key =
                token
                    .substring(0, eq)
                    .toLowerCase();


            const value =
                token.substring(eq + 1);



            if (key === "css") {

                result.css =
                    result.css
                        ? `${result.css} ${value}`
                        : value;

            }


            continue;

        }




        if (/^\d+$/.test(token)) {

            result.width =
                Number(token);

            continue;

        }




        const lower =
            token.toLowerCase();



        if (
            lower === "left" ||
            lower === "right" ||
            lower === "center"
        ) {

            result.align =
                lower;

            continue;

        }



        if (
            STYLE_TOKENS.includes(
                lower as typeof STYLE_TOKENS[number]
            )
        ) {

            result[
                lower as typeof STYLE_TOKENS[number]
            ] = true;


            continue;

        }



        /*
         * Anything else is a color
         */
        result.color =
            token;

    }


    return result;

}