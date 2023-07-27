import { useState } from 'react';
import {
	PlatformContextReturn,
	PlatformStatus,
	PlatformsState,
} from '../typings';

export const usePlatformsState = (
	activePlatforms: Array<string>,
	signal: AbortSignal
): PlatformContextReturn => {

	const initState: PlatformsState = { price: 0, status: {} };
	activePlatforms.forEach((id) => {
		initState.status[id] = PlatformStatus.ACTIVE;
	});
	const [platformsState, setPlatformState] = useState(initState);
	const [isLoading, setLoading] = useState(false);

	const AsyncSetPlatformsStatefromFetch = async () => {

		setLoading(() => true);
		const { status } = platformsState;
		const params = new URLSearchParams();

		if (Object.keys(status)) {
			Object.keys(status).forEach((platformID) => {
				if (status[platformID] !== PlatformStatus.ACTIVE) return;
				params.append('activePlatforms', platformID);
			});
		} else {
			activePlatforms.forEach((platformID) => {
				params.append('activePlatforms', platformID);
			});
		}
        
		try {            
			const raw = await fetch(`api/price?${params}`, { signal });
			if (raw.status != 200) {
				Object.keys(status).forEach((id) => {
					status[id] = PlatformStatus.ERROR;
				});
				setPlatformState((prev) => ({ ...prev, status }));
			}
			const data: PlatformsState = await raw.json();
			setPlatformState((prev) => ({
				...prev,
				status: data.status,
				price: data.price,
			}));
			setLoading(() => false);
		} catch (error) {
			console.error(error);
			setLoading(() => false);
		}
	};

	const contextResponse: PlatformContextReturn = {
		platform: [platformsState, setPlatformState],
		fetch: {
			AsyncSetPlatformsStatefromFetch,
			loadingContext: [isLoading, setLoading],
		},
	};
	return contextResponse;
};
