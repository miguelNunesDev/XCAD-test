import React, { useContext } from 'react';
import bg from '@public/bg_aside.jpg';
import Image from 'next/image';
import { BaseProp, PlatformContextReturn } from '../../typings';
import { PlatformsContext } from '../platforms/platform.context';

interface Props extends BaseProp {}
const Welcome = ({ children, className }: Props) => {
	return (
		<aside className={`${className} h-full overflow-hidden`}>
			<div className='relative z-10 content'>
				{Array.isArray(children)
					? children.map((child) => child)
					: children}
			</div>
			<div className='absolute inset-0 img-box'>
				<Image className='object-cover' src={bg} unoptimized />
			</div>
		</aside>
	);
};

export default Welcome;
