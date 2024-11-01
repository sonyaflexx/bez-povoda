import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
    const cookieHeader = req.headers.get('cookie');
    const cookies = parse(cookieHeader || '');

    if (!cookies.token) {
        return NextResponse.json({ message: 'Токен не найден.' }, { status: 401 });
    }

    const { product_id, quantity } = await req.json();

    if (!product_id || !quantity) {
        return NextResponse.json({ message: 'Необходимо указать product_id и quantity.' }, { status: 400 });
    }

    try {
        const secret = process.env.JWT_SECRET || '123123';
        const decoded = jwt.verify(cookies.token, secret) as { userId: string };
        const { userId } = decoded;

        // Получаем или создаем корзину пользователя
        let cartResult = await pool.query('SELECT cart_id FROM flower_cart WHERE user_id = $1', [userId]);
        let cartId;

        if (cartResult.rows.length > 0) {
            cartId = cartResult.rows[0].cart_id;
        } else {
            const newCartResult = await pool.query('INSERT INTO flower_cart (user_id) VALUES ($1) RETURNING cart_id', [userId]);
            cartId = newCartResult.rows[0].cart_id;
        }

        // Проверяем, существует ли уже этот продукт в корзине
        const existingItem = await pool.query('SELECT * FROM flower_cart_item WHERE cart_id = $1 AND product_id = $2', [cartId, product_id]);

        if (existingItem.rows.length > 0) {
            // Если существует, обновляем количество
            const newQuantity = existingItem.rows[0].quantity + quantity;
            await pool.query('UPDATE flower_cart_item SET quantity = $1 WHERE cart_id = $2 AND product_id = $3', [newQuantity, cartId, product_id]);
        } else {
            // Если не существует, добавляем новый элемент
            await pool.query('INSERT INTO flower_cart_item (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, (SELECT price FROM flower_product WHERE product_id = $2))', [cartId, product_id, quantity]);
        }

        return NextResponse.json({ message: 'Товар добавлен в корзину.' });
    } catch (error) {
        console.error('Ошибка при добавлении товара в корзину:', error);
        return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const cookieHeader = req.headers.get('cookie');
    const cookies = parse(cookieHeader || '');

    if (!cookies.token) {
        return NextResponse.json({ message: 'Токен не найден.' }, { status: 401 });
    }

    try {
        const { item_id } = await req.json();

        if (!item_id) {
            return NextResponse.json({ message: 'Необходимо указать item_id.' }, { status: 400 });
        }

        const secret = process.env.JWT_SECRET || '123123';
        const decoded = jwt.verify(cookies.token, secret) as { userId: string };
        const { userId } = decoded;

        // Получаем корзину пользователя
        const cartResult = await pool.query('SELECT cart_id FROM flower_cart WHERE user_id = $1', [userId]);

        if (cartResult.rows.length === 0) {
            return NextResponse.json({ message: 'Корзина не найдена.' }, { status: 404 });
        }

        const cartId = cartResult.rows[0].cart_id;

        // Проверяем, есть ли продукт в корзине
        const itemResult = await pool.query('SELECT * FROM flower_cart_item WHERE cart_id = $1 AND item_id = $2', [cartId, item_id]);

        if (itemResult.rows.length === 0) {
            return NextResponse.json({ message: 'Товар не найден в корзине.' }, { status: 404 });
        }

        // Удаляем продукт из корзины
        await pool.query('DELETE FROM flower_cart_item WHERE cart_id = $1 AND item_id = $2', [cartId, item_id]);

        return NextResponse.json({ message: 'Товар удален из корзины.' });
    } catch (error) {
        console.error('Ошибка при удалении товара из корзины:', error);
        return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
    }
}