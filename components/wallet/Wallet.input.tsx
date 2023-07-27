import { Combobox } from '@headlessui/react';
import { Label } from '@headlessui/react/dist/components/label/label';

import React, { useRef, useState } from 'react';
import { BaseProp } from '../../typings';
import { bech32 } from 'bech32';
import Image from 'next/image';
import icon from '@public/icon_send.svg';
import Tooltip from '../../elements/Tooltip';

interface Props extends Omit<BaseProp, 'children'> {
	placeholder?: string;
	label: string;
	onSend: Function;
}

const convertBech32To16 = (address: string) => {
	try {
		// Decodificar la dirección Bech32 a un array de bytes
		const decoded = bech32.decode(address);
		const bytes = bech32.fromWords(decoded.words);

		// Convertir el array de bytes a su representación hexadecimal
		const hexAddress = Buffer.from(bytes).toString('hex');

		return hexAddress;
	} catch (error) {
		console.error(
			'Error al convertir la dirección Bech32 a hexadecimal:',
			error
		);
		return null;
	}
};

const WalletInput = ({ className, label, placeholder, onSend }: Props) => {
	const input = useRef<HTMLInputElement | null>(null);
	const [walletValue, setWalletValue] = useState<string | null>(null);

	const handler = () => {
		
		setWalletValue((walletValue) => {
            if(!input.current)return walletValue;
			return convertBech32To16(input.current.value);
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
					<Image className='' src={icon} />
				</button>
			</div>
			{walletValue ? (
				<Tooltip state='info'>
					Wallet Base16: {walletValue}
				</Tooltip>
			) : (
				<Tooltip state='info'>
					If your wallet is Bech32 it’ll be converted to Base16
				</Tooltip>
			)}
		</div>
	);
};

export default WalletInput;
