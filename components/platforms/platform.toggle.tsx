import React, { useContext } from 'react';
import Image from 'next/image';
import { Switch } from '@headlessui/react';
import { PlatformStatus } from '../../typings';
import { PlatformsContext } from './platform.context';

interface Props {
	id: string;
	logo: StaticImageData;
	state: PlatformStatus;
}

const StyleState = {
	active: {
		button: 'bg-gradient-to-tr from-xcad-purple via-xcad-red to-xcad-orange border-none',
		span: 'left-[1.6rem] bg-noble-900',
	},
	disable: {
		button: 'bg-noble-600 border-noble-500',
		span: 'bg-noble-500',
	},
};

const PlatformToggle = ({ id, logo, state }: Props) => {
    
	const platformContext = useContext(PlatformsContext);
	if (!platformContext) return <></>;
	const {
		platform: [platformsState, setState],
		fetch: { AsyncSetPlatformsStatefromFetch },
	} = platformContext;

	const clickHandler = (id: string) => {
		const { status } = platformsState;
		status[id] =
			status[id] === PlatformStatus.ACTIVE
				? PlatformStatus.DISABLE
				: PlatformStatus.ACTIVE;
		setState((platformsState) => ({ ...platformsState, status }));

		AsyncSetPlatformsStatefromFetch();
	};

	const style =
		state === PlatformStatus.ACTIVE
			? StyleState.active
			: StyleState.disable;
	return (
		<>
			<Switch.Group>
				<Switch
					checked={state === PlatformStatus.ACTIVE ? true : false}
					onChange={() => {
						clickHandler(id);
					}}
				/>

				<Switch.Label className='pr-4'>
					<button
						className={`transition-all w-12 h-6 border-2 rounded-full  ${style.button}`}
					>
						<span
							className={` relative transition-all block w-4 h-4 mx-1 rounded-full ${style.span}`}
						></span>
					</button>
				</Switch.Label>
				<Image className='h-7' src={logo} alt={id} />
			</Switch.Group>
		</>
	);
};

export default PlatformToggle;
