import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	base: './',
	build: {
		target: 'esnext',
		minify: true,
		outDir: 'dist'
	}
});
