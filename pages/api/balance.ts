import { Zilliqa } from '@zilliqa-js/zilliqa';

const zilliqa = new Zilliqa('https://api.zilliqa.com');
const contractAddress = 'zil1z5l74hwy3pc3pr3gdh3nqju4jlyp0dzkhq2f5y';

import type { NextApiRequest, NextApiResponse } from 'next'
import { ContractState } from 'typings';

type ResponseData = {
    balance: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {

        const contract = zilliqa.contracts.at(contractAddress);
        const state: ContractState = await contract.getState();
        const stateData = await state;
        const balances = stateData.balances;
        const wallet = req.query.wallet as string;
        const token = '0x' + wallet.toLocaleLowerCase();

        res.status(200).json({ balance: balances[token] })
        return;
    } catch (error) {
        console.error('Error:', error);
    }


}
