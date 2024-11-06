'use client'

import { Card } from "@/types"
import Link from "next/link";

const CardItem = ({ item }: { item: Card }) => {
    return (
        <article className="flex justify-center">
            <Link href={`/flowers/${item.product_id}`} className="group font-magnet-regular leading-none flex flex-col items-center gap-2 w-full max-w-[377px]">
                <div className="relative w-full h-[461px] max-sm:h-[350px] mb- overflow-hidden bg-slate-500 bg-opacity-5">
                    <img src={item.photo} alt="" className="pointer-events-none object-cover h-full mx-auto" />
                    <span className="absolute bottom-3 group-hover:bottom-[31px] z-10 transition-all duration-300 left-0 right-0 text-center text-[#717171] text-[20px]">Быстрый просмотр</span>
                    <div className="absolute bottom-5 left-0 right-0 h-[48px] w-[322px] bg-white mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p className="text-[25px]">{item.name}</p>
                <span className="text-[20px] font-magnet">{item.price} ₽</span>
            </Link>
        </article>


    )
}

export default CardItem;