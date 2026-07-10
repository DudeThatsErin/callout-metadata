# Callout Metadata for Obsidian

> *Note:* This plugin is being vibe coded. So, if you are not wanting AI code in your vault, please do not use this plugin. Though I am a full time Full Stack Developer so I can validate none of the code is leaking secrets or collecting personal data if that helps you.

A lightweight Obsidian plugin that parses pipe-separated metadata tokens in callout types and applies them as data attributes and inline styles — giving you full control over width, color, alignment, shadow, rounded corners, outlines, and custom CSS classes without ever leaving your markdown.

## 🚀 Features

### 🔧 Unordered Metadata Parsing
- **Pipe-separated tokens**: Add metadata after the callout type using `|` — tokens can appear in any order
- **Smart classification**: Numbers become width, alignment keywords are recognized, boolean flags are toggled, and everything else becomes a color
- **Key-value pairs**: Use `css=classname` to attach custom CSS classes to any callout

### 🎨 Dynamic Color Support
- **Any CSS color**: Named colors (`red`, `orange`, `teal`), hex (`#ff0088`), RGB (`rgb(255,100,50)`), and HSL all work
- **Canvas-based resolution**: Colors are resolved to RGB triplets at runtime so `--callout-color` stays compatible with every theme
- **No predefined palette**: If the browser understands it, so does the plugin

### 📐 Inline Width
- **Percentage-based**: Any number `0–100` sets the callout width as a percentage
- **No CSS required**: Width is applied as an inline style, so `17`, `38`, `73` — any value just works

### 📍 Alignment
- **Three modes**: `left`, `center`, `right` — applied via `data-align` attribute
- **CSS-driven**: Alignment uses `margin-left` / `margin-right: auto` so it plays nicely with any theme

### ✨ Boolean Flags
- **shadow**: Adds a configurable drop shadow
- **rounded**: Rounds the callout corners with a configurable radius
- **outline**: Adds a colored border using the callout's own color

### 🧩 Custom CSS Classes
- **Extensible**: Use `css=my-class` to add any CSS class to a callout
- **Multiple classes**: Comma-separated values (`css=card,highlight`) or multiple tokens (`css=card|css=highlight`) both work
- **Snippet-friendly**: Combine with any CSS snippet you already have — the plugin doesn't need to anticipate every styling option

### 🎛️ Style Settings Integration
- **Visual customization**: Border radius, shadow strength, outline width, and outline style are all exposed as Style Settings variables
- **No code required**: Adjust values with sliders and dropdowns in the Style Settings panel

## 📘 Usage

### Syntax

```markdown
> [!type|token|token|token] Title
> Content
```

Tokens can appear in any order. All of these are valid:

```markdown
> [!note|50]
> [!note|orange]
> [!note|right]
> [!note|shadow]
> [!note|50|orange]
> [!note|orange|50]
> [!note|orange|shadow|25|right]
> [!warning|35|#ff0088|center|rounded|shadow]
> [!tip|css=my-class|60|outline]
```

### Token Reference

| Token | Example | Description |
|---|---|---|
| Number (`0–100`) | `50` | Sets width as a percentage |
| `left` / `center` / `right` | `center` | Sets horizontal alignment |
| `shadow` | `shadow` | Adds a drop shadow |
| `rounded` | `rounded` | Rounds the corners |
| `outline` | `outline` | Adds a colored border |
| `css=classname` | `css=card` | Adds a custom CSS class |
| Anything else | `red`, `#ff0088`, `hsl(200,50%,50%)` | Sets the callout color |

### Examples

#### Narrow centered callout with shadow
```markdown
> [!info|50|center|shadow] Heads Up
> This callout is 50% wide, centered, and has a drop shadow.
```

#### Custom color with rounded corners
```markdown
> [!note|#ff6600|rounded] Orange Note
> Any valid CSS color works — named, hex, rgb, or hsl.
```

#### Right-aligned outline callout
```markdown
> [!warning|60|right|outline] Caution
> 60% wide, right-aligned, with an outline border.
```

#### Custom CSS class for snippet integration
```markdown
> [!tip|css=gradient-bg] Pro Tip
> The `gradient-bg` class is added to the callout element — style it in any CSS snippet.
```

### How It Works

The plugin reads the `data-callout-metadata` attribute that Obsidian sets on rendered callout elements, parses the pipe-separated tokens, then applies:

- **Data attributes**: `data-width`, `data-color`, `data-align`, `data-shadow`, `data-rounded`, `data-outline`, `data-css`
- **Inline styles**: `style.width` for width, `--callout-color` for color
- **CSS classes**: Any classes from `css=` tokens

CSS in `styles.css` handles alignment, shadow, rounded, and outline using those data attributes. Width and color are set directly on the element so they work without any CSS rules.

## ⚙️ Settings

### Native Settings Tab

The plugin's settings tab provides a quick reference for the token syntax. No configuration is required — the plugin works out of the box.

### Style Settings

Install the [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin to customize visual properties:

| Setting | Type | Default | Description |
|---|---|---|---|
| Border Radius (Rounded) | Slider | `12px` | Corner radius for callouts with the `rounded` token |
| Shadow | Text | `0 2px 8px rgba(0,0,0,0.15)` | Box shadow for callouts with the `shadow` token |
| Outline Width | Slider | `2px` | Border width for callouts with the `outline` token |
| Outline Style | Dropdown | Solid | Solid, Dashed, or Dotted |

## Installation

### 📦 Obsidian Plugin Store (Pending Approval)

You'll soon be able to find it directly in the Community Plugins browser.

### 🧪 Using BRAT (Beta Reviewer's Auto-update Tool)

1. Install the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat)
2. Open BRAT settings
3. Click **Add Beta Plugin**
4. Enter: `DudeThatsErin/callout-metadata`
5. Click **Add Plugin**
6. Enable "Callout Metadata" in Community Plugins settings

## Writing Custom CSS

The plugin sets data attributes on callout elements, so you can write CSS snippets that target them:

```css
/* Style callouts with a specific color */
.callout[data-color="red"] {
    border-left: 4px solid red;
}

/* Style callouts using a custom class */
.callout.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Style all outlined callouts */
.callout[data-outline] {
    background: transparent;
}

/* Target callouts by width range */
.callout[data-width="50"] {
    font-size: 0.9em;
}
```

## Support

- Discord Support: https://discord.gg/XcJWhE3SEA
- Report Issues: https://github.com/DudeThatsErin/callout-metadata/issues
- Star on GitHub: https://github.com/DudeThatsErin/callout-metadata
- Buy Me a Coffee: https://buymeacoffee.com/erinskidds

## Changelog

### v1.0.0
- Initial release
- Unordered pipe-separated metadata parsing
- Width, color, alignment, shadow, rounded, outline support
- Custom CSS class injection via `css=` token
- Dynamic color resolution (named, hex, RGB, HSL)
- Style Settings integration for visual customization
- Live preview and reading view support

## License

This plugin is licensed under the GNU General Public License v3.0.
