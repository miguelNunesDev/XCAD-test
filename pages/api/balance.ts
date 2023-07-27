import { Zilliqa } from '@zilliqa-js/zilliqa';

const zilliqa = new Zilliqa('https://api.zilliqa.com');
const contractAddress = 'zil1z5l74hwy3pc3pr3gdh3nqju4jlyp0dzkhq2f5y';
const walletAddress: string = '0xeF741c46a6Ef94De62f976c079fC6b391093aA05';

import type { NextApiRequest, NextApiResponse } from 'next'

type RequestData = {

};

type ResponseData = {
    balance: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        const contract = zilliqa.contracts.at(contractAddress);
        const state = await contract.getState();
        const stateData = await state;
        const balances = stateData.balances;
        const token = walletAddress.toLocaleLowerCase()

        console.log('Estado del Contrato:', balances[token]);
        res.status(200).json({ balance: balances[token] })
        return;
    } catch (error) {
        console.error('Error al obtener el estado del contrato:', error);
    }

    
}
