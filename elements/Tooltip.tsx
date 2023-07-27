import React from 'react';
import { BaseProp } from '../typings';
import toolTipError from '@public/tool_tip_error.png';
import toolTipInfo from '@public/tool_tip_info.png';
import Image from 'next/image';

interface Props extends BaseProp {
	state: 'info' | 'error';
}
const state = {
	icon: {
		info: toolTipInfo,
		error: toolTipError,
	},
	style: {
		info: 'text-noble-400',
		error: 'text-[#D0302F]',
	},
};

const Tooltip = ({ children, className, state: stateID }: Props) => {
	return (
		<div className={`${className} flex flex-wrap items-start`}>
			<span className='mt-[1px]'>
				<Image src={state.icon[stateID]} />
			</span>
			<span className={`${state.style[stateID]} inline-block ml-3 text-sm font-normal w-[85%]`}>
				{children}
			</span>
		</div>
	);
};

export default Tooltip;
