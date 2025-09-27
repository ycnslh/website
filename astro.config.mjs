// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from './remark-reading-time.mjs';
import pagefind from "astro-pagefind";

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
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
