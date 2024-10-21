'use client'

import { Card } from "@/types"
import Link from "next/link";

const CardItem = ({ item }: { item: Card }) => {
    return (
        <article>
            <Link href={`/flowers/${item.id}`} className="group font-magnet-regular leading-none flex flex-col items-center gap-2 w-full max-w-[377px]">
                <div className="relative w-full h-[461px] mb-2">
                    <img src={item.imgUrl} alt="" className="pointer-events-none" />
                    <span className="absolute bottom-3 group-hover:bottom-[31px] z-10 transition-all duration-300 left-0 right-0 text-center text-[#717171] text-[20px]">Быстрый просмотр</span>
                    <div className="absolute bottom-5 left-0 right-0 h-[48px] w-[322px] bg-white mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p className="text-[25px]">{item.title}</p>
                <span className="text-[20px] font-magnet">{item.price} ₽</span>
            </Link>
        </article>


    )
}

export default CardItem;