import React, { Component, createContext, useEffect, useState } from 'react';
import { BaseProp, WalletContextReturn } from '../../typings';
import useContractState from '../../hooks/useContractState';

export const WalletContext = createContext<WalletContextReturn | undefined>(
	undefined
);

interface Props extends Omit<BaseProp, 'className'> {}

export const WalletProvider = ({ children }: Props) => {
	const [walletValue, setWalletValue] = useState<string | null>(null);
	const [balance, setBalance] = useState<string | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!walletValue || walletValue == 'error') return;
		fetchBalance();

		return () => {};
	}, [walletValue]);

	const fetchBalance = async () => {
		console.log('Fetching balance');

		setLoading(true);
		const controller = new AbortController();
		if (!walletValue) return;
		const balance = await useContractState(walletValue, controller.signal);

		setBalance(() => balance);
		setLoading(false);
	};

	return (
		<WalletContext.Provider
			value={{
				wallet: [walletValue, setWalletValue],
				balance: [balance, isLoading],
			}}
		>
			{Array.isArray(children)
				? children.map((child) => child)
				: children}
		</WalletContext.Provider>
	);
};
