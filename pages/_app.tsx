import type { AppProps } from 'next/app';
import '../styles/globals.css'

import Footer from '../components/globals/Footer';
import NavBar from '../components/globals/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
            <NavBar />
			<Component {...pageProps}/>
            <Footer/>
		</>
	);
}

export default MyApp;
