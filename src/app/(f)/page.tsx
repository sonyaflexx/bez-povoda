import { CardList } from "@/components/shared/Cards";
import Header from "@/components/shared/Header";
import HeaderSlogan from "@/components/shared/Header/HeaderSlogan";
import InstagramSection from "@/components/shared/InstagramSection";
import Container from "@/components/ui/Container";
import { getProducts } from "@/lib/api";
import { isAuth } from "@/lib/isAuth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const flowersGroup1 = (await getProducts()).slice(0, 3);
  const flowersGroup2 = (await getProducts()).slice(-3);

  return (
    <main className="w-full">
      <div className="sm:hidden">
        <Header />
      </div>
      <section className="h-[800px] max-sm:h-[320px] w-full relative bg-[url('/images/hero-bg.png')] max-sm:bg-[url('/images/bg-mobile.png')] bg-cover bg-no-repeat">
        <div className="max-sm:hidden">
          <HeaderSlogan />
        </div>
        <div className="sm:hidden flex flex-col h-full w-full items-center justify-center text-center gap-12">
          <h1 className="text-white text-[30px] font-magnet">Нам повод не нужен</h1>
          <Link href={'/feed'} className="font-inter font-semibold bg-white py-3 px-6">Shop Now</Link>
        </div>
        <Container>
          <nav className="flex flex-col gap-2 items-center py-10 text-white relative max-sm:hidden">
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
                  <li><Link href={'/cart'} className=""><Image src={'/images/icons/bag-w.svg'} alt="Bag" width={24} height={24} className="hover:opacity-80 transition-opacity" /></Link></li>
                  <li><Link href={'/profile'} className=""><Image src={'/images/icons/user-w.svg'} alt="User" width={24} height={24} className="hover:opacity-80 transition-opacity" /></Link></li>
                </>
              ) : (
                <>
                  <Link href={'/auth/sign-in'} className="border-2 border-white px-4 py-2 mt-[-9px] text-md font-inter rounded-xl hover:bg-white hover:text-black transition-all">Войти</Link>
                </>
              )}
              <li><Link href={'/'} className=""><Image src={'/images/icons/search-w.svg'} alt="Search" width={24} height={24} className="hover:opacity-80 transition-opacity" /></Link></li>
            </ul>
          </nav>
        </Container>

      </section>

      <section className="py-24 max-sm:py-14">
        <Container>
          <CardList items={flowersGroup1} />
        </Container>
      </section>

      <section className="pt-[72px] pb-[181px] max-sm:pt-[30px] max-sm:pb-[100px]">
        <Container>
          <div className="flex gap-10 w-full max-sm:flex-col-reverse max-sm:gap-2">
            <Image src={'/images/our-shop.png'} alt="" width={821} height={580} />
            <div className="font-magnet py-[51px] w-full">
              <h3 className="uppercase text-[32px] max-sm:text-[24px]">Наш магазин</h3>
              <p className="text-[#434141] text-xl font-magnet-semibold max-sm:text-sm">Без повода<br/>Красноярск, ул. Березина, 82а ст1</p>
              <div className="font-magnet mt-14 text-[24px] text-[#434141] w-full leading-tight max-sm:text-[16px]">
                  <div className="w-full flex">Понедельник <span className="ml-auto tracking-[0.015em]">9:00-17:00</span></div>
                  <div className="w-full flex">Вторник - Пятница <span className="ml-auto">9:00-19:00</span></div>
                  <div className="w-full flex">Суббота - Воскресенье <span className="ml-auto">9:00-18:00</span></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <InstagramSection />

      <section className="bg-[url('/images/quality-bg.png')] bg-cover h-[797px] w-full flex items-center mb-[160px]">
        <div className="mx-auto w-full max-w-[857px] max-sm:px-12 font-magnet-regular text-center text-white">
          <h3 className="text-[30px] mb-[50px] max-sm:text-[24px]">Качество, которому можно доверять</h3>
          <p className="text-[25px] leading-[35px] max-sm:text-sm">Все цветы, представленные в магазине «Без Повода», проходят тщательный отбор и доставляются напрямую от ведущих мировых поставщиков. Мы работаем с проверенными фермами из Голландии, Эквадора, Кении и других стран, известных своими передовыми технологиями выращивания. Благодаря оптимизированной логистике и строгим стандартам хранения, наши цветы сохраняют свежесть и яркость на протяжении длительного времени.</p>
        </div>
      </section>

      <section>
        <Container>
          <CardList items={flowersGroup2} />
        </Container>
      </section>
    </main>
  );
}
