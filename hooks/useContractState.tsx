
const useContractState = async (wallet: string, signal: AbortSignal) => {
	try {
		const raw = await fetch(`api/balance?wallet=${wallet}`, { signal });
		const data = await raw.json();
		if (raw.status != 200) {
			return 'error';
		}
		return data.balance as string;
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};

export default useContractState;
