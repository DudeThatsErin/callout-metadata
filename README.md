# Callout Metadata for Obsidian

> **Note:** This plugin is being vibe coded. If you do not want AI-assisted code in your vault, please do not use this plugin. I am also a full-time Full Stack Developer and review the code to make sure it is not collecting personal data or leaking vault content.

Callout Metadata extends Obsidian's native callouts with simple pipe-separated metadata. You can change a callout's width, alignment, color, visual effects, and CSS classes directly in Markdown while keeping the original Obsidian callout type and icon.

```markdown
> [!note|50|orange|center|shadow|rounded] Example
> This is still a normal Note callout, just with extra metadata.
```

## See every variant in your own vault

A ready-made **[Callout Metadata Variants.md](./Callout%20Metadata%20Variants.md)** file is included with the project.

Download that file and place it anywhere inside your Obsidian vault, then open it with Callout Metadata enabled. The note contains examples of the supported callout types, widths, alignments, colors, effects, foldable callouts, custom CSS classes, and combined metadata.

This is especially useful because callouts can look different depending on your Obsidian theme, CSS snippets, and Callout Metadata settings. Instead of relying on screenshots from someone else's setup, the Variants file lets you see exactly how each option looks **inside your own vault**.

You can also use it as a reference sheet: find a callout you like, copy its Markdown syntax, and paste it into your own note.

### How to use the Variants file

1. Download `Callout Metadata Variants.md`.
2. Copy it into your Obsidian vault.
3. Make sure **Callout Metadata** is enabled under **Settings → Community plugins**.
4. Open the Variants note in Live Preview or Reading View.
5. Browse the examples to see how each metadata token looks with your current theme and settings.
6. Copy any example syntax you want to reuse in your own notes.

## Features

- Pipe-separated metadata directly inside normal Obsidian callouts.
- Widths from `0` to `100` percent.
- Left, center, and right alignment.
- CSS named colors, hex colors, RGB/RGBA, HSL, and other browser-supported CSS colors.
- Built-in style tokens for shadows, rounded corners, outlines, glass, gradients, compact spacing, hover effects, sticky positioning, and borderless callouts.
- Custom CSS classes with `css=...`.
- Tokens can be mixed together and used in any order.
- Works with existing Obsidian callout types and aliases.
- Preserves the original callout type and icon. For example, `[!note|orange]` is still a Note callout and keeps the Note icon.
- Supports both Reading View and Live Preview.

## Basic syntax

Add metadata after the callout type, separated with `|`:

```markdown
> [!type|token|token|token] Title
> Callout content
```

For example:

```markdown
> [!warning|60|orange|center|shadow|rounded] Warning
> This callout is 60% wide, centered, orange, rounded, and shadowed.
```

Tokens are order independent, so these are equivalent:

```markdown
> [!note|50|orange|center]
> [!note|center|orange|50]
```

## Width

A number is interpreted as a percentage width.

```markdown
> [!note|25] 25% wide
> [!note|50] 50% wide
> [!note|75] 75% wide
> [!note|100] 100% wide
```

Any whole-number value from `0` through `100` can be used.

## Alignment

Use `left`, `center`, or `right`.

```markdown
> [!info|55|left] Left aligned
> [!info|55|center] Center aligned
> [!info|55|right] Right aligned
```

Alignment is easiest to see when it is combined with a width smaller than `100`.

## Colors

Any CSS color that the browser can resolve can be used as a color token.

### Named colors

```markdown
> [!note|orange]
> [!note|teal]
> [!note|rebeccapurple]
```

### Hex colors

```markdown
> [!note|#f0a]
> [!note|#7c3aed]
```

### RGB / RGBA

```markdown
> [!note|rgb(30,144,255)]
> [!note|rgba(255,99,71,0.5)]
```

### HSL

```markdown
> [!note|hsl(160,60%,45%)]
```

Changing the color does **not** replace the original callout type. A `note` remains a `note`, a `warning` remains a `warning`, and the original Obsidian/theme icon is preserved.

## Style tokens

| Token | What it does |
| --- | --- |
| `shadow` | Adds a configurable box shadow |
| `rounded` | Adds configurable rounded corners |
| `outline` | Adds a configurable outline |
| `glass` | Adds a translucent glass effect |
| `gradient` | Adds a gradient background effect |
| `borderless` | Removes the callout border |
| `compact` | Reduces callout padding |
| `hover` | Adds a small hover animation |
| `sticky` | Keeps the callout sticky while scrolling |

Examples:

```markdown
> [!note|shadow]
> [!note|rounded]
> [!note|glass]
> [!note|gradient]
> [!note|compact]
> [!note|hover]
> [!note|sticky]
```

Style tokens can be combined:

```markdown
> [!tip|#22c55e|shadow|rounded]
> [!note|glass|shadow|rounded]
> [!example|gradient|hover|rounded]
```

## Combining width, color, alignment, and effects

You can mix metadata freely in the same callout.

```markdown
> [!warning|60|orange|center] Width + color + alignment
```

```markdown
> [!tip|#22c55e|shadow|rounded] Color + shadow + rounded
```

```markdown
> [!info|45|right|#7c3aed|outline|rounded] Combined example
```

The original callout type still controls the callout's native identity and icon; the metadata only adds styling and layout behavior.

## Foldable callouts

Callout Metadata works with Obsidian's normal foldable-callout syntax.

Expanded by default:

```markdown
> [!tip|rounded|shadow]+ Expanded callout
> This can be collapsed.
```

Collapsed by default:

```markdown
> [!tip|rounded|shadow]- Collapsed callout
> This starts collapsed.
```

## Custom CSS classes

Use `css=class-name` to add your own CSS class to a callout.

```markdown
> [!tip|css=my-card]
```

Multiple classes can be comma-separated:

```markdown
> [!tip|css=card,highlight]
```

Or supplied as separate metadata tokens:

```markdown
> [!tip|css=card|css=highlight]
```

The visual result depends on CSS from your theme or snippets that targets those classes.

For example:

```css
.callout.my-card {
    border-width: 2px;
}

.callout.highlight {
    font-weight: 600;
}
```

## Token reference

| Token | Example | Result |
| --- | --- | --- |
| Number | `50` | Sets width to 50% |
| `left` | `left` | Aligns left |
| `center` | `center` | Centers the callout |
| `right` | `right` | Aligns right |
| CSS color | `orange` | Changes the callout accent color |
| CSS color | `#7c3aed` | Changes the callout accent color |
| `shadow` | `shadow` | Adds a shadow |
| `rounded` | `rounded` | Adds rounded corners |
| `outline` | `outline` | Adds an outline |
| `glass` | `glass` | Adds a glass effect |
| `gradient` | `gradient` | Adds a gradient effect |
| `borderless` | `borderless` | Removes the border |
| `compact` | `compact` | Reduces padding |
| `hover` | `hover` | Adds hover movement |
| `sticky` | `sticky` | Enables sticky positioning |
| `css=name` | `css=card` | Adds a custom CSS class |

## Settings

Open **Settings → Callout Metadata** to customize supported effects.

Current settings include:

- Rounded corner radius.
- Shadow spread/blur.
- Separate shadow colors for Light Mode and Dark Mode.
- Outline width.
- Outline style: solid, dashed, or dotted.
- Separate outline colors for Light Mode and Dark Mode.
- Enable or disable the Glass effect.
- Enable or disable the Gradient effect.
- Enable or disable Compact spacing.
- Enable or disable Hover effects.
- Enable or disable Sticky positioning.

Changes apply without needing to rebuild the plugin.

## Writing custom CSS

Callout Metadata adds attributes and classes that you can target from your own CSS snippets.

For example:

```css
/* Target callouts using a specific metadata color */
.callout[data-color="red"] {
    font-weight: 600;
}

/* Target a custom class */
.callout.my-card {
    padding: 1rem;
}

/* Target outlined callouts */
.callout[data-outline] {
    background: transparent;
}
```

## Installation

### Obsidian Community Plugins

Pending approval.

### BRAT

1. Install the **BRAT** plugin in Obsidian.
2. Open **Settings → BRAT**.
3. Choose **Add Beta Plugin**.
4. Enter:

```text
DudeThatsErin/CalloutMetadata
```

5. Install the plugin.
6. Enable **Callout Metadata** under **Settings → Community plugins**.

## Support

- Discord: https://discord.gg/XcJWhE3SEA
- Report issues: https://github.com/DudeThatsErin/CalloutMetadata/issues
- GitHub: https://github.com/DudeThatsErin/CalloutMetadata
- Buy Me a Coffee: https://buymeacoffee.com/erinskidds
