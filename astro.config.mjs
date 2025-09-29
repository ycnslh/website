// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from './remark-reading-time.mjs';
import pagefind from "astro-pagefind";
import {
	updateStyle,
	addTitle,
	addLanguage,
	addCopyButton,
	transformerNotationDiff,
	transformerNotationHighlight,
} from './src/plugins/shiki-transformers.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://reho.dev',
	integrations: [mdx(), sitemap(), pagefind()],
	markdown: {
		remarkPlugins: [remarkReadingTime],
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
			transformers: [
				transformerNotationDiff(),
				transformerNotationHighlight(),
				updateStyle(),
				addTitle(),
				addLanguage(),
				addCopyButton(2000),
			],
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
