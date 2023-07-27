/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
        './elements/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				primary: ['"Plus Jakarta Sans", sans-serif'],
			},
			colors: {
				primary: '#FC1557',
				noble: {
					200: '#CDCECF',
					300: '#9B9C9E',
					500: '#363A3D',
					600: '#1A1D21',
					700: '#131619',
					800: '#0D0F10',
					900: '#060708',
				},
				xcad: {
					purple: '#9B2AA6',
					red:    '#FC125F',
					orange: '#FD6422',
				},
			},
		},
	},
	plugins: [],
};
