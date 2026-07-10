export interface CalloutMetadata {
    width?: number;
    color?: string;
    align?: "left" | "center" | "right";
    rounded?: boolean;
    shadow?: boolean;
    outline?: boolean;
    css?: string;
}

export interface CalloutMetadataSettings {
    roundedRadius: number;

    shadowStrength: string;
    shadowColorLight: string;
    shadowColorDark: string;

    outlineWidth: number;
    outlineColorLight: string;
    outlineColorDark: string;

    outlineStyle: "solid" | "dashed" | "dotted";
}


export const DEFAULT_SETTINGS: CalloutMetadataSettings = {
    roundedRadius: 12,

    shadowStrength: "0 2px 8px",
    shadowColorLight: "#00000026",
    shadowColorDark: "#00000040",

    outlineWidth: 2,
    outlineColorLight: "#888888",
    outlineColorDark: "#aaaaaa",

    outlineStyle: "solid",
};

export const SUPPORT_LINKS = [
    {
        text: "☕ Buy Me a Coffee",
        href: "https://buymeacoffee.com/erinskidds",
        cls: "coffee-link",
    },

    {
        text: "⭐ Star on GitHub",
        href: "https://github.com/DudeThatsErin/CalloutMetadata",
        cls: "github-link",
    },

    {
        text: "🐛 Report Issues",
        href: "https://github.com/DudeThatsErin/CalloutMetadata/issues",
        cls: "issues-link",
    },

    {
        text: "💬 Discord Support",
        href: "https://discord.gg/XcJWhE3SEA",
        cls: "discord-link",
    },
];


export const PLUGIN_INFO = {
    name: "Callout Metadata",
    version: "1.0.0",
    author: "Erin Skidds",
};