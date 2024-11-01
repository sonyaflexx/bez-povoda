import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const userId = Number(params.id);

    try {
        // Получаем корзину пользователя
        const cartResult = await pool.query('SELECT * FROM flower_cart WHERE user_id = $1', [userId]);

        if (cartResult.rows.length === 0) {
            return NextResponse.json({ message: 'Корзина не найдена.' }, { status: 404 });
        }

        const cartId = cartResult.rows[0].cart_id;

        // Получаем все элементы в корзине вместе с продуктами
        const itemsResult = await pool.query(`
            SELECT 
                ci.item_id, 
                ci.product_id, 
                ci.quantity, 
                ci.price,
                p.name, 
                p.description, 
                p.photo 
            FROM flower_cart_item ci
            JOIN flower_product p ON ci.product_id = p.product_id
            WHERE ci.cart_id = $1
        `, [cartId]);

        return NextResponse.json({ cart: { cartId, items: itemsResult.rows } });
    } catch (error) {
        console.error('Ошибка при получении корзины:', error);
        return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
    }
}