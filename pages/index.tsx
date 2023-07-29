import type { NextPage } from 'next';
import Head from 'next/head';
import Title from '../elements/Title';
import Welcome from '../components/welcome';
import Content from '../elements/Content';
import WalletBalance from '../components/wallet/Wallet.balance';
import WalletInput from '../components/wallet/Wallet.input';
import { PlatformsProvider } from '../components/platforms/platform.context';
import PlatformPriceCard from '../components/platforms/platform.price.card';
import PlatformList from '../components/platforms/platform.list';
import Image from 'next/image';

// ASSETS
import avatarCircle from '../public/avatar_circle.png';
import hand from '../public/hand.png';
import TitleEnum from '../elements/Title.enum';
import { WalletProvider } from '../components/wallet/Wallet.context';

// import { fromBech32Address, toBech32Address } from '@zilliqa-js/crypto';
// import { isBech32, isAddress } from '@zilliqa-js/util/dist/validation';

/**
 * TODO [Part 1]:
 * Use the '@zilliqa-js/crypto' package to convert a Bech32 address to a Base16 address.
 * Allow the user to enter a Bech32 address, displaying the converted Base16 address on-screen.
 *
 * Example:
 *    Bech32 Address: zil1tym3sy8sary2y3lqy56dx4ej9v7fsxku52gl6z
 *    Base16 Address: 0x59371810F0E8c8a247E02534D357322B3c981AdC
 *
 *
 * TODO [Part 2]:
 * Using the "price" API, display the current XCAD price on-screen.
 *
 *
 * TODO [Part 3]:
 * Using the "balance" API, add button to allow a user to query the balance of any valid Base16 and Bech32 address.
 * Display the balance of the address on the client.
 */
const Home: NextPage = (props) => {
	return (
		<>
			<Head>
				<title>Address Converter</title>
				<meta name='description' content='Zilliqa Address Converter' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex items-stretch content-between px-8 2xl:h-screen gap-36 2xl:px-0'>
				<Welcome className='hidden w-[41.7%] pl-[5.5%] sticky 2xl:flex items-center grid-cols-5'>
					<header className='text-white pr-36'>
						<figure className='relative grid items-center justify-center w-48 h-48 m-auto'>
							<Image className='z-10' src={hand} />
							<span className='absolute inset-0 img-box'>
								<Image
									className='opacity-70 mix-blend-overlay'
									src={avatarCircle}
								/>
							</span>
						</figure>
						<Title className='pb-5 pt-9' as='h1'>
							Hello <b className='font-extrabold'>Jhon Doe!</b>
						</Title>
						<Content type='M'>
							This a dev assigment from XCAD network made with
							NextJS, Typescript and Tailwindcss.
						</Content>
					</header>
				</Welcome>
				<main className='2xl:mx-0 mx-auto 2xl:pr-[13%] grid-cols-6 pt-12 pb-32'>
					<PlatformsProvider>
						<article className='flex flex-wrap w-full gap-6 wrap'>
							<header className='w-full pb-6'>
								<TitleEnum>1</TitleEnum>
								<Title
									as='h2'
									className='inline-block ml-5 text-white align-middle'
								>
									Xcad price visualizer
								</Title>
							</header>
							<div className='flex flex-wrap items-center w-full justify-evenly'>
								<PlatformPriceCard className='mb-16 lg:mb-0' />

								<div className='hidden dividers w-[11.5%] border-r border-noble-500 h-full lg:grid content-center'>
									<hr className='border-noble-500' />
								</div>

								<PlatformList />
							</div>
						</article>
					</PlatformsProvider>

					<hr className='my-12 border-noble-500' />
                    
					<WalletProvider>
						<article>
							<header className='w-full pb-6'>
								<TitleEnum>2</TitleEnum>
								<Title
									as='h2'
									className='inline-block ml-5 text-white align-middle'
								>
									Wallet Balance
								</Title>
							</header>

							<WalletBalance />
							<WalletInput
								label='Wallet Address'
								placeholder='Write or select walled address'
								onSend={() => {
									console.log('Send');
								}}
							/>
						</article>
					</WalletProvider>
				</main>
			</div>
		</>
	);
};

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 240,
	};
}

export default Home;
