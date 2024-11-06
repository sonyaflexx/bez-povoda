'use client'

import Container from "@/components/ui/Container";
import Link from "next/link";
import HeaderSlogan from "./HeaderSlogan";
import { useEffect, useState } from "react";
import Image from "next/image";
import { isAuthClient } from "@/lib/isAuthClient";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div 
        className={`max-sm:fixed left-0 top-[80px] w-2/3 h-full bg-white p-5 transform transition-transform duration-300 ease-in-out z-30 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="flex flex-col gap-4 text-lg font-public-sans font-bold h-full pb-[80px]">
          <li><Link href={'/feed'}>Без повода</Link></li>
          <li><Link href={'/new'}>Новое</Link></li>
          <li><Link href={'/flowers'}>Цветы</Link></li>
          <li><Link href={'/dried'}>Сухоцветы</Link></li>
          <li><Link href={'/holidays'}>Праздник</Link></li>
          <li><Link href={'/meetings'}>Свидание</Link></li>

          {isAuthClient() && <Link href={'/cart'} className="px-4 py-2 border rounded-xl flex justify-between mt-auto">Корзина <Image src={'/images/icons/bag.svg'} alt="Bag" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900" /></Link>}
        </ul>
      </div>
      <div 
        onClick={closeMenu} 
        className={`max-sm:block fixed inset-0 bg-black z-20 transition-opacity ${isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
      />
      <div
        className={`sticky z-40 top-0 left-0 right-0 transition-transform duration-500 ease-in-out ${
          isScrolled ? 'sm:translate-y-[-122px]' : ''
        }`}
      >
        <HeaderSlogan />
        <header className="shadow-md py-10 max-sm:py-3 max-sm:pt-5 bg-white">
          <Container>
            <nav className="flex flex-col gap-2 items-center relative max-sm:flex-row max-sm:gap-5">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="max-sm:block sm:hidden ml-[-12px] size-7"
              >
                <Image src={'/images/icons/menu.svg'} alt="Menu" width={32} height={32} />
              </button>


              <Link href={'/'} className="text-8xl max-sm:text-5xl">Без Повода</Link>
              <ul className="flex items-center gap-[60px] text-xl font-public-sans font-bold max-sm:hidden">
                <li><Link href={'/feed'}>Без повода</Link></li>
                <li><Link href={'/new'}>Новое</Link></li>
                <li><Link href={'/flowers'}>Цветы</Link></li>
                <li><Link href={'/dried'}>Сухоцветы</Link></li>
                <li><Link href={'/holidays'}>Праздник</Link></li>
                <li><Link href={'/meetings'}>Свидание</Link></li>
              </ul>
              <ul className="absolute right-0 max-sm:right-[-12px] top-[40px] max-sm:top-[10px] flex gap-[25px] max-sm:gap-4">
                {isAuthClient() ? (
                  <>
                    <li><Link href={'/cart'} className=""><Image src={'/images/icons/bag.svg'} alt="Bag" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900 max-sm:hidden" /></Link></li>
                    <li><Link href={'/profile'} className=""><Image src={'/images/icons/user.svg'} alt="User" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900" /></Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href={'/auth/sign-in'} className=""><Image src={'/images/icons/user.svg'} alt="User" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900 sm:hidden" /></Link></li>
                    <Link href={'/auth/sign-in'} className="border-2 border-black px-4 py-2 mt-[-9px] text-md font-inter rounded-xl hover:bg-black hover:text-white transition-all max-sm:hidden">Войти</Link>
                  </>
                )}
                <li><Link href={'/'} className=""><Image src={'/images/icons/search.svg'} alt="Search" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900" /></Link></li>
              </ul>
            </nav>
          </Container>
        </header>
      </div>
    </>
  );
};

export default Header;