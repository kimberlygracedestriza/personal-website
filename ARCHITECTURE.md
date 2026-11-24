# Site structure

Rule: **one feature = one file.** A feature's markup, styles, animation and its own content all live in that file. Delete the file (and its one line in a list) and the feature is gone, with nothing left behind.

## Stack

| Part | Tool | Why |
|------|------|-----|
| Framework | Astro 7 | Outputs plain static HTML (best for SEO and speed), one `.astro` file per component |
| Animation | GSAP (ScrollTrigger, Draggable) | Industry standard for advanced scroll and timeline animation |
| Smooth scroll | Lenis | Smooth scrolling that works with ScrollTrigger |
| Runtime | Node 26 LTS | Installed at `~/.local/node-v26.13.0-darwin-arm64` |

## Folders

```
src/
  config/
    site.ts          who you are: name, email, links, booking URL, photos (shared by many features)
    sections.ts      THE PAGE ORDER: one line per section, plus its nav label
  sections/          one file per page section (rendered in the order of sections.ts)
    Hero.astro  About.astro  Work.astro  Journey.astro  Skills.astro  Milestones.astro  Contact.astro  Footer.astro
  features/          site-wide features that are not a page section
    Loader.astro     intro loader
    Nav.astro        top navigation and pill-on-scroll
    ThemeToggle.astro  dark and light switch (used inside Nav)
    HeroMesh.astro   moving mesh gradient (used inside Hero)
  components/        small pieces reused by many sections
    Squiggle.astro   hand-drawn underline
    Wave.astro       curved section edge
  layouts/
    Base.astro       <html>, <head>, fonts, theme start-up, smooth scroll. SEO tags go here later.
  lib/
    motion.ts        shared GSAP and Lenis setup, plus the "page ready" signal
  styles/
    tokens.css       colors, fonts, the five font sizes, dark and light themes
    global.css       shared building blocks: reset, .wrap, .section, .btn, .pill, .h2
  pages/
    index.astro      the home page (Loader + Nav + sections from sections.ts)
public/img/          images, served as /img/...
```

## Common jobs

**Add a section**
1. Create `src/sections/Services.astro`. Copy the shape of an existing one: comment header, `interface Props { id: string }`, markup, `<style>`, `<script>`.
2. Add `{ file: 'Services', id: 'services', nav: 'Services' }` to `src/config/sections.ts` where you want it to appear.

**Remove a section**: delete its line in `sections.ts` and delete its file.
**Hide a section for now**: comment out its line in `sections.ts`.
**Reorder sections**: move lines in `sections.ts`. The nav updates by itself.

**Remove a site-wide feature**: each file's top comment says which one line to delete. For example, the Loader: delete `<Loader />` in `pages/index.astro`, then delete `features/Loader.astro`.

**Change text in a section**: open that section's file. Its content (lists, stats, projects) is at the top, between the `---` lines.
**Change your name, email or links**: `src/config/site.ts`.
**Change colors, fonts or sizes**: `src/styles/tokens.css`.

## Rules that keep it clean

- A feature never edits another feature's elements. If two features need to talk, use an event (`site:ready`, `site:navigate`) or `lib/motion.ts`.
- Animations that play on page entry wait for `onReady()` from `lib/motion.ts`, so they work with or without the Loader.
- Styles inside a `.astro` file only affect that file. Only shared building blocks go in `styles/global.css`.
- Use only the five font sizes in `tokens.css` (`--fs-xs`, `--fs-base`, `--fs-md`, `--fs-lg`, `--fs-xl`).
- No emojis or decorative symbols.

## Commands

Run these in this folder. If `npm` is not found, run this first:
`export PATH="$HOME/.local/node-v26.13.0-darwin-arm64/bin:$PATH"`

| Command | Does |
|---------|------|
| `npm run dev` | local preview at http://localhost:4321 (updates as you edit) |
| `npm run build` | builds the final site into `dist/` |
| `npm run preview` | previews the built `dist/` |

## Later (planned)

- **SEO**: add `site` in `astro.config.mjs`, meta tags, Open Graph and schema.org in `layouts/Base.astro`, plus a sitemap.
- **Advanced animation**: add each one as its own file in `features/`, then place it with one line.
