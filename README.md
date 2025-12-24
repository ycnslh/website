# reho.dev

A minimalist personal blog built with Astro, deployed at [reho.dev](https://reho.dev).

## Features

### Blog System
- **Markdown/MDX** content with Zod validation
- **Reading time** auto-calculated via custom remark plugin
- **Reading progress bar** at top of articles
- **Hero images** with Sharp optimization
- **Tags system** with dedicated pages, post counting, and navigation
- **Pagination** (10 posts per page)
- **Minimalist list design** inspired by Chiri (title + date only, hover fade effect)
- **Related posts** based on tag similarity algorithm
- **Share buttons** with Web Share API and social fallbacks
- **Breadcrumbs navigation** for improved UX
- **RSS feed** generation

### Advanced Code Blocks
Custom Shiki transformers providing:
- **Line numbers** with sticky gutter
- **Copy button** (appears on hover)
- **Language badge** (fades on hover)
- **Title bar** support via ` ```js title="file.js" `
- **Diff notation**: `// [!code ++]` and `// [!code --]`
- **Highlight notation**: `// [!code highlight]`
- **Dual themes**: github-light / github-dark

### Table of Contents
- Auto-generated from h2 and h3 headings
- **Desktop**: Sticky sidebar (≥1024px)
- **Mobile**: Top of article (<1024px)
- Active section highlighting during scroll
- Smooth scroll navigation with requestAnimationFrame

### Search
- **Pagefind** static search (build-time indexing)
- Custom rounded-full UI design
- Query parameter support (`?q=...`)
- Full dark mode support

### Design System
- **Dark mode** toggle (localStorage + system preference)
- **Top navigation bar** (sticky header with glassmorphism)
- **Color scheme**:
  - Light: Beige (#e6e4e0) background, dark gray text
  - Dark: Pure black (#000000) background, white text
  - Accent: Violet links (#7c3aed / #a78bfa)
- **Custom scrollbar** with accent color on hover
- **CSS variables** for consistent theming
- **Smooth transitions** (targeted, not global)
- **Fade-in animations** with staggered delays
- **Scrollbar gutter** for stable layout
- **Subtle background patterns** (noise texture)
- **Glassmorphism effects** (backdrop blur on header)

### UI Components
Reusable component library:
- **Button** (primary, ghost, outline variants)
- **Card** (with optional hover effects)
- **Badge** (for tags)
- **ShareButtons** (Web Share API + social links)
- **RelatedPosts** (tag-based similarity)
- **Breadcrumbs** (navigation)
- **ReadingProgress** (scroll indicator)
- **SkipLink** (accessibility)

### SEO & Performance
- Enhanced Open Graph and Twitter Cards meta tags
- Twitter creator and site attribution
- Canonical URLs
- Sitemap auto-generation
- RSS feed
- Static site generation (SSG)
- Image optimization (Sharp)
- Font preloading (Atkinson regular/bold)
- Passive event listeners for scroll performance
- requestAnimationFrame for smooth animations

### Accessibility
- **ARIA labels** on navigation elements
- **Skip to main content** link
- **Focus visible** states for keyboard navigation
- **prefers-reduced-motion** support
- Semantic HTML structure
- Proper heading hierarchy
- Color contrast compliance

## Tech Stack

- **[Astro](https://astro.build/)** 5.13.9 - Static site generator
- **[Tailwind CSS v4](https://tailwindcss.com/)** - CSS framework with typography plugin
- **[Shiki](https://shiki.matsu.io/)** - Syntax highlighting with custom transformers
- **[Pagefind](https://pagefind.app/)** - Static search functionality
- **[MDX](https://mdxjs.com/)** - Enhanced Markdown support
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization

## Project Structure

```
/
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages auto-deployment
├── public/
│   ├── fonts/                  # Atkinson font (regular + bold)
│   ├── icons/code.svg          # SVG sprite for code blocks
│   ├── patterns/
│   │   ├── noise.svg           # Subtle background texture
│   │   └── grid.svg            # Optional grid pattern
│   ├── CNAME                   # Domain: reho.dev
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BaseHead.astro      # SEO meta tags, fonts
│   │   ├── Header.astro        # Top navigation bar + dark mode
│   │   ├── Footer.astro
│   │   ├── TOC.astro           # Table of contents
│   │   ├── ThemeScript.astro   # Dark mode logic (consolidated)
│   │   ├── SkipLink.astro      # Accessibility skip link
│   │   ├── ReadingProgress.astro # Scroll progress bar
│   │   ├── Breadcrumbs.astro   # Navigation breadcrumbs
│   │   ├── ShareButtons.astro  # Web Share API + social
│   │   ├── RelatedPosts.astro  # Tag-based related posts
│   │   ├── FormattedDate.astro
│   │   ├── HeaderLink.astro
│   │   └── ui/
│   │       ├── Button.astro    # Button component (variants)
│   │       ├── Card.astro      # Card component
│   │       └── Badge.astro     # Badge component
│   ├── content/
│   │   ├── config.ts           # Zod schema (with tags)
│   │   └── blog/               # Blog posts (.md/.mdx)
│   ├── layouts/
│   │   └── BlogPost.astro      # Blog layout with TOC, breadcrumbs, share, related
│   ├── pages/
│   │   ├── index.astro         # Home page (hero + featured posts)
│   │   ├── about.astro         # About page (bio + skills)
│   │   ├── search.astro        # Pagefind UI
│   │   ├── 404.astro           # Custom error page
│   │   ├── rss.xml.js          # RSS feed
│   │   ├── blog/
│   │   │   ├── [...page].astro # Paginated list
│   │   │   └── [...slug].astro # Individual post
│   │   └── tags/
│   │       ├── index.astro     # All tags with counts
│   │       └── [tag].astro     # Posts by tag
│   ├── plugins/
│   │   └── shiki-transformers.ts  # 6 custom transformers
│   ├── styles/
│   │   └── global.css          # Tailwind + code styles + scrollbar
│   ├── utils/
│   │   └── relatedPosts.ts     # Tag similarity algorithm
│   ├── assets/                 # Blog images
│   ├── consts.ts               # Site constants
│   └── content.config.ts       # Alternative config
├── astro.config.mjs            # Main config
├── remark-reading-time.mjs     # Reading time plugin
├── tailwind.config.js          # Tailwind v4
├── tsconfig.json               # TypeScript strict
└── CLAUDE.md                   # Full documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

## Commands

| Command            | Action                                |
|:-------------------|:--------------------------------------|
| `npm run dev`      | Start dev server at `localhost:4321`  |
| `npm run build`    | Build production site to `./dist/`    |
| `npm run preview`  | Preview build locally                 |

## Writing Blog Posts

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'My Blog Post'
description: 'A brief description for SEO'
pubDate: 'Dec 20 2024'
updatedDate: 'Dec 21 2024'  # optional
heroImage: '../../assets/image.jpg'  # optional
tags: ['blog', 'tutorial']  # optional
---

Your content here...
```

### Code Block Features

The custom Shiki transformers enable advanced code block features:

**Title bar:**
````markdown
```js title="config.js"
export default { foo: 'bar' }
```
````

**Diff notation:**
````markdown
```js
const old = 'value'  // [!code --]
const new = 'updated'  // [!code ++]
```
````

**Highlight lines:**
````markdown
```js
const important = true  // [!code highlight]
```
````

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

**Workflow:** [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- Builds site with Astro
- Deploys to https://reho.dev (configured via `public/CNAME`)

### Custom Domain Setup

Already configured for `reho.dev`:
1. `public/CNAME` contains domain
2. `astro.config.mjs` sets `site: 'https://reho.dev'`
3. DNS points to GitHub Pages

## Key Implementation Details

### Custom Shiki Transformers

Six transformers in [src/plugins/shiki-transformers.ts](src/plugins/shiki-transformers.ts):
1. **updateStyle()** - Wraps code in `div > pre > code` structure
2. **addTitle()** - Parses meta string for title bar
3. **addLanguage()** - Language badge (top-right, fades on hover)
4. **addCopyButton()** - Copy button with success state
5. **transformerNotationDiff()** - Parses `[!code ++/--]`
6. **transformerNotationHighlight()** - Parses `[!code highlight]`

### Tags System

Implements tag-based navigation:
- [src/pages/tags/index.astro](src/pages/tags/index.astro) - Lists all tags
- [src/pages/tags/[tag].astro](src/pages/tags/[tag].astro) - Posts by tag
- Uses `import.meta.glob()` to access frontmatter tags

### Table of Contents

[src/components/TOC.astro](src/components/TOC.astro) extracts h2/h3 headings and provides:
- Responsive layout (sidebar desktop, top mobile)
- Active section highlighting via IntersectionObserver
- Smooth scroll navigation

### Dark Mode

Toggle in [src/components/Header.astro](src/components/Header.astro):
- Stores preference in `localStorage`
- Falls back to system preference
- Updates `<html>` class for Tailwind

## Configuration Files

- [astro.config.mjs](astro.config.mjs) - Astro config with MDX, sitemap, pagefind
- [tailwind.config.js](tailwind.config.js) - Tailwind v4 with dark mode
- [src/content/config.ts](src/content/config.ts) - Zod schema for blog posts
- [remark-reading-time.mjs](remark-reading-time.mjs) - Custom remark plugin
- [src/consts.ts](src/consts.ts) - Site title and description

## Architecture Principles

- **Minimalist design** - Pure black/beige color scheme, clean typography
- **Performance** - SSG with image optimization, static search
- **Accessibility** - Semantic HTML, proper contrast, ARIA labels
- **Developer experience** - TypeScript strict mode, Zod validation, modular components

## License

MIT - Feel free to use as inspiration for your own website!