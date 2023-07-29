import { ApiPlatform } from '../typings';
import logo_coinGecko from '../public/logo_coinGecko.png';
import logo_cryptorank from '../public/logo_cryptorank.png';
import logo_notFound from '../public/logo_notFound.png';
import logo_zilStream from '../public/logo_zilStream.png';

type coinGeckoQuery = {
	'xcad-network': { usd: number };
};
type cryptorank = {
	data: { 'xcad-network': { prices: Array<number> } };
};

type zilStream = [{ value: number }];

export const Platforms: { [key: string]: ApiPlatform } = {
	coinGecko: {
		id: 'coinGecko',
		logo: logo_coinGecko,
		api: 'https://api.coingecko.com/api/v3/simple/price?ids=xcad-network&vs_currencies=usd',
		isValidQuery: (query: unknown) => {
			if (typeof query !== 'object') return false;
			return query ?? {}.hasOwnProperty('xcad-network');
		},
		getPriceFromQuery: (query: coinGeckoQuery) => {
			return query['xcad-network']['usd'];
		},
	},
	cryptorank: {
		id: 'cryptorank',
		logo: logo_cryptorank,
		api: 'https://api.cryptorank.io/v0/charts/prices-by-coin?keys=xcad-network&days=7',
		isValidQuery: (query: unknown) => {
			if (typeof query !== 'object') return false;
			return query ?? {}.hasOwnProperty('data');
		},
		getPriceFromQuery: (query: cryptorank) => {
			return query.data['xcad-network'].prices[0];
		},
	},
	zilStream: {
		id: 'zilStream',
		logo: logo_zilStream,
		api: 'https://io-cdn.zilstream.com/chart/aggr/zil1z5l74hwy3pc3pr3gdh3nqju4jlyp0dzkhq2f5y',
		isValidQuery: (query: unknown) => {
			if (!Array.isArray(query)) return false;
			return query[0] ?? {}.hasOwnProperty('value');
		},
		getPriceFromQuery: (query: zilStream) => {
			return query[0].value;
		},
	},
	notFound: {
		id: 'notFound',
		logo: logo_notFound,
		api: 'https://api.loremIpsum.com/api/v3/404',
		isValidQuery: (query: unknown) => {
			return false;
		},
		getPriceFromQuery: () => {},
	},
};
