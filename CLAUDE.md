# reho.dev

Blog personnel minimaliste moderne construit avec Astro, optimisé pour 2025.

## Stack technique

- **Framework**: Astro 5.13.9 (SSG)
- **Styling**: Tailwind CSS v4.1.13 + Tailwind Typography
- **Content**: Markdown/MDX avec collections
- **Search**: Pagefind (recherche statique)
- **Deployment**: GitHub Pages (reho.dev)
- **Syntaxe**: Shiki (github-light/dark)

## Architecture

```
src/
├── components/
│   ├── Header.astro          # Top navigation bar + dark mode
│   ├── Footer.astro          # Footer simple
│   ├── BaseHead.astro        # Meta tags SEO
│   ├── TOC.astro             # Table of Contents avec scroll tracking
│   ├── ShareButtons.astro    # Web Share API + social sharing
│   ├── RelatedPosts.astro    # Posts similaires par tags
│   ├── ReadingProgress.astro # Barre de progression de lecture
│   ├── Breadcrumbs.astro     # Navigation fil d'Ariane
│   ├── SkipLink.astro        # Accessibilité skip to content
│   ├── ThemeScript.astro     # Script theme consolidé
│   ├── FormattedDate.astro   # Format de date
│   └── ui/
│       ├── Button.astro      # Bouton réutilisable (primary/ghost/outline)
│       ├── Badge.astro       # Badge pour tags (default/accent/muted)
│       └── Card.astro        # Card avec hover effect
├── layouts/
│   └── BlogPost.astro        # Layout complet avec TOC, share, related
├── pages/
│   ├── index.astro           # Hero + Featured posts
│   ├── about.astro           # About avec skills & contact
│   ├── 404.astro             # Page erreur personnalisée
│   ├── search.astro          # Interface Pagefind
│   ├── blog/
│   │   ├── [...page].astro   # Liste paginée minimaliste
│   │   └── [...slug].astro   # Article individuel
│   └── tags/
│       ├── index.astro       # Grille de tags avec compteurs
│       └── [tag].astro       # Articles par tag
├── content/
│   ├── config.ts             # Schéma Zod pour validation
│   └── blog/                 # Articles .md/.mdx
├── utils/
│   └── relatedPosts.ts       # Algorithme de similarité par tags
├── plugins/
│   └── shiki-transformers.ts # Code blocks personnalisés
└── styles/
    └── global.css            # Tailwind + Shiki + Design system
```

## Design System

### CSS Variables
```css
:root {
  --color-bg: #e6e4e0;           /* Fond beige */
  --color-text: #1a1a1a;         /* Texte principal */
  --color-accent: #7c3aed;       /* Violet accent */
  --color-accent-hover: #6d28d9; /* Violet hover */
  --color-muted: #6b7280;        /* Texte secondaire */
  --color-border: rgba(0,0,0,0.1); /* Bordures */
  --color-surface: rgba(255,255,255,0.6); /* Cards/overlays */
  --color-glass: rgba(255,255,255,0.9);   /* Glassmorphism */
  --gradient-warm: linear-gradient(135deg, #e6e4e0 0%, #f0ede8 100%);
  --gradient-accent: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
}

.dark {
  --color-bg: #000000;           /* Noir pur */
  --color-text: #ffffff;         /* Texte blanc */
  --color-accent: #a78bfa;       /* Violet clair */
  --color-accent-hover: #c4b5fd;
  --color-muted: #9ca3af;
  --color-border: rgba(255,255,255,0.1);
  --color-surface: rgba(255,255,255,0.05);
  --color-glass: rgba(0,0,0,0.9);
}
```

### Fonts
- **Atkinson** (custom) pour le body
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- `font-display: swap` pour performance

### Patterns
- **noise.svg**: Texture subtile de fond (opacité 0.05)
- **grid.svg**: Grille optionnelle pour backgrounds

### Code Blocks (Shiki)
- Numéros de ligne
- Badge langue (disparaît au hover)
- Bouton copier (apparaît au hover)
- Title bar: ` ```js title="example.js" `
- Diff: `// [!code ++]` ou `// [!code --]`
- Highlight: `// [!code highlight]`

## Features

### Navigation
- **Top sticky header** avec glassmorphism (backdrop-blur)
- Logo cliquable "Reho" à gauche
- Liens centre: Blog, Tags, About
- Actions droite: Theme toggle uniquement
- **Responsive**:
  - Mobile: liens réduits, tout reste visible
  - Hover effects: translateY(-2px) + background surface
  - Active link: underline effet avec scaleX
- **Fixed top** avec border-bottom subtil
- **Body padding-top: 4rem** pour compenser le fixed header
- **Social links**: Uniquement sur la page About (GitHub, X/Twitter)

### Page d'Accueil
- Hero section avec gradient background
- Description engageante
- CTA buttons (Read Blog / About Me)
- Featured posts (3 derniers articles)
- Grid responsive avec Cards
- Animations fadeInUp

### About Page
- Bio complète et professionnelle
- Skills & Technologies (3 catégories avec icônes):
  - Infrastructure: Kubernetes, Terraform, Cloud, CI/CD
  - Development: Python, Go, Bash, APIs
  - Practices: Monitoring, Security, SRE, Documentation
- Section "Let's Connect" avec liens sociaux
- Design moderne avec Cards

### Blog System
- Collections Astro avec validation Zod
- Reading time calculé automatiquement
- Hero images optimisées
- Support MDX
- RSS feed
- **Design minimaliste**:
  - Liste simple: titre + date
  - Hover effect: translateX + color change
  - Opacity fade sur autres items
  - 10 articles par page
  - Pagination avec hover effects

### Blog Post Layout
- **Reading Progress Bar** en haut (apparaît après scroll)
- **Breadcrumbs** (Home > Blog > Title)
- **TOC** (Desktop: sidebar sticky, Mobile: en haut)
- **Share Buttons**:
  - Web Share API natif (mobile)
  - Twitter/X share
  - LinkedIn share
  - Copy link avec feedback
- **Related Posts** (3 articles similaires par tags)
- **Tags** cliquables avec Badge component
- **Skip Link** pour accessibilité

### Tags System
- Page `/tags/` avec grille de cards
- Compteur de posts par tag
- Tags triés par popularité puis alphabétiquement
- Pages dynamiques `/tags/{tag}/`
- Navigation bidirectionnelle article ↔ tag
- Hover effects (translateY + background accent)

### Table of Contents
- Génération auto depuis h2 et h3
- Desktop: Sidebar sticky à droite (≥1024px)
- Mobile: Affichage en haut (<1024px)
- Surlignage de section active (scroll tracking avec requestAnimationFrame)
- Smooth scroll au clic
- Border-left accent sur item actif
- Throttling optimisé

### Search
- Pagefind (recherche côté client)
- Input sur `/blog` → redirect vers `/search?q=...`
- UI personnalisée (rounded-full, dark mode)
- Keyboard shortcut ready

### 404 Page
- Design personnalisé avec gradient
- Animation float sur le code 404
- Boutons CTA (Home / Blog)
- Suggestions de navigation
- Animations fadeInUp

### SEO
- Sitemap auto-généré
- Meta tags Open Graph complets
- Twitter Cards
- Canonical URLs
- RSS feed
- Descriptions optimisées

### Dark Mode
- Toggle dans top navigation
- localStorage + prefers-color-scheme
- Transition smooth 300ms
- CSS variables pour tous les éléments
- Script consolidé (ThemeScript.astro)

### Accessibilité
- **WCAG Compliance**:
  - Skip to main content link
  - ARIA labels sur navigation
  - aria-hidden sur SVG décoratifs
  - Focus states visibles (outline accent)
  - Touch targets 44x44px minimum
  - Breadcrumbs avec aria-label
- **Performance**:
  - prefers-reduced-motion support
  - Passive event listeners
  - requestAnimationFrame pour scroll
  - Transitions ciblées (pas de global *)

### Micro-interactions
- **translateX**(8px) sur blog list items hover
- **translateY**(-4px) sur cards hover
- **scale**(1.05) sur badges hover
- **Color transitions** (200ms ease)
- **Opacity fades** sur blog list
- **Transform effects** optimisés

## UI Components

### Button.astro
```astro
<Button variant="primary" size="lg" href="/blog">
  Read the Blog
</Button>
```
- Variants: `primary`, `ghost`, `outline`
- Sizes: `sm`, `md`, `lg`
- Support href (link) ou type (button)

### Badge.astro
```astro
<Badge variant="muted" href="/tags/astro">
  Astro
</Badge>
```
- Variants: `default`, `accent`, `muted`
- Hover: scale(1.05) + color change

### Card.astro
```astro
<Card hover>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```
- Glassmorphism background
- hover prop: translateY(-4px) + shadow

## Utilities

### relatedPosts.ts
Algorithme de similarité basé sur tags partagés:
```typescript
getRelatedPosts(currentPost, allPosts, limit = 3)
// Retourne les 3 posts avec le plus de tags en commun
```

## Commandes

```bash
npm run dev      # Dev server
npm run build    # Build static (< 1s, 16 pages)
npm run preview  # Preview build local
```

## Déploiement

GitHub Actions auto-deploy sur push `main`:
1. Build Astro (< 1s)
2. Pagefind indexing
3. Deploy GitHub Pages
4. Disponible sur https://reho.dev

## Configuration

### Site Info (`src/consts.ts`)
```ts
SITE_TITLE = 'Reho'
SITE_DESCRIPTION = 'Systems Engineer'
```

### Content Schema (`src/content/config.ts`)
```ts
{
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: image().optional(),
  tags: z.array(z.string()).optional()
}
```

## Développement

### Ajouter un article
```md
---
title: 'Mon titre'
description: 'Description SEO'
pubDate: 'Dec 22 2024'
heroImage: '../../assets/image.jpg'
tags: ['astro', 'web', 'dev']
---

Contenu...
```

### Utiliser les composants
```astro
---
import Button from '../components/ui/Button.astro';
import Card from '../components/ui/Card.astro';
import Badge from '../components/ui/Badge.astro';
---

<Card hover>
  <h3>Titre</h3>
  <Badge variant="accent" href="/tags/dev">Dev</Badge>
  <Button variant="primary" href="/read-more">Lire</Button>
</Card>
```

## Notes Techniques

### Performance
- Build time: < 1s pour 16 pages
- requestAnimationFrame pour scroll handlers
- Passive event listeners
- Font-display: swap
- Images optimisées et cachées
- Transitions ciblées (pas de `* { transition }`)

### Tailwind v4
- Configuration via `tailwind.config.js`
- Plugin via `@tailwindcss/vite`
- Dark mode: `class` strategy
- Utilities customs pour design system

### Scrollbar Gutter
`scrollbar-gutter: stable` sur `html` pour éviter layout shift entre pages avec/sans scrollbar.

### Shiki Transformers
Transformeurs custom pour code blocks enrichis:
- `updateStyle()`: Structure DOM (div > pre > code)
- `addTitle()`: Parse meta string
- `addLanguage()`: Badge langue
- `addCopyButton()`: Bouton avec state copied
- `transformerNotationDiff()`: Parsing `[!code ++/--]`
- `transformerNotationHighlight()`: Parsing `[!code highlight]`

### Pagefind
- Build-time indexing
- Intégration via `astro-pagefind`
- UI custom avec styles inline

## Principes

- **Minimalisme chaleureux**: Design épuré avec personnalité
- **Performance**: SSG pur, < 1s build time
- **Accessibilité**: WCAG compliance, focus keyboard
- **Maintenabilité**: TypeScript, Zod validation, composants modulaires
- **Engagement**: Share, related posts, progress tracking
- **Design cohérent**: CSS variables partout, pas de hardcoded colors
