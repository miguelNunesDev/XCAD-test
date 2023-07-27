import Image from 'next/image';
import React from 'react';
import wallet from '@public/wallet_on.png';
import walletWrapper from '@public/wallet_wrapper.png';
import { BaseProp } from '../../typings';
import Title from '../../elements/Title';
import Content from '../../elements/Content';
import useContractState from '../../hooks/useContractState';

interface Props extends Omit<BaseProp, 'children'> {}

const WalletBalance = ({ className }: Props) => {
    useContractState();
	return (
		<section className={`${className} flex flex-wrap mx-auto gap-7 justify-center pb-11`}>
			<aside className='relative w-44'>
				<div className='img-box w-[136px] absolute absolute-center z-10'>
					<Image src={wallet} />
				</div>
				<Image className='mix-blend-overlay' src={walletWrapper} />
			</aside>
			<div className='bg-[#070809] max-w-[372px] px-6 py-9 rounded-md overflow-hidden flex flex-wrap items-center'>
				<Title as='h3' className='pb-2 text-white'>Wallet XCAD Balance:</Title>
				<Content type='SM'>
					Enter your wallet address below or select one saved on you
					local files.
				</Content>
			</div>
		</section>
	);
};

export default WalletBalance;
