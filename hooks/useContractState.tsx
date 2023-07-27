import { Zilliqa } from '@zilliqa-js/zilliqa';

const zilliqa = new Zilliqa('https://api.zilliqa.com');
const contractAddress = 'zil1z5l74hwy3pc3pr3gdh3nqju4jlyp0dzkhq2f5y';
const walletAddress: string = '0xeF741c46a6Ef94De62f976c079fC6b391093aA05';

const useContractState = async () => {
	try {
        console.log(zilliqa);
        
		// const contract = zilliqa.contracts.at(contractAddress);
		// const state = await contract.getState();
		// const stateData = await state;
		// const balances = stateData.balances;
        
        const raw = await fetch(`https://api.zilliqa.com/v1/balance/${walletAddress}`);
        const walletState = await raw.json()

		console.log('Estado del Contrato:',walletState);
		return;
	} catch (error) {
		console.error('Error al obtener el estado del contrato:', error);
	}
};

export default useContractState;
