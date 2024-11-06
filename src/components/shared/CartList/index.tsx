'use client'

import Button from "@/components/ui/Button";
import { removeItemFromCart } from "@/lib/api/cart";
import { CartItem } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function CartList({ initialCart }: { initialCart: CartItem[] }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
    
    const handleRemoveItem = async (id: string) => {
        await removeItemFromCart(id);
        setCartItems(prevItems => prevItems.filter(item => item.item_id !== id));
    };
    
    return (
        <>
            {cartItems.length === 0 ? (
                <p>В вашей корзине нет товаров.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <li key={item.item_id} className="p-12 rounded-3xl bg-white mb-4 flex">
                            <div className="flex gap-4 text-xl w-full">
                                <Link href={`/flowers/${item.product_id}`}>
                                    <img 
                                        src={item.photo} 
                                        alt={item.name} 
                                        className="size-52 min-w-52 object-cover mr-4 rounded-xl"
                                    />
                                </Link>
                                <div className="flex flex-col justify-between">
                                    <Link href={`/flowers/${item.product_id}`}>
                                        <div>
                                            <h3 className="text-3xl font-semibold">{item.name}</h3>
                                            <p className="text-zinc-700">{item.description}</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <p>Количество: {item.quantity}</p>
                                        <p className="text-2xl font-semibold">{(item.price * item.quantity).toLocaleString('ru-RU', { maximumFractionDigits: 0 })}₽</p>
                                    </div>
                                </div>
                                <Button className="mt-auto ml-auto" handleClick={() => handleRemoveItem(item.item_id)}>Удалить</Button>
                            </div>
                        </li>
                    ))}
                    <Link href='/order' className="bg-[#717171] px-6 py-4 text-xl text-white hover:bg-[#5e5d5d] transition-colors ml-auto block mt-8 w-max">Перейти к оформлению</Link>
                </>
            )}
        </>
    )
}
