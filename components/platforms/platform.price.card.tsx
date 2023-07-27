import React, { useContext } from 'react';
import { BaseProp } from '../../typings';
import { PlatformsContext } from './platform.context';
import Image from 'next/image';

import cardBg from '@public/card_bg.png';
import logoSmall from '@public/logo_small.png';
import iconReload from '@public/icon_reload.png';
import Title from '../../elements/Title';
import Tooltip from '../../elements/Tooltip';
import loading from '@public/Infinity-2s-200px.gif';

interface Props extends Pick<BaseProp, 'className'> {}

const PlatformPriceCard = ({ className }: Props) => {
	const platformContext = useContext(PlatformsContext);
	if (!platformContext) return <></>;
	const {
		platform: [platformsState],
		fetch: {
			AsyncSetPlatformsStatefromFetch,
			loadingContext: [isLoading],
		},
	} = platformContext;
	return (
		<div className={`relative ${className}`}>
			{isLoading ? (
				<span className='absolute z-10 w-12 absolute-center img-box'>
					<Image src={loading} />
				</span>
			) : (
				''
			)}
			<section
				className={`relative inline-block h-40 w-72 ${
					isLoading ? 'transition-all blur-[2px] saturate-0 pointer-events-none' : ''
				}`}
			>
				<div className='absolute inset-0 z-10 grid content-between p-6'>
					<span className='flex flex-wrap justify-between'>
						<Image className='object-contain' src={logoSmall} />
						<button onClick={AsyncSetPlatformsStatefromFetch}>
							<Image
								className='w-6 h-6 transition duration-300 saturate-0 hover:saturate-100 hover:rotate-[360deg]'
								src={iconReload}
							/>
						</button>
					</span>
					<div className='flex flex-wrap items-center justify-between text-white'>
						<Title as='h4'>
							Average
							<br /> Xcad Price
						</Title>
						<p className='text-3xl font-extrabold'>
							{platformsState.price.toFixed(3)}
							{'$'}
						</p>
					</div>
				</div>
				<aside className='img-box'>
					<Image className='object-contain' src={cardBg} />
				</aside>
			</section>
			<Tooltip state='info' className='absolute bottom-[-2.25rem] w-72'>
				Average based on the selected platform prices.
			</Tooltip>
		</div>
	);
};

export default PlatformPriceCard;
