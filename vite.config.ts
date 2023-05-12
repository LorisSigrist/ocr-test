import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
	plugins: [qrcode(),sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
