import React from 'react';
import { BaseProp } from '../typings';

type titleTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
interface Props extends BaseProp {
	as: titleTypes;
}
const styles: { [key in titleTypes]: string } = {
	h1: '2xl:text-5xl font-normal text-4xl',
	h2: '2xl:text-3xl text-2xl',
	h3: '2xl:text-xl text-xl font-extrabold normal-case',
	h4: '',
	h5: '',
	h6: '',
};
const Title = ({ children, as, className }: Props) => {
	const CustomTag = `${as}` as keyof JSX.IntrinsicElements;
	return (
		<CustomTag className={` ${className ?? ''} ${styles[as]}`}>
			{children}
		</CustomTag>
	);
};

export default Title;
