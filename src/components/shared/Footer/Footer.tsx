import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <>
            <footer className="border-t border-[#cccccc] py-[80px]">
                <Container>
                    <div className="flex justify-between">
                        <div>
                            <h2><Link href={'/'} className="font-magnet-semibold text-[48px]">Без Повода</Link></h2>
                            <p className="mt-3 font-public-sans font-medium text-[15px] text-[#1E1E1E] opacity-80 max-w-[280px] leading-tight">Этот план развития поможет вам выполнить свои решения и достичь целей, к которым вы стремились.</p>
                            <ul className="mt-4 flex items-center gap-6">
                                <li><Link href={'/'}><Image src="/images/social/twitter.svg" alt="Twitter" width={24} height={24} /></Link></li>
                                <li><Link href={'/'}><Image src="/images/social/linkedin.svg" alt="Linkedin" width={24} height={24} /></Link></li>
                                <li><Link href={'/'}><Image src="/images/social/facebook.svg" alt="Facebook" width={24} height={24} /></Link></li>
                                <li><Link href={'/'}><Image src="/images/social/github.svg" alt="Github" width={24} height={24} /></Link></li>
                                <li><Link href={'/'}><Image src="/images/social/hi.svg" alt="Hi" width={24} height={24} /></Link></li>
                                <li><Link href={'/'}><Image src="/images/social/basket.svg" alt="Basket" width={24} height={24} /></Link></li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-4 gap-[60px] font-inter">
                            <div className="col-span-1">
                                <h4 className="text-[16px] font-semibold mb-5">Маркетплэйс</h4>
                                <nav className="text-[15px]">
                                    <ul className="space-y-1 font-medium">
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Купить продукт</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Продать продукт</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Наш создатель</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-[16px] font-semibold mb-5">Ресурсы</h4>
                                <nav className="text-[15px]">
                                    <ul className="space-y-1 font-medium">
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>О нас</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>События</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Туториалы</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-[16px] font-semibold mb-5">Компания</h4>
                                <nav className="text-[15px]">
                                    <ul className="space-y-1 font-medium">
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Медиа</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Блог</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Цены</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-[16px] font-semibold mb-5">Юридическая</h4>
                                <nav className="text-[15px]">
                                    <ul className="space-y-1 font-medium">
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Условия</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Конфиденциальность</Link></li>
                                        <li className="hover:opacity-95 text-[#1E1E1E] opacity-80 transition-opacity"><Link href={'/'}>Поддержка</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-[16px] font-inter font-regular text-[#1E1E1E] opacity-80 mt-[64px] block mx-auto">© 2024. Без Повода. Все права защищены.</div>
                </Container>
            </footer>
        </>
    )
}

export default Footer;