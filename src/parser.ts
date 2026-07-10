import { CalloutMetadata } from "./types";

export function parseMetadata(raw: string): CalloutMetadata {
    const result: CalloutMetadata = {};
    const tokens = raw.split("|").map((t) => t.trim()).filter(Boolean);

    for (const token of tokens) {
        if (token.includes("=")) {
            const eq = token.indexOf("=");
            const key = token.substring(0, eq).toLowerCase();
            const value = token.substring(eq + 1);

            if (key === "css") {
                const classes = value.split(/[,\s]+/).filter(Boolean);
                result.css = result.css
                    ? result.css + " " + classes.join(" ")
                    : classes.join(" ");
            }
            continue;
        }

        if (/^\d+$/.test(token)) {
            result.width = Number(token);
            continue;
        }

        switch (token.toLowerCase()) {
            case "left":
            case "right":
            case "center":
                result.align = token.toLowerCase() as CalloutMetadata["align"];
                continue;
            case "shadow":
                result.shadow = true;
                continue;
            case "rounded":
                result.rounded = true;
                continue;
            case "outline":
                result.outline = true;
                continue;
        }

        result.color = token;
    }

    return result;
}
