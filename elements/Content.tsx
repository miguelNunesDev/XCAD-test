import React from 'react';
import { BaseProp } from '../typings';

const styles = {
	M: 'font-normal 2xl:text-xl text-md text-white',
	SM: 'text-sm text-noble-300',
};
interface Props extends BaseProp {
	as?: string;
	type: 'M' | 'SM';
};
const Content = ({ children, as, className, type }: Props) => {
	const CustomTag = `${as ?? 'p'}` as keyof JSX.IntrinsicElements;
	return (
		<CustomTag className={` ${styles[type]} ${className ?? ''}`}>
			{children}
		</CustomTag>
	);
};

export default Content;
