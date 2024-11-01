import Footer from "@/components/shared/Footer";
import Container from "@/components/ui/Container";
import { isAuth } from "@/lib/isAuth";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="w-full relative bg-white bg-cover border-b-4">
                <Container>
                    <nav className="flex flex-col gap-2 items-center py-10 text-black relative">
                        <Link href={'/'} className="text-8xl">Без Повода</Link>
                        <ul className="flex items-center gap-[60px] text-xl font-public-sans font-bold">
                            <li><Link href={'/feed'} className="hover:text-pink-200 hover:underline underline-offset-4 transition-all duration-300">Без повода</Link></li>
                            <li><Link href={'/new'} className="hover:text-pink-200 hover:underline underline-offset-4 transition-all duration-300">Новое</Link></li>
                            <li><Link href={'/flowers'} className="hover:text-pink-200 hover:underline underline-offset-4 transition-all duration-300">Цветы</Link></li>
                            <li><Link href={'/dried'} className="hover:text-pink-200 hover:underline underline-offset-4 transition-all duration-300">Сухоцветы</Link></li>
                            <li><Link href={'/holidays'} className="hover:text-pink-200 hover:underline underline-offset-4 transition-all duration-300">Праздник</Link></li>
                            <li><Link href={'/meetings'} className="hover:text-pink-200 hover:underline underline-offset-4 transition-all duration-300">Свидание</Link></li>
                        </ul>
                        <ul className="absolute right-0 top-[80px] flex gap-[25px]">
                            {isAuth() ? (
                                <>
                                <li><Link href={'/cart'} className=""><Image src={'/images/icons/bag.svg'} alt="Bag" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900" /></Link></li>
                                <li><Link href={'/profile'} className=""><Image src={'/images/icons/user.svg'} alt="User" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900" /></Link></li>
                                </>
                            ) : (
                                <>
                                <Link href={'/auth/sign-in'} className="border-2 border-black px-4 py-2 mt-[-9px] text-md font-inter rounded-xl hover:bg-black hover:text-white transition-all">Войти</Link>
                                </>
                            )}
                            <li><Link href={'/'} className=""><Image src={'/images/icons/search.svg'} alt="Search" width={24} height={24} className="hover:opacity-80 transition-opacity text-zinc-900" /></Link></li>
                        </ul>
                    </nav>
                </Container>
            </section>
            {children}
            <Footer />
        </>
    );
}