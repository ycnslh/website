# reho.dev

Blog personnel minimaliste construit avec Astro.

## Stack technique

- **Framework**: Astro 5.13.9 (SSG)
- **Styling**: Tailwind CSS v4 + Tailwind Typography
- **Content**: Markdown/MDX avec collections
- **Search**: Pagefind (recherche statique)
- **Deployment**: GitHub Pages (reho.dev)
- **Syntaxe**: Shiki (github-light/dark)

## Architecture

```
src/
├── components/         # Composants réutilisables
│   ├── Header.astro   # Navigation + dark mode toggle
│   ├── Footer.astro
│   └── BaseHead.astro # Meta tags SEO
├── layouts/
│   └── BlogPost.astro # Layout articles de blog
├── pages/
│   ├── index.astro    # Page d'accueil
│   ├── about.astro
│   ├── search.astro   # Interface Pagefind
│   ├── blog/
│   │   ├── [...page].astro  # Liste paginée
│   │   └── [...slug].astro  # Article individuel
│   └── rss.xml.js
├── content/
│   ├── config.ts      # Schéma Zod pour validation
│   └── blog/          # Articles .md/.mdx
├── plugins/
│   └── shiki-transformers.ts  # Code blocks personnalisés
└── styles/
    └── global.css     # Tailwind + styles Shiki
```

## Design system

### Couleurs
- **Light**: Fond beige `#e6e4e0`, texte gris foncé
- **Dark**: Fond noir pur `#000000`, texte blanc
- **Accent**: Rouge pour les liens

### Code blocks (Shiki)
- Numéros de ligne
- Badge langue (disparaît au hover)
- Bouton copier (apparaît au hover)
- Title bar optionnel: ` ```js title="example.js" `
- Diff notation: `// [!code ++]` ou `// [!code --]`
- Highlight: `// [!code highlight]`

## Features

### Blog
- Collections Astro avec validation Zod
- Reading time (calculé via remark plugin)
- Hero images (optimisées)
- Support MDX
- RSS feed

### Search
- Pagefind (recherche côté client, pas de serveur)
- Input sur `/blog` → redirect vers `/search?q=...`
- UI personnalisée (rounded-full, dark mode)

### SEO
- Sitemap auto-généré
- Meta tags Open Graph
- Canonical URLs
- RSS feed

### Dark mode
- Toggle dans header (localStorage + système)
- Transition smooth 300ms
- Icône soleil/lune

## Commandes

```bash
npm run dev      # Dev server
npm run build    # Build static
npm run preview  # Preview build local
```

## Déploiement

GitHub Actions auto-deploy sur push `main`:
1. Build Astro
2. Deploy GitHub Pages
3. Disponible sur https://reho.dev

## Configuration

### Constantes (`src/consts.ts`)
```ts
SITE_TITLE = 'Reho'
SITE_DESCRIPTION = 'Systems Engineer'
```

### Site URL (`astro.config.mjs`)
```js
site: 'https://reho.dev'
```

### Content schema (`src/content/config.ts`)
```ts
{
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: image().optional(),
  lang: z.string().optional()
}
```

## Développement

### Ajouter un article
Créer `src/content/blog/mon-article.md`:
```md
---
title: 'Mon titre'
description: 'Description SEO'
pubDate: 'Dec 15 2024'
heroImage: '../../assets/image.jpg'
---

Contenu...
```

### Utiliser les code blocks

**Avec titre**:
````md
```js title="config.js"
export default { foo: 'bar' }
```
````

**Avec diff**:
````md
```js
const old = 'value' // [!code --]
const new = 'updated' // [!code ++]
```
````

**Avec highlight**:
````md
```js
const important = true // [!code highlight]
```
````

## Notes techniques

### Tailwind v4
- Configuration CSS-first via `@import`
- Plugin via `@tailwindcss/vite`
- Dark mode: `class` strategy

### Scrollbar gutter
`scrollbar-gutter: stable` sur `html` pour éviter le layout shift entre pages avec/sans scrollbar.

### Shiki transformers
Transformeurs custom pour enrichir les code blocks:
- `updateStyle()`: Structure DOM (div > pre > code)
- `addTitle()`: Parse meta string pour titre
- `addLanguage()`: Badge langue
- `addCopyButton()`: Bouton avec state copied
- `transformerNotationDiff()`: Parsing `[!code ++/--]`
- `transformerNotationHighlight()`: Parsing `[!code highlight]`

### Pagefind
- Build-time indexing (pas de runtime)
- Intégration via `astro-pagefind`
- UI custom avec styles inline dans `/search`

## Principes

- **Minimaliste**: Pas de JS framework, SSG pur
- **Performance**: Images optimisées, search statique
- **Accessibilité**: Sémantique HTML, contrast WCAG
- **Maintenabilité**: TypeScript, Zod validation, components modulaires
