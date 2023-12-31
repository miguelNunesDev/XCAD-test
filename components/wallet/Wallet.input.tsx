import React, { useContext, useRef } from 'react';
import { BaseProp } from '../../typings';
import { bech32 } from 'bech32';
import Image from 'next/image';

import { WalletContext } from './Wallet.context';

import Tooltip from '../../elements/Tooltip';

import icon from '../../public/icon_send.svg';

interface Props extends Omit<BaseProp, 'children'> {
	placeholder?: string;
	label: string;
}
const isBech32 = (value: string) => {
	return value.includes('zil');
};
const isBase16 = (value: string) => {
    const hex = value.substring(2);
	const base16Regex = /^[0-9A-Fa-f]+$/;
	return base16Regex.test(hex);
};
const convertBech32To16 = (address: string) => {
	try {
		const decoded = bech32.decode(address);
		const bytes = bech32.fromWords(decoded.words);

		const hexAddress = Buffer.from(bytes).toString('hex');

		return hexAddress;
	} catch (error) {
		console.error(
			'Error al convertir la dirección Bech32 a hexadecimal:',
			error
		);
		return 'error';
	}
};

const WalletInput = ({ className, label, placeholder }: Props) => {
	const context = useContext(WalletContext);
    const input = useRef<HTMLInputElement | null>(null);
    
	if (!context) return <></>;
	const {
		wallet: [walletValue, setWalletValue],
	} = context;
	

	const handler = () => {
		const value = input?.current?.value ?? 'error';

		setWalletValue((walletValue) => {
			console.log({ is32: isBech32(value), is16: isBase16(value) });

			if (!isBech32(value) && !isBase16(value)) return 'error';

			if (!isBech32(value)) {
				return value;
			}
			return convertBech32To16(value);
		});
	};

	return (
		<div className={className ?? ''}>
			<label className='block pb-4'>{label}</label>
			<div className='flex w-full gap-[3px] pb-4'>
				<input
					ref={input}
					className='w-[70%] rounded-tl-lg rounded-bl-lg px-4 text-noble-300 bg-noble-500'
					type='text'
					placeholder={placeholder}
				/>
				<button
					className='flex items-center justify-center gap-3 px-4 py-2 rounded-tr-lg rounded-br-lg bg-gradient-to-tr from-[#9B2AA6] via-primary to-[#FD6422] text-white'
					onClick={handler}
				>
					Send
					<Image className='' src={icon} alt=''/>
				</button>
			</div>
			{walletValue === 'error' ? (
				<Tooltip state='error'>Invalid Wallet</Tooltip>
			) : (
				''
			)}
			{walletValue && walletValue !== 'error' ? (
				<Tooltip state='info'>Wallet Base16: {walletValue}</Tooltip>
			) : (
				<Tooltip state='info'>
					If your wallet is Bech32 it’ll be converted to Base16
				</Tooltip>
			)}
		</div>
	);
};

export default WalletInput;
