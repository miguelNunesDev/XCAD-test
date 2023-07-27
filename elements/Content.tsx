import React from 'react';

const styles = {
	M: 'font-normal 2xl:text-xl text-md text-white',
	SM: 'text-sm text-noble-300',
};
type Props = {
	children: JSX.Element | string;
	as?: string;
	className?: 'string';
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
