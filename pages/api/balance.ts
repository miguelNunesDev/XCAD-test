import { Zilliqa } from '@zilliqa-js/zilliqa';

const zilliqa = new Zilliqa('https://api.zilliqa.com');
const contractAddress = 'zil1z5l74hwy3pc3pr3gdh3nqju4jlyp0dzkhq2f5y';

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    balance: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        
        const contract = zilliqa.contracts.at(contractAddress);
        const state = await contract.getState();
        const stateData = await state;
        const balances = stateData.balances;
        const wallet = req.query.wallet as string;
        const token = '0x' + wallet.toLocaleLowerCase();

        console.log(token);
        

        console.log('Estado del Contrato:', balances[token]);
        res.status(200).json({ balance: balances[token] })
        return;
    } catch (error) {
        console.error('Error al obtener el estado del contrato:', error);
    }

    
}
