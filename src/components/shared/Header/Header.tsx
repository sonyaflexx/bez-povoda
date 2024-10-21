'use client'

import Container from "@/components/ui/Container";
import Link from "next/link";
import HeaderSlogan from "./HeaderSlogan";
import { useEffect, useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky z-40 top-0 left-0 right-0 transition-transform duration-500 ease-in-out ${
        isScrolled ? 'translate-y-[-122px]' : ''
      }`}
    >
      <HeaderSlogan />
      <header className="shadow-md py-10 bg-white">
        <Container>
          <nav className="flex flex-col gap-2 items-center relative">
            <Link href={'/'} className="text-8xl">Без Повода</Link>
            <ul className="flex items-center gap-[60px] text-xl font-public-sans font-bold">
              <li><Link href={'/bez_povoda'}>Без повода</Link></li>
              <li><Link href={'/new'}>Новое</Link></li>
              <li><Link href={'/flowers'}>Цветы</Link></li>
              <li><Link href={'/dried'}>Сухоцветы</Link></li>
              <li><Link href={'/holidays'}>Праздник</Link></li>
              <li><Link href={'/meetings'}>Свидание</Link></li>
            </ul>
            <ul className="absolute right-0 top-[80px] flex gap-[25px]">
              <li><Link href={'/'} className=""><Image src={'/images/icons/bag.svg'} alt="Bag" width={24} height={24} className="hover:opacity-80 transition-opacity" /></Link></li>
              <li><Link href={'/'} className=""><Image src={'/images/icons/user.svg'} alt="User" width={24} height={24} className="hover:opacity-80 transition-opacity" /></Link></li>
              <li><Link href={'/'} className=""><Image src={'/images/icons/search.svg'} alt="Search" width={24} height={24} className="hover:opacity-80 transition-opacity" /></Link></li>
            </ul>
          </nav>
        </Container>
      </header>
    </div>
  );
};

export default Header;