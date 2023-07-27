import React, { Component, createContext, useState } from 'react';
import { BaseProp } from '../../typings';

const WalletContext = createContext<{}>({});

interface Props extends BaseProp {
	className: never;
}

const WalletProvider = ({ children }: Props) => {
	const [walletData, setWalletData] = useState(null);
	return (
		<WalletContext.Provider value={{ walletData, setWalletData }}>
			{Array.isArray(children)
				? children.map((child) => child)
				: children}
		</WalletContext.Provider>
	);
};
export default { WalletContext, WalletProvider };
