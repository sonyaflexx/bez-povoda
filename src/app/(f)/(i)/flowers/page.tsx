import { CardList } from "@/components/shared/Cards";
import Container from "@/components/ui/Container";
import { getProductsByCategory } from "@/lib/api";

const FlowersPage = async () => {
    const items = await getProductsByCategory('цветы');

    return (
        <main className="mt-[48px] w-full">
            <section>
                <Container>
                    <div className="text-center mx-auto mb-[90px]">
                        <h2 className="font-pioner-sans text-[70px] text-foregroud-primary">Цветы</h2>
                        <p className="font-magnet text-[20px] leading-[30px] text-foregroud-tertiary">Широкий ассортимент цветочных букетов, подходящих для любых событий и мероприятий, от торжеств до повседневного использования.</p>
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
export const dynamic = 'force-dynamic'
