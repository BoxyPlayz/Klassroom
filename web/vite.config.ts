import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
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
	server: {
		port: 8000,
		host: true
	},
	preview: {
		host: true,
		port: 8000
	}
});
