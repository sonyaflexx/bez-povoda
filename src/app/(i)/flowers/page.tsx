import { CardList } from "@/components/shared/Cards";
import Container from "@/components/ui/Container";

const items = [
    {
        id: 1,
        title: 'Букет №1',
        imgUrl: 'https://i.imgur.com/7Ruv6xH.png',
        price: 5470
      },
      {
        id: 2,
        title: 'Букет №2',
        imgUrl: 'https://i.imgur.com/dkKKiYW.png',
        price: 1370
      },
      {
        id: 3,
        title: 'Букет №3',
        imgUrl: 'https://i.imgur.com/OVsvNV1.png',
        price: 2570
      },
      {
        id: 1,
        title: 'Букет №1',
        imgUrl: 'https://i.imgur.com/7Ruv6xH.png',
        price: 5470
      },
      {
        id: 2,
        title: 'Букет №2',
        imgUrl: 'https://i.imgur.com/dkKKiYW.png',
        price: 1370
      },
      {
        id: 3,
        title: 'Букет №3',
        imgUrl: 'https://i.imgur.com/OVsvNV1.png',
        price: 2570
      }
]

const FlowersPage = () => {
    return (
        <main className="mt-[48px] w-full">
            <section>
                <Container>
                    <div className="text-center mx-auto mb-[90px]">
                        <h2 className="font-pioner-sans text-[70px] text-foregroud-primary">Цветы</h2>
                        <p className="font-magnet text-[20px] leading-[30px] text-foregroud-tertiary">Мы заботимся о качестве каждой детали, чтобы ваш букет радовал глаз и приносил настроение. Выберите свой идеальный букет и подарите немного красоты близким или себе, даже без повода!</p>
                    </div>
                    <CardList items={items} />
                </Container>
            </section>
            <section className="bg-[url('/images/quality-bg-flowers.png')] bg-cover h-[797px] w-full flex items-center mt-[150px]">
                <div className="mx-auto w-full max-w-[857px] font-magnet-regular text-center text-white">
                <h3 className="text-[30px] mb-[50px]">Качество, которому можно доверять</h3>
                <p className="text-[25px] leading-[35px]">Все цветы, представленные в магазине «Без Повода», проходят тщательный отбор и доставляются напрямую от ведущих мировых поставщиков. Мы работаем с проверенными фермами из Голландии, Эквадора, Кении и других стран, известных своими передовыми технологиями выращивания. Благодаря оптимизированной логистике и строгим стандартам хранения, наши цветы сохраняют свежесть и яркость на протяжении длительного времени.</p>
                </div>
            </section>
        </main>
    )
}

export default FlowersPage;