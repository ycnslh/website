# Personal Website

A modern, minimalist personal website built with Astro, featuring a blog and custom design.

## 🚀 Features

- **Blog** with Markdown/MDX support
- **Advanced code blocks** with line numbers, copy button, diff notation, and syntax highlighting (Shiki)
- **Full-text search** powered by Pagefind
- **Dark mode** toggle
- **Responsive design** with a dock-style navigation
- **Typography** optimized for readability (Tailwind Typography)
- **RSS feed** for blog posts
- **Sitemap** generation
- **Reading time** estimation for blog posts

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [Shiki](https://shiki.matsu.io/) - Syntax highlighting
- [Pagefind](https://pagefind.app/) - Search functionality
- [MDX](https://mdxjs.com/) - Enhanced Markdown

## 📦 Project Structure

```
/
├── public/           # Static assets
│   └── icons/       # SVG icons
├── src/
│   ├── components/  # Reusable components
│   ├── content/     # Blog posts (Markdown/MDX)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route pages
│   ├── plugins/     # Custom Shiki transformers
│   └── styles/      # Global styles
└── astro.config.mjs # Astro configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/website.git

# Navigate to the project
cd website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

## 📝 Available Commands

| Command                | Action                                           |
|:-----------------------|:-------------------------------------------------|
| `npm install`          | Install dependencies                             |
| `npm run dev`          | Start dev server at `localhost:4321`             |
| `npm run build`        | Build production site to `./dist/`               |
| `npm run preview`      | Preview build locally before deploying           |
| `npm run astro ...`    | Run Astro CLI commands                           |

## ✍️ Writing Blog Posts

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'My Blog Post'
description: 'A brief description'
pubDate: 'Jan 01 2024'
heroImage: '../../assets/image.jpg'
---

Your content here...
```

### Code Block Features

Use advanced code block features in your posts:

````markdown
```js title="example.js"
function hello() {
  console.log("Old code") // [!code --]
  console.log("New code") // [!code ++]
  console.log("Highlighted") // [!code highlight]
}
```
````

## 🌐 Deployment

This site is configured for GitHub Pages deployment using GitHub Actions.

### Setup

1. Go to your repository's **Settings** > **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` branch to trigger automatic deployment

### Custom Domain (Optional)

To use a custom domain:

1. Create `public/CNAME` with your domain:
   ```
   yourdomain.com
   ```

2. Update `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: 'https://yourdomain.com',
   })
   ```

3. Configure DNS settings with your domain provider

## 📄 License

MIT License - feel free to use this project as inspiration for your own website!

## 🙏 Acknowledgments

- Design inspired by modern minimalist aesthetics
- Code block styling inspired by [astro-theme-pure](https://github.com/cworld1/astro-theme-pure/)
- Built with the amazing [Astro](https://astro.build/) framework