import path from 'node:path';
import url from 'node:url';
import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	resolve: { alias: { '@': path.join(__dirname, 'src') } },
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
	],
	server: { port: 8000, host: true },
	preview: { host: true, port: 8000 },
});
