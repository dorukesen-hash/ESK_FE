/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./utils/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				"border-gray": "#BDC2C7",
				"button-gray": "#ECECEC",
				"text-white": "#FFFFFF",
				"text-blue": "#5CA0E2",
				"text-dark": "#182434",
				"text-light": "#808080",
				"custom-blue": "#5CA0E2",
				"custom-orange": "linear-gradient(to right, #FFA033, #FFC042)",
				"custom-blue-gray": "#182434",
				"custom-table-head": "#CFE6FC",
				"custom-table-soft-blue": "#E7F2FD",
				"custom-button-green": "#2A6AA2"
			},
			fontFamily: {
				montserrat: ['"Montserrat"', 'sans-serif'],

			},
			screens: {
				mobile: '320px', // Mobile
				tablet: '768px',  // Tablet
				laptop: '1440px', // Laptop
				desktop: '1920px' // Desktop
			},
			boxShadow: {
				custom: '0px 2px 20px 0px rgba(0, 0, 0, 0.25)', // Özel box-shadow
			},
		},
	},
	plugins: [],
};
