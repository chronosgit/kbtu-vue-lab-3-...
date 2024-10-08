// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	components: false,
	alias: {
		components: './components',
		interfaces: './interfaces',
		services: './services',
	},

	runtimeConfig: {
		MONGO_URI: import.meta.env?.MONGO_URI,
		ACCESS_TOKEN_SECRET: import.meta.env?.ACCESS_TOKEN_SECRET,
		REFRESH_TOKEN_SECRET: import.meta.env?.REFRESH_TOKEN_SECRET,
	},

	plugins: ['~/plugins/mongodb.server.ts'],
	modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/fonts'],

	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	icon: {
		componentName: 'NuxtIcon',
	},
});
