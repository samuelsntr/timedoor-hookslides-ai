# HookSlides AI Brand Identity System

**Version:** 1.0  
**Source:** Existing landing-page implementation  
**Canonical direction:** Warm Editorial

This document formalizes the visual language already shipped on the landing page. It is the reference for future marketing pages, product surfaces, UI components, content, and design assets.

## 1. Brand Overview

### Positioning

HookSlides AI turns a topic, article, or YouTube link into a polished, brand-ready carousel quickly. The brand should make content creation feel less like production work and more like a confident editorial workflow.

### Personality

- **Warm:** human, approachable, paper-like, never sterile.
- **Editorial:** thoughtful hierarchy, expressive serif display type, deliberate composition.
- **Capable:** polished outputs, clear systems, precise structure.
- **Energetic:** vermilion accents, directional arrows, movement, visible transformation.
- **Practical:** direct copy, useful outcomes, minimal friction.

### Tone of voice

Use confident, conversational, outcome-led language. Prefer short active sentences and concrete verbs: “Turn,” “Choose,” “Generate,” “Export.” Sound expert without sounding corporate. Make the product feel fast and empowering, not magical or vague.

Avoid hype without proof, dense jargon, apologetic language, and generic AI phrasing. Keep headlines editorial and memorable; keep supporting copy clear and useful.

### Visual direction

Warm editorial design: cream paper backgrounds, dark ink typography, vermilion calls to action, expressive Fraunces headlines, restrained Inter body copy, tactile borders, large rounded forms, and carousel-card compositions. Decorative movement may use dots, orbital paths, soft gradients, and subtle floating animation.

---

## 2. Color Palette

### Core palette

| Role | Name | HEX | Usage |
|---|---|---:|---|
| Primary background | Paper | `#FAF7F2` | Default page background, light surfaces, button text on dark/vermillion |
| Secondary background | Sand | `#F1ECE3` | Alternating sections, muted cards, content bands |
| Card surface | White | `#FFFFFF` | Badges, elevated cards, image containers, high-contrast surfaces |
| Primary text | Ink | `#1C1A17` | Headlines, navigation, body emphasis, dark buttons |
| Secondary text | Taupe | `#5C574E` | Paragraphs, labels, metadata, supporting copy |
| Primary action | Vermilion | `#E24B2C` | CTAs, active states, accent marks, positive emphasis |
| Primary hover | Deep Vermilion | `#C93D21` | Hover state for vermilion buttons |
| Soft accent | Blush | `#F6D9CF` | Icon circles, soft emphasis, accent backgrounds |
| Border | Sand Line | `#E4DDD0` | Dividers, input borders, card outlines, navigation rule |
| Destructive | Error Red | `#B3261E` | Destructive/error state only |
| Light text | Warm White | `#FFFDF9` | Text on Vermilion and Ink surfaces |

### Functional accent colors

Use these sparingly for categorization, icons, illustrations, and supporting visual systems. They do not replace Vermilion as the brand action color.

- **Purple:** `#6D5EF7` — discovery, creative intelligence, secondary decorative accent.
- **Blue:** `#4F8EF7` — structure, information, supporting data.
- **Amber:** `#D97706` — attention, process, annotation.
- **Pink:** `#DB2777` — expressive variation.
- **Cyan:** `#0891B2` — formatting or technical utility.
- **Green:** `#16A34A` — completion, export, success.

### Usage rules

- Use Paper as the default canvas; use Sand to create section rhythm.
- Use Ink for primary reading contrast. Use Taupe for secondary information.
- Reserve Vermilion for meaningful action or emphasis; do not flood entire layouts with it.
- Keep borders subtle and warm. Avoid cool gray borders on Warm Editorial surfaces.
- Place light text only on Ink, Vermilion, or sufficiently dark image overlays.
- Preserve accessible contrast for text, buttons, focus states, and icons. Decorative opacity reductions must not be applied to essential information.

### Canonical CSS tokens

```css
.landing {
  --background: #faf7f2;
  --foreground: #1c1a17;
  --card: #ffffff;
  --card-foreground: #1c1a17;
  --popover: #ffffff;
  --popover-foreground: #1c1a17;
  --primary: #e24b2c;
  --primary-foreground: #fffdf9;
  --secondary: #f1ece3;
  --secondary-foreground: #1c1a17;
  --muted: #f1ece3;
  --muted-foreground: #5c574e;
  --accent: #f6d9cf;
  --accent-foreground: #1c1a17;
  --destructive: #b3261e;
  --border: #e4ddd0;
  --input: #e4ddd0;
  --ring: #e24b2c;
  --radius: 0.75rem;
}
```

---

## 3. Typography

### Families

| Family | Role | Guidance |
|---|---|---|
| **Fraunces** | Primary display / editorial | H1–H3, feature headlines, expressive card titles, wordmark-adjacent copy |
| **Inter** | Primary UI / body | Paragraphs, navigation, labels, buttons, metadata, forms |
| `ui-serif, Georgia, serif` | Fraunces fallback | Use when the web font is unavailable |
| `ui-sans-serif, system-ui, sans-serif` | Inter fallback | Use when the web font is unavailable |

### Weight and treatment

- Fraunces: `400` for editorial/italic emphasis; `600–700` for strong headings.
- Inter: `400` body; `500–600` UI and supporting emphasis; `700` compact labels where needed.
- Headings use optical sizing and approximately `-0.02em` tracking.
- Editorial emphasis uses Fraunces italic in Vermilion or Ink.
- Avoid all-caps body copy. All-caps is reserved for short eyebrows, metadata, and labels.

### Type hierarchy

| Level | Size | Line height | Typical use |
|---|---:|---:|---|
| Display | `4.25rem` desktop; `2.75rem` mobile | `1.05` | Hero headline |
| H1/H2 | `3–3.5rem` desktop; `1.875–2.25rem` mobile | `1.1–1.15` | Section headlines |
| H3 | `1.25–1.5rem` | `1.2–1.3` | Cards and steps |
| Body large | `1.125rem` | `1.6` | Introductory paragraph |
| Body | `15–16px` | `1.5–1.6` | Standard copy |
| UI | `14px` | `1.4` | Navigation, controls |
| Eyebrow | `12px` | normal | Uppercase labels, `0.14em` tracking |
| Metadata | `11–12px` | normal | Slide numbers, captions |

Use responsive sizing rather than fixed display sizes where the layout requires it. Carousel slide type uses container query units so the same renderer works as hero art, showcase content, or a thumbnail.

---

## 4. Visual Style

### Design principles

1. **Editorial hierarchy:** expressive headline, restrained support, clear action.
2. **Warm contrast:** Ink and Vermilion against Paper and Sand.
3. **Tactile structure:** thin warm borders, paper-like surfaces, rounded containers.
4. **Output-first composition:** show the carousel result wherever possible.
5. **Progressive disclosure:** reveal complexity through steps, tabs, and examples.
6. **Quiet motion:** movement supports attention; it never competes with content.

### Layout and spacing

- Use a centered maximum width of `80rem` (`max-w-7xl`) for major sections.
- Horizontal page padding: `1.5rem` mobile, `2.5rem` desktop.
- Major section padding: `5rem` mobile, `7rem` desktop.
- Common grid gaps: `1.5rem`, `2rem`, `3rem`, `4rem`, `5rem` depending on hierarchy.
- Use full-width border rules to separate alternating bands.
- Keep text columns readable: approximately `32–42rem` maximum for long copy.

### Radius

- Base radius: `0.75rem`.
- Compact controls: `0.5–0.75rem`.
- Standard cards: `1rem` (`rounded-2xl`).
- Audience/feature cards: `2.25rem` for a distinctive editorial shape.
- Buttons, badges, tags, and pills: fully rounded (`9999px`).
- Circular icon containers: `50%`.

### Borders and shadows

- Default border: `1px solid #E4DDD0`.
- Emphasized state: `2px solid #E24B2C`.
- Use soft shadows with warm Ink opacity, not hard black drop shadows:
  - Small: `0 4px 16px -4px rgba(28,26,23,.15)`
  - Medium: `0 12px 24px -4px rgba(28,26,23,.25)`
  - Large output cards: `0 30px 70px -28px rgba(28,26,23,.45)`
- Shadows should signal elevation or output quality. Do not shadow every text block.

### Motion

- Scroll reveal: opacity + `1.25rem` vertical translation, `700ms`, cubic-bezier `(0.16, 1, 0.3, 1)`.
- Hero entrance and card fanning may use `1000–2000ms` eased transitions.
- Hover lift: approximately `translateY(-0.5rem)` to `-0.625rem` on prominent cards.
- Floating decorative elements must remain subtle and low contrast.
- Respect `prefers-reduced-motion: reduce`: remove transforms, transitions, and animations; content remains visible.

---

## 5. Imagery & Illustration

### Photography

Use candid, human-centered imagery: creators, founders, marketers, or people working with content. Favor warm natural light, evening light, tactile environments, and real moments over polished corporate stock photography.

The final CTA uses a warm photograph with an Ink overlay at approximately 75% opacity so light text remains legible. Images should support the story, not act as decorative noise.

### Image treatment

- Use `object-fit: cover` for atmospheric background photography.
- Use `object-fit: contain` for transparent illustrations and carousel output.
- Keep image corners aligned with their containing card radius.
- Use warm Paper/Sand overlays where text sits over imagery.
- Prefer subtle blur, gradients, or opacity overlays over aggressive filters.

### Illustration direction

Illustrations should feel editorial and product-aware: simplified scenes, clear silhouettes, warm neutrals, controlled color accents, and enough negative space to sit inside rounded containers. Avoid glossy 3D SaaS clichés, neon gradients, and unrelated icon packs.

### Decorative language

Approved motifs: dotted fields, orbital ellipses, dashed paths, small nodes, soft radial glows, underlines, sparkles, and fanned carousel cards. Keep motifs behind content, low opacity, and geometrically calm.

---

## 6. Logo Guidelines

### Logo style

The current mark is the `logohs.png` asset paired with a serif HookSlides wordmark. The landing navigation uses “HookSlides” followed by a Vermilion period: **HookSlides.** This punctuation is part of the expressive wordmark treatment.

### Variations

1. **Primary lockup:** mark + `HookSlides.` wordmark for navigation and brand headers.
2. **Mark only:** `logohs.png` for compact contexts, favicon-adjacent placements, and footer use.
3. **Text-only fallback:** `HookSlides.` in Fraunces when the image mark cannot be loaded.

Do not redraw, stretch, rotate, recolor, or add effects to the mark.

### Sizing and placement

- Navigation mark: approximately `28px` square.
- Footer mark: approximately `22px` square.
- Keep the logo aligned to the primary content container and vertically centered in navigation.
- Use Ink for the wordmark; use Vermilion only for the terminal period or approved accent treatment.
- On Paper or White backgrounds, use the standard mark. On dark backgrounds, ensure sufficient contrast before using the mark.

### Clear space

Maintain clear space around the complete lockup equal to at least the mark's visible width on all sides. Never place borders, text, imagery, or controls inside this area. For small UI contexts where that rule makes the lockup impractical, use the mark alone rather than compressing the lockup.

---

## 7. UI / Component Guidelines

### Navigation

- Sticky or fixed header with Paper background at approximately `85%` opacity and backdrop blur.
- Bottom border uses Sand Line.
- Navigation height: approximately `4rem`.
- Wordmark uses Fraunces, medium/semibold weight.
- Links use Inter, `14px`, Taupe; active or hover states use Ink or Vermilion.
- Primary nav action is a dark Ink pill or Vermilion CTA, never a noisy outlined control.
- Mobile navigation uses a compact rounded icon button and a bordered Paper menu panel.

### Buttons

**Primary Vermilion**

- Background `#E24B2C`; text `#FFFDF9`.
- Fully rounded; approximately `52px` high for hero actions.
- Horizontal padding approximately `28px` for major CTAs.
- Hover: `#C93D21` plus a soft Vermilion shadow.
- Include an arrow or purposeful icon only when it clarifies the action.

**Primary Ink**

- Background `#1C1A17`; text `#FAF7F2`.
- Use for navigation and secondary high-confidence actions.
- Hover may shift to Vermilion when the action is brand-prominent.

**Secondary / quiet**

- Paper or Sand background, warm border, Ink/Taupe text.
- Use for filters, template tabs, and low-emphasis actions.
- Fully rounded for selector-like controls; rounded rectangle for standard form controls.

All interactive controls require visible keyboard focus. Use a `2px` ring/outline with sufficient offset and contrast.

### Badges and labels

- Short, uppercase, tracked labels (`0.14em`).
- Pill shape with warm border and Paper/White surface.
- Vermilion dot or icon provides the visual anchor.
- Keep labels concise; never use a badge as a paragraph.

### Cards

- Paper/White surface on Sand or Paper backgrounds.
- Warm 1px border; `1rem` radius for standard cards.
- Use `2.25rem` radius for audience or hero editorial cards.
- Padding generally `1.75–2.25rem`.
- Hover state may lift, scale an image slightly, deepen shadow, or strengthen border — not all at once.
- Carousel output cards may use larger warm shadows and a subtle ring.

### Forms

- Use Paper/White input surfaces with Sand Line borders.
- Labels use Inter, medium weight, Ink.
- Supporting text uses Taupe.
- Focus uses Vermilion ring/border.
- Error uses Error Red and must include text, not color alone.
- Keep fields generously padded and rounded consistently with the surrounding component family.

### Icons

Use Lucide icons or an equally restrained line-icon system. Default stroke width: approximately `2–2.5`. Keep icons inside circular or rounded-square containers when they represent a process step. Icons clarify meaning; they do not replace labels. Use functional accent colors only for categorization.

### Carousel output

- Default aspect ratio: `4 / 5`.
- Use container queries for internal type scale.
- Kicker: approximately `3.4cqw`, tracking `0.14em`.
- Heading: approximately `8.4cqw`, line-height `1.12`.
- Large heading: approximately `10.5cqw`, line-height `1.08`.
- Body: approximately `4.6cqw`, line-height `1.5`.
- Numeral: approximately `15cqw`.
- Treat output as the visual proof of the product; show it early and often.

---

## 8. Brand Do's & Don'ts

### Do

- Use Paper, Sand, Ink, and Vermilion as the default visual conversation.
- Pair expressive Fraunces headlines with practical Inter copy.
- Show real carousel output, transformations, and concrete workflow steps.
- Use generous whitespace and a clear reading hierarchy.
- Use warm borders and restrained shadows to create tactile depth.
- Use Vermilion to direct attention toward one primary action.
- Use editorial italics for selected emphasis, not every heading.
- Keep motion subtle and provide reduced-motion behavior.
- Keep imagery human, warm, candid, and relevant to content work.
- Preserve keyboard focus, readable contrast, and descriptive image alternatives.

### Don't

- Do not introduce a new primary palette, especially cool gray/purple, on Warm Editorial surfaces.
- Do not use Fraunces for dense UI, long paragraphs, or form labels.
- Do not make every element a pill, gradient, shadow, or animation.
- Do not use neon, glassmorphism-heavy, cyberpunk, or generic enterprise SaaS styling.
- Do not use low-contrast Taupe for essential text or controls.
- Do not place busy photography behind copy without a readable overlay.
- Do not overuse decorative orbital graphics or functional accent colors.
- Do not stretch, recolor, redraw, or add effects to the logo.
- Do not use vague AI claims where a specific workflow or outcome is available.
- Do not ship motion that ignores `prefers-reduced-motion`.

---

## Implementation note

The landing page intentionally overrides the application's older cool-gray/purple tokens from `frontend/user/src/index.css` through `frontend/user/src/styles/landing.css`. Warm Editorial is the master brand. The older app theme is legacy and should not be introduced into new surfaces; migrate existing product screens when those screens receive brand work.

## Source files

- `frontend/user/src/styles/landing.css`
- `frontend/user/src/index.css`
- `frontend/user/src/pages/landing/index.tsx`
- `frontend/user/src/pages/landing/sections/hero.tsx`
- `frontend/user/src/pages/landing/sections/problem.tsx`
- `frontend/user/src/pages/landing/sections/solution.tsx`
- `frontend/user/src/pages/landing/sections/how-it-works.tsx`
- `frontend/user/src/pages/landing/sections/strategies.tsx`
- `frontend/user/src/pages/landing/sections/showcase.tsx`
- `frontend/user/src/pages/landing/sections/before-after.tsx`
- `frontend/user/src/pages/landing/sections/who-its-for.tsx`
- `frontend/user/src/pages/landing/sections/final-cta.tsx`
- `frontend/user/src/assets/logohs.png`
- `frontend/user/src/assets/landing/`
