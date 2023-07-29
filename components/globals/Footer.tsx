import Image from 'next/image';
import logoMiguel from '../../public/logo_miguelNunes.png';
type Props = {};

const Footer = (props: Props) => {
	return (
		<footer className='text-center 2xl:fixed bottom-0 right-0 pb-8 px-[5.5%] z-10'>
			<Image src={logoMiguel} alt='Miguel Nunes logo' />
		</footer>
	);
};

export default Footer;
