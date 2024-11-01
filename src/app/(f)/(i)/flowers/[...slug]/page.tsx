import { AddCartForm } from "@/components/shared/AddCartForm"
import { CardList } from "@/components/shared/Cards"
import { Dropdown } from "@/components/shared/Dropdown"
import InstagramSection from "@/components/shared/InstagramSection"
import Container from "@/components/ui/Container"
import { getProductById, getProducts } from "@/lib/api"

export default async function ProductPage({ params }: { params: { slug: any } }) {
    const dataArray : any = await getProductById(params.slug[0])
    const data = dataArray[0]

    const flowersGroup2 = (await getProducts()).slice(0, 3);

    const tabs = [
        {
            id: 1,
            title: 'Описание',
            content: data.description
        },
        {
            id: 2,
            title: 'Доставка',
            content: 'Доставка займет от 3 до 5 рабочих дней.'
        },
        {
            id: 3,
            title: 'Отзывы',
            content: 'Отзывов пока нет.'
        }
    ]

    return (
        <main className="mt-[90px]">
            <section className="mb-[190px]">
                <Container>
                    <div className="flex gap-[44px]">
                        <img src={data.photo} width={697} height={743} alt="" className="max-h-[743px] min-w-[697px] object-cover" />
                        <div className="w-full">
                            <h2 className="text-[#1E1E1E] font-magnet-regular text-[60px]">{data.name}</h2>
                            <div className="-mt-1">
                                <div className="flex gap-[5px] items-center">
                                    {[1, 2, 3, 4, 5].map((item, index) => 
                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="29.000000" height="29.000000" viewBox="0 0 29 29" fill="none">
                                            <desc>
                                                    Created with Pixso.
                                            </desc>
                                            <defs>
                                                <clipPath id="clip453_547">
                                                    <rect id="ph:star-fill" rx="-0.500000" width="28.000000" height="28.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0"/>
                                                </clipPath>
                                            </defs>
                                            <rect id="ph:star-fill" rx="-0.500000" width="28.000000" height="28.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0"/>
                                            <g clip-path="url(#clip453_547)">
                                                <path id="Vector" d="M26.56 12.95L21.45 17.41L22.98 24.05C23.06 24.4 23.04 24.76 22.91 25.09C22.79 25.43 22.57 25.72 22.28 25.93C21.99 26.14 21.65 26.26 21.29 26.27C20.94 26.29 20.59 26.2 20.28 26.01L14.49 22.5L8.71 26.01C8.41 26.2 8.06 26.29 7.7 26.27C7.34 26.26 7 26.14 6.71 25.93C6.42 25.72 6.2 25.43 6.08 25.09C5.95 24.76 5.93 24.4 6.01 24.05L7.54 17.42L2.43 12.95C2.16 12.72 1.96 12.41 1.87 12.07C1.77 11.72 1.78 11.36 1.89 11.02C2 10.68 2.21 10.38 2.49 10.16C2.77 9.94 3.11 9.8 3.46 9.77L10.2 9.19L12.83 2.92C12.96 2.59 13.2 2.31 13.49 2.11C13.79 1.91 14.14 1.81 14.5 1.81C14.85 1.81 15.2 1.91 15.5 2.11C15.79 2.31 16.03 2.59 16.16 2.92L18.8 9.19L25.53 9.77C25.89 9.8 26.23 9.94 26.51 10.16C26.79 10.38 27 10.68 27.11 11.02C27.22 11.36 27.22 11.72 27.13 12.07C27.03 12.41 26.84 12.72 26.57 12.95L26.56 12.95Z" fill={item > data.rating ? "#D3D3D3" : "#717171"} fillOpacity="1.000000" fillRule="nonzero"/>
                                            </g>
                                        </svg>
                                    )}
                                    <span className="text-[#717171] font-public-sans font-medium text-[18px] ml-2">{data.reviews_count || '0'} отзывов</span>
                                </div>
                            </div>
                            <span className="block mt-4 text-[#292D32] font-public-sans font-medium text-[50px]">{data.price} ₽</span>
                            <div className="mt-7">
                                <AddCartForm id={data.product_id} />
                            </div>
                            <div>
                                <Dropdown tabs={tabs} />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <InstagramSection />

            <section className="mt-[150px]">
                <Container>
                    <CardList items={flowersGroup2} />
                </Container>
            </section>
        </main>
    )
}