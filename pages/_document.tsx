import { Html, Head, Main, NextScript } from 'next/document';

const style = `bg-noble-800 font-primary text-noble-200`;

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body className={style}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
