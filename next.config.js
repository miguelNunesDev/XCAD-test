const path = require('path');
/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	future: {
		webpack5: true, // Si ya tienes esta opción, no la incluyas de nuevo
	},
    swcMinify: false,
	// webpack: (config) => {
	// 	config.resolve.alias['@public'] = path.join(__dirname, 'public');
	// 	return config;
	// },
};

module.exports = nextConfig;
