import { Cart } from "@/types";

const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '';

export async function addToCart(product_id: number, quantity: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/cart/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id, quantity }),
    });

    if (!response.ok) {
        console.error('Не удалось добавить товар в корзину');
    }

    await response.json();
}

// Функция для получения корзины пользователя
export async function getCart({ userId }: { userId: string }): Promise<Cart> {
    const response = await fetch(`${BASE_URL}/api/cart/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Не удалось получить корзину пользователя');
    }

    const data = await response.json();
    return data.cart;
}

export async function removeItemFromCart(item_id: string): Promise<void> {
    const response = await fetch(`/api/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id }),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Не удалось удалить товар из корзины: ${errorMessage.message}`);
    }

    console.log('Товар успешно удален из корзины');
}