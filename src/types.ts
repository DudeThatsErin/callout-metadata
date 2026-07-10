export type CalloutAlign = "left" | "center" | "right";


export interface CalloutMetadata {
    /**
     * Width percentage.
     *
     * Example:
     * > [!note|50]
     */
    width?: number;


    /**
     * Callout color.
     *
     * Example:
     * > [!note|red]
     */
    color?: string;

    /**
     * Alignment.
     *
     * Example:
     * > [!note|center]
     */
    align?: CalloutAlign;


    /*
     * Style tokens
     *
     * Example:
     *
     * > [!note|shadow|rounded|glass]
     */
    shadow?: boolean;
    rounded?: boolean;
    outline?: boolean;
    glass?: boolean;
    gradient?: boolean;
    borderless?: boolean;
    compact?: boolean;
    hover?: boolean;
    sticky?: boolean;

    /**
     * Custom CSS classes.
     *
     * Example:
     *
     * > [!note|css=my-class]
     */
    css?: string;
}

export interface CalloutMetadataSettings {
    /*
     * Rounded
     */
    roundedRadius: number;

    /*
     * Shadow
     */
    shadowStrength: string;
    shadowColorLight: string;
    shadowColorDark: string;

    /*
     * Outline
     */
    outlineWidth: number;
    outlineColorLight: string;
    outlineColorDark: string;
    outlineStyle: | "solid" | "dashed" | "dotted";

    /*
     * Effects
     */
    enableGlass: boolean;
    enableGradient: boolean;
    enableCompact: boolean;
    enableHover: boolean;
    enableSticky: boolean;

    /*
     * Support links
     */
    showSupportLinks: boolean;

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

    enableGlass: true,
    enableGradient: true,
    enableCompact: true,
    enableHover: true,
    enableSticky: true,
    showSupportLinks: true,
};