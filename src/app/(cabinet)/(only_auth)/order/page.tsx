import CartList from "@/components/shared/CartList";
import OrderForm from "@/components/shared/OrderForm";
import Container from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import { getCart, removeItemFromCart } from "@/lib/api/cart";
import { CartItem } from "@/types";
import Link from "next/link";
import { useState } from "react";

const CartPage = async () => {
    const { userData } = useAuth();
    const cart = await getCart({ userId: userData?.userId || '' });

    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    if (!cart) {
        return <div>Корзина пуста или не найдена.</div>;
    }

    return (
        <main className="w-full">
            <section className="py-20 bg-gray-100 font-inter">
                <Container>
                    <div className="container mx-auto max-sm:mx-0 max-sm:w-full w-1/2 bg-white rounded-3xl p-8">
                        <h1 className="text-2xl font-bold">Итого к оплате - {totalPrice.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}₽</h1>
                        <p className="text-lg text-zinc-600">Всего {totalItems} товара(-ов)</p>
                        <div className="mt-4">
                            <ul className="flex gap-2 flex-wrap mb-4">
                                {cart.items.map(item => (
                                    <li key={item.item_id} className="rounded-3xl bg-white mb-4 flex">
                                            <Link href={`/flowers/${item.product_id}`}>
                                                <img src={item.photo} alt={item.name} className="size-20 object-cover rounded-xl" />
                                            </Link>
                                    </li>
                                ))}
                            </ul>

                            <OrderForm />
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default CartPage;