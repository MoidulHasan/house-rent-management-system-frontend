import { fileURLToPath } from "url";
import { resolve } from "pathe";
import { defineNuxtConfig } from "nuxt/config";

const resolvePath = (...paths: string[]) =>
	resolve(fileURLToPath(new URL("./", import.meta.url)), ...paths);

export default defineNuxtConfig({
	alias: {
		public: resolvePath("./public/"),
		constants: resolvePath("./constants/"),
	},

	build: {
		transpile: ["primevue"],
	},

	css: [
		"primevue/resources/themes/saga-blue/theme.css",
		"primevue/resources/primevue.css",
		"primeflex/primeflex.css",
		"primeicons/primeicons.css",
		"prismjs/themes/prism-coy.css",
		"~/assets/styles/layout.scss",
		"~/assets/demo/flags/flags.css",
	],

	dir: {
		public: resolvePath("./public/"),
	},

	experimental: {
		reactivityTransform: true,
		viteNode: false,
	},

	meta: {
		meta: [
			{ "http-equiv": "X-UA-Compatible", content: "IE=edge" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
		],
		link: [
			{ rel: "icon", href: "/favicon.png" },
			{
				rel: "stylesheet",
				href: "/themes/lara-light-indigo/theme.css",
			},
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{ rel: "preconnect", href: "https://fonts.gstatic.com" },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
			},
		],
	},

	modules: ["@pinia/nuxt", "@vueuse/nuxt"],

	buildModules: ["@pinia/nuxt"],

	nitro: {
		preset: "vercel",
	},

	srcDir: "src/",

	vite: {
		clearScreen: true,
		logLevel: "info",
	},

	runtimeConfig: {
		public: {
			apiUrl: "",
		},
	},
});
