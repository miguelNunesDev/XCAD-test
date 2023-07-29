import React from 'react';
import { BaseProp } from '../typings';
import circleWrapper from '../public/circle_wrapper.png';
import Image from 'next/image';

interface Props extends BaseProp {}

const TitleEnum = ({ className, children }: Props) => {
	return (
		<span
			className={`${className} relative inline-grid content-center justify-center align-middle`}
		>
			<p className='absolute inset-0 z-10 flex items-center justify-center text-2xl font-black text-noble-500'>
				{children}
			</p>
			<Image className='' src={circleWrapper} />
		</span>
	);
};

export default TitleEnum;
