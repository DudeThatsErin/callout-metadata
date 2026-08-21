# Callout Metadata — Variant Gallery

Use this note as a visual test page for **Callout Metadata**. It includes every built-in metadata token the plugin currently supports, common color formats, alignment/width variants, fold states, and Obsidian's built-in callout types and aliases.

> [!info]
> Colors and widths are intentionally varied so it is easy to confirm that metadata is being parsed and applied.

---

## 1. Obsidian built-in callout types

### Note
> [!note] Note
> `note`

### Abstract family
> [!abstract] Abstract
> `abstract`

> [!summary] Summary
> `summary` — alias of abstract

> [!tldr] TLDR
> `tldr` — alias of abstract

### Info
> [!info] Info
> `info`

### Todo
> [!todo] Todo
> `todo`

### Tip family
> [!tip] Tip
> `tip`

> [!hint] Hint
> `hint` — alias of tip

> [!important] Important
> `important` — alias of tip

### Success family
> [!success] Success
> `success`

> [!check] Check
> `check` — alias of success

> [!done] Done
> `done` — alias of success

### Question family
> [!question] Question
> `question`

> [!help] Help
> `help` — alias of question

> [!faq] FAQ
> `faq` — alias of question

### Warning family
> [!warning] Warning
> `warning`

> [!caution] Caution
> `caution` — alias of warning

> [!attention] Attention
> `attention` — alias of warning

### Failure family
> [!failure] Failure
> `failure`

> [!fail] Fail
> `fail` — alias of failure

> [!missing] Missing
> `missing` — alias of failure

### Danger family
> [!danger] Danger
> `danger`

> [!error] Error
> `error` — alias of danger

### Bug
> [!bug] Bug
> `bug`

### Example
> [!example] Example
> `example`

### Quote family
> [!quote] Quote
> `quote`

> [!cite] Cite
> `cite` — alias of quote

---

## 2. Width variants

> [!note|25] 25% width
> `> [!note|25]`

> [!note|50] 50% width
> `> [!note|50]`

> [!note|75] 75% width
> `> [!note|75]`

> [!note|100] 100% width
> `> [!note|100]`

---

## 3. Alignment variants

Width is included here so the alignment is easy to see.

> [!info|55|left] Left aligned
> `> [!info|55|left]`

> [!info|55|center] Center aligned
> `> [!info|55|center]`

> [!info|55|right] Right aligned
> `> [!info|55|right]`

---

## 4. Color variants

### Named CSS color
> [!note|orange] Named color: orange
> `> [!note|orange]`

### Short hex
> [!note|#f0a] Short hex: #f0a
> `> [!note|#f0a]`

### Full hex
> [!note|#7c3aed] Full hex: #7c3aed
> `> [!note|#7c3aed]`

### RGB
> [!note|rgb(30,144,255)] RGB
> `> [!note|rgb(30,144,255)]`

### RGBA
> [!note|rgba(255,99,71,0.5)] RGBA
> `> [!note|rgba(255,99,71,0.5)]`
>
> The plugin resolves the color without replacing the original callout type or icon.

### HSL
> [!note|hsl(160,60%,45%)] HSL
> `> [!note|hsl(160,60%,45%)]`

### Raw RGB triplet
> [!note|90, 180, 120] RGB triplet
> `> [!note|90, 180, 120]`

---

## 5. Style token variants

### Shadow
> [!note|shadow] Shadow
> `> [!note|shadow]`

### Rounded
> [!note|rounded] Rounded
> `> [!note|rounded]`

### Outline
> [!note|outline] Outline
> `> [!note|outline]`

### Glass
> [!note|glass] Glass
> `> [!note|glass]`

### Gradient
> [!note|gradient] Gradient
> `> [!note|gradient]`

### Borderless
> [!note|borderless] Borderless
> `> [!note|borderless]`

### Compact
> [!note|compact] Compact
> `> [!note|compact]`

### Hover
> [!note|hover] Hover
> Hover this callout. Syntax: `> [!note|hover]`

### Sticky
> [!note|sticky] Sticky
> Scroll this page to test sticky positioning. Syntax: `> [!note|sticky]`

---

## 6. Foldable variants

### Expanded by default
> [!tip|rounded|shadow]+ Expanded foldable callout
> This callout can be collapsed.

### Collapsed by default
> [!tip|rounded|shadow]- Collapsed foldable callout
> This content starts collapsed.

---

## 7. Custom CSS class variants

These examples confirm class parsing. They only look different if your theme/snippet defines these classes.

### Single custom class
> [!example|css=demo-card] Single custom class
> `> [!example|css=demo-card]`

### Multiple custom classes
> [!example|css=demo-card|css=accented] Multiple custom classes
> `> [!example|css=demo-card|css=accented]`

---

## 8. Combined metadata variants

### Width + color + alignment
> [!warning|60|orange|center] Width + color + center
> `> [!warning|60|orange|center]`

### Color + shadow + rounded
> [!tip|#22c55e|shadow|rounded] Color + shadow + rounded
> `> [!tip|#22c55e|shadow|rounded]`

### Outline + rounded + compact
> [!info|outline|rounded|compact] Outline + rounded + compact
> `> [!info|outline|rounded|compact]`

### Glass + shadow + rounded
> [!note|glass|shadow|rounded] Glass + shadow + rounded
> `> [!note|glass|shadow|rounded]`

### Gradient + hover + rounded
> [!example|gradient|hover|rounded] Gradient + hover + rounded
> `> [!example|gradient|hover|rounded]`

### Borderless + compact
> [!quote|borderless|compact] Borderless + compact
> `> [!quote|borderless|compact]`

### Large mixed example
> [!success|70|teal|center|shadow|rounded|outline|hover] Mixed metadata
> Width, color, alignment, shadow, rounded corners, outline, and hover are all active.

### Order independence
> [!question|hover|right|#8b5cf6|45|rounded|shadow] Tokens in a different order
> Metadata tokens can appear in any order.

### Mixed with custom CSS classes
> [!important|65|center|rounded|shadow|css=demo-card|css=accented] Built-in + custom CSS
> Built-in metadata and custom classes can be combined.

---

## 9. Title variants

### Default title
> [!note|rounded]
> No explicit title was provided.

### Custom title
> [!note|rounded] My custom title
> A custom title follows the closing bracket.

---

## 10. Nested callouts

> [!note|rounded|shadow] Parent callout
> Parent content.
>
> > [!tip|50|center|rounded] Nested callout
> > Nested callouts can use metadata too.

---

## 11. Full token reference

| Metadata | Example | Purpose |
| --- | --- | --- |
| `0`–`100` | `50` | Width percentage |
| `left` | `left` | Left alignment |
| `center` | `center` | Center alignment |
| `right` | `right` | Right alignment |
| CSS color | `orange` | Named color |
| CSS color | `#7c3aed` | Hex color |
| CSS color | `rgb(30,144,255)` | RGB color |
| CSS color | `rgba(255,99,71,0.5)` | RGBA input |
| CSS color | `hsl(160,60%,45%)` | HSL color |
| RGB triplet | `90, 180, 120` | Raw RGB channels |
| `shadow` | `shadow` | Shadow effect |
| `rounded` | `rounded` | Rounded corners |
| `outline` | `outline` | Outline effect |
| `glass` | `glass` | Glass effect |
| `gradient` | `gradient` | Gradient effect |
| `borderless` | `borderless` | Removes border |
| `compact` | `compact` | Reduced padding |
| `hover` | `hover` | Hover lift animation |
| `sticky` | `sticky` | Sticky positioning |
| `css=name` | `css=demo-card` | Adds a custom CSS class |

---

## 12. Syntax template

```markdown
> [!type|width|color|alignment|style|css=class] Optional title
> Callout content
```

Example:

```markdown
> [!note|60|#7c3aed|center|shadow|rounded|hover|css=my-card] Example
> Content goes here.
```
