import CartList from "@/components/shared/CartList";
import Container from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import { getCart, removeItemFromCart } from "@/lib/api/cart";
import { CartItem } from "@/types";
import Link from "next/link";
import { useState } from "react";

const CartPage = async () => {
    const { userData } = useAuth();
    const cart = await getCart({ userId: userData?.userId || '' });
    
    if (!cart) {
        return <div className="font-inter mx-auto py-24 pb-96 text-3xl text-center">Корзина пуста или не найдена.</div>;
    }

    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);


    return (
        <main className="w-full">
            <section className="py-20 bg-gray-100 font-inter">
                <Container>
                    <div className="container mx-auto p-4 max-sm:p-0">
                        <h1 className="text-2xl font-bold">Ваша корзина - {totalPrice.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}₽</h1>
                        <p className="text-lg text-zinc-600">Всего {totalItems} товара(-ов)</p>
                        <div className="mt-4">
                            <CartList initialCart={cart.items} />
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default CartPage;