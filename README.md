# Callout Metadata for Obsidian

> *Note:* This plugin is being vibe coded. So, if you are not wanting AI code in your vault, please do not use this plugin. Though I am a full time Full Stack Developer so I can validate none of the code is leaking secrets or collecting personal data if that helps you.

A lightweight Obsidian plugin that extends callouts with pipe-separated metadata tokens. Add width, colors, alignment, visual effects, and custom CSS classes directly inside your markdown without writing custom HTML.

## 🚀 Features

## 🔧 Flexible Metadata Parsing

- **Pipe-separated tokens**: Add metadata after the callout type using `|`
- **Order independent**: Tokens can appear in any order
- **Smart detection**:
  - Numbers become width percentages
  - Alignment keywords are detected automatically
  - Style tokens toggle effects
  - Everything else is treated as a color
- **Key/value support**: Use `css=my-class` to inject custom CSS classes

Example:

```markdown
> [!note|50|orange|center|shadow|rounded]
````

---

# 🎨 Dynamic Color Support

Callout colors support any CSS color value:

* Named colors:

  * `red`
  * `orange`
  * `teal`
* Hex:

  * `#ff0088`
* RGB:

  * `rgb(255,100,50)`
* HSL:

  * `hsl(200,50%,50%)`

The plugin resolves colors dynamically using the browser, meaning there is no predefined color list.

If CSS understands it, Callout Metadata understands it.

---

# 📐 Width Control

Numbers automatically become width percentages.

Examples:

```markdown
> [!note|25]
```

Creates a 25% width callout.

```markdown
> [!note|73]
```

Creates a 73% width callout.

No CSS required.

Any value from `0-100` works.

---

# 📍 Alignment

Supported alignment tokens:

| Token    | Result         |
| -------- | -------------- |
| `left`   | Left aligned   |
| `center` | Center aligned |
| `right`  | Right aligned  |

Example:

```markdown
> [!info|60|center]
```

---

# ✨ Style Tokens

Callout Metadata includes several built-in style modifiers.

| Token        | Description                |
| ------------ | -------------------------- |
| `shadow`     | Adds a configurable shadow |
| `rounded`    | Adds rounded corners       |
| `outline`    | Adds a colored outline     |
| `glass`      | Enables glass styling      |
| `gradient`   | Enables gradient styling   |
| `borderless` | Removes borders            |
| `compact`    | Reduces padding            |
| `hover`      | Adds hover animation       |
| `sticky`     | Enables sticky positioning |

Example:

```markdown
> [!warning|70|orange|shadow|rounded|glass]
```

---

# 🧩 Custom CSS Classes

Use:

```markdown
css=my-class
```

to add custom CSS classes.

Examples:

```markdown
> [!tip|css=gradient-bg]
```

Multiple classes are supported:

```markdown
> [!tip|css=card,highlight]
```

or:

```markdown
> [!tip|css=card|css=highlight]
```

This allows the plugin to work with your own CSS snippets without needing built-in support for every possible design.

---

# 📘 Usage

## Syntax

```markdown
> [!type|token|token|token] Title
> Content
```

All tokens can be mixed freely.

Examples:

```markdown
> [!note|50]
```

```markdown
> [!note|orange|shadow]
```

```markdown
> [!warning|35|#ff0088|center|rounded|outline]
```

```markdown
> [!tip|css=my-card|70|gradient|hover]
```

---

# Token Reference

| Token         | Example          | Description           |
| ------------- | ---------------- | --------------------- |
| Number        | `50`             | Sets width percentage |
| `left`        | `left`           | Align left            |
| `center`      | `center`         | Center align          |
| `right`       | `right`          | Align right           |
| `shadow`      | `shadow`         | Adds shadow           |
| `rounded`     | `rounded`        | Adds rounded corners  |
| `outline`     | `outline`        | Adds outline          |
| `glass`       | `glass`          | Glass effect          |
| `gradient`    | `gradient`       | Gradient styling      |
| `borderless`  | `borderless`     | Removes border        |
| `compact`     | `compact`        | Reduces padding       |
| `hover`       | `hover`          | Hover animation       |
| `sticky`      | `sticky`         | Sticky positioning    |
| `css=name`    | `css=card`       | Adds CSS class        |
| Anything else | `red`, `#ff0000` | Sets callout color    |

---

# ⚙️ Settings

The plugin includes a native settings tab.

Available customization:

* Border radius
* Shadow strength
* Shadow colors
* Outline width
* Outline style
* Outline colors

Changes apply immediately without restarting Obsidian.

---

# 🔌 Style Settings Support

Callout Metadata exposes CSS variables that can also be customized using the Style Settings plugin.

Supported variables include:

| Variable               | Description         |
| ---------------------- | ------------------- |
| `--cm-rounded-radius`  | Rounded corner size |
| `--cm-shadow-strength` | Shadow size         |
| `--cm-shadow-color`    | Shadow color        |
| `--cm-outline-width`   | Outline thickness   |
| `--cm-outline-color`   | Outline color       |

---

# How It Works

The plugin reads metadata from rendered Obsidian callouts and applies:

### Data Attributes

```html
data-width
data-color
data-align
data-shadow
data-rounded
data-outline
data-css
```

### Inline Styles

* Width percentage
* Callout color variables

### CSS Classes

Custom classes from:

```markdown
css=my-class
```

The included stylesheet handles built-in effects while allowing full customization through CSS snippets.

---

# Installation

## 📦 Obsidian Community Plugins

Pending approval.

## 🧪 BRAT Installation

1. Install the BRAT plugin
2. Open BRAT settings
3. Select **Add Beta Plugin**
4. Enter:

```
DudeThatsErin/callout-metadata
```

5. Enable the plugin in Community Plugins

---

# Writing Custom CSS

Examples:

```css
/* Target a specific color */
.callout[data-color="red"] {
    border-left: 4px solid red;
}


/* Target custom classes */
.callout.gradient-bg {
    background:
        linear-gradient(
            135deg,
            #667eea,
            #764ba2
        );
}


/* Target outlined callouts */
.callout[data-outline] {
    background: transparent;
}
```

---

# Support

* Discord Support: https://discord.gg/XcJWhE3SEA
* Report Issues: https://github.com/DudeThatsErin/callout-metadata/issues
* GitHub: https://github.com/DudeThatsErin/callout-metadata
* Buy Me a Coffee: https://buymeacoffee.com/erinskidds