import Image from 'next/image';
import React, { useContext } from 'react';

import { WalletContext } from './Wallet.context';

import Content from '../../elements/Content';
import { BaseProp } from '../../typings';
import Title from '../../elements/Title';

import wallet from '../../public/wallet_on.png';
import walletWrapper from '../../public/wallet_wrapper.png';
import { GlobalContext } from 'components/globals/Global.context';

interface Props extends Omit<BaseProp, 'children'> { }

const text = {
    loading: 'Loading your balance please wait..',
    noValue:
        'Enter your wallet address below or select one saved on you local files.',
    error: 'Invalid wallet or not found'
};

function numberWithCommas(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const printBalance = (balance: string, price: number) => {
    const value = numberWithCommas(Number(balance) * price);
    return <><b>Value: </b> {value}$ <br />  <b>Xcad Tokens: </b>{balance}</>;
}

const WalletBalance = ({ className }: Props) => {
    const context = useContext(WalletContext);
    const globalContext = useContext(GlobalContext);
    if (!context) return <>error</>;


    const {
        balance: [balance, isLoading],
    } = context;

    return (
        <section
            className={`${className} flex flex-wrap mx-auto gap-7 justify-center pb-11`}
        >
            <aside className='relative w-44'>
                <div className='img-box w-[136px] absolute absolute-center z-10'>
                    <Image
                        className={`${balance && !isLoading ? '' : 'saturate-0 opacity-40'
                            }`}
                        src={wallet}
                    />
                </div>
                <Image className='mix-blend-overlay' src={walletWrapper} />
            </aside>
            <div className='bg-[#070809] max-w-[372px] px-6 py-9 rounded-md overflow-hidden flex flex-wrap items-center'>
                <Title as='h3' className='pb-2 text-white'>
                    Wallet XCAD Balance:
                </Title>
                <Content className='pl-4 mt-[-30px]' type='SM'>
                    {`
                        ${isLoading ? text.loading : ''}
                        ${!balance && !isLoading ? text.noValue : ''}
                        ${balance === 'error' && !isLoading ? text.error : ''}
                        
                    `}
                    {balance && balance !== 'error' && !isLoading && globalContext ? printBalance(balance, globalContext.price) : ''}
                </Content>
            </div>
        </section>
    );
};

export default WalletBalance;
