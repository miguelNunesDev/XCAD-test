import React, { useContext, useEffect } from 'react';
import { BaseProp } from '../../typings';
import PlatformPriceCard from './platform.price.card';
import { PlatformsContext } from './platform.context';
import { Platforms } from '../../data';
import PlatformToggle from './platform.toggle';

interface Props extends Omit<BaseProp, 'children'> {}

const PlatformsWrapper = ({ className }: Props) => {
	const platforms = Object.keys(Platforms).map((key) => Platforms[key]);
	const platformContext = useContext(PlatformsContext);
	if (!platformContext) return <></>;
	const [platformsState] = platformContext;
	
	return (
		<>
			<menu>
				{platforms.map((platform) => (
					<li key={platform.id}>
						<PlatformToggle
							logo={platform.logo}
							id={platform.id}
							state={platformsState.status[platform.id]}
						/>
					</li>
				))}
			</menu>
		</>
	);
};

export default PlatformsWrapper;
