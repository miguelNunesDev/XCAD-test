import React, { useContext } from 'react';
import { BaseProp, PlatformStatus } from '../../typings';
import { Platforms } from '../../data';
import { PlatformsContext } from './platform.context';
import PlatformToggle from './platform.toggle';
import Tooltip from '../../elements/Tooltip';

interface Props extends Omit<BaseProp, 'children'> {}
const PlatformList = ({ className }: Props) => {
	const platforms = Object.keys(Platforms).map((key) => Platforms[key]);
	const platformContext = useContext(PlatformsContext);
	if (!platformContext) return <></>;
	const {
		platform: [platformsState],
	} = platformContext;
	return (
		<menu>
			{platforms.map((platform) => (
				<li key={platform.id} className='py-3'>
					<PlatformToggle
						logo={platform.logo}
						id={platform.id}
						state={platformsState.status[platform.id]}
					/>
					{platformsState.status[platform.id] ===
					PlatformStatus.ERROR ? (
						<Tooltip state='error' className='pt-2'>
							{platform.id} not available.
						</Tooltip>
					) : (
						''
					)}
				</li>
			))}
		</menu>
	);
};

export default PlatformList;
