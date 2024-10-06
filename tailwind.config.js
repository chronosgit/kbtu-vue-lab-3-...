/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	theme: {
		extend: {
			colors: {
				'error-solid': '#ee4238',
				'error-pale': '#ffcccc',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				handjet: ['Handjet', 'Comic Sans MS', 'Verdana', 'Arial', 'sans-serif'],
			},
			backgroundImage: {
				trees: 'url(~/assets/images/bg-trees.png)',
			},
		},
	},
	plugins: [],
};
