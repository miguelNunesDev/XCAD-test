import React, { createContext, useEffect, useState } from 'react';
import { BaseProp, PlatformContextReturn } from '../../typings';
import { Platforms } from '../../data';
import { usePlatformsState } from '../../hooks/usePlatformsState';

export const PlatformsContext = createContext<
	PlatformContextReturn | undefined
>(undefined);

interface Props extends Omit<BaseProp, 'className'> {}

export const PlatformsProvider = ({ children }: Props) => {
	const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
	const controller = new AbortController();
    
	const activePlatforms = Object.keys(Platforms).map(
		(key) => Platforms[key].id
	);
	const contextResponse = usePlatformsState(
		activePlatforms,
		controller.signal
	);

	const {
		fetch: { AsyncSetPlatformsStatefromFetch },
	} = contextResponse;

	useEffect(() => {
		AsyncSetPlatformsStatefromFetch();

		return () => {
			controller.abort();
		};
	}, []);

	useEffect(() => {
		if (!intervalId) {
			const newIntervalId = setInterval(async () => {
				await AsyncSetPlatformsStatefromFetch();
			}, 8000);
			setIntervalId(newIntervalId);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	return (
		<PlatformsContext.Provider value={contextResponse}>
			{Array.isArray(children)
				? children.map((child) => child)
				: children}
		</PlatformsContext.Provider>
	);
};
