import { Cart } from "@/types";

const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '';

export async function addToCart(product_id: number, quantity: number): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/api/cart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id, quantity }),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error('Не удалось добавить товар в корзину:', errorMessage.message);
            return; // Вы можете бросить ошибку или вернуть значение по умолчанию
        }

        await response.json();
    } catch (error) {
        console.error('Ошибка при добавлении товара в корзину:', error);
    }
}

// Функция для получения корзины пользователя
export async function getCart({ userId }: { userId: string }): Promise<Cart> {
    try {
        const response = await fetch(`${BASE_URL}/api/cart/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error('Не удалось получить корзину пользователя:', errorMessage.message);
            return { items: [] }; // Возвращаем пустую корзину по умолчанию
        }

        const data = await response.json();
        return data.cart || { items: [] }; // Возвращаем пустую корзину, если данные отсутствуют
    } catch (error) {
        console.error('Ошибка при получении корзины:', error);
        return { items: [] }; // Возвращаем пустую корзину по умолчанию
    }
}

export async function removeItemFromCart(item_id: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/api/cart`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id }),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error('Не удалось удалить товар из корзины:', errorMessage.message);
            return; // Вы можете бросить ошибку или вернуть значение по умолчанию
        }

        console.log('Товар успешно удален из корзины');
    } catch (error) {
        console.error('Ошибка при удалении товара из корзины:', error);
    }
}
