import React from 'react'
import logoXcad from '../../public/logo_xcad.png'
import Image from 'next/image'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <header className='2xl:fixed top-0 pt-14 px-[5.5%] z-10'>
        <Image src={logoXcad} />
    </header>
  )
}

export default NavBar