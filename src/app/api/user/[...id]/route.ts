import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const userId = Number(params.id);

    try {
        const userResult = await pool.query(
            'SELECT user_id, first_name, last_name, email, user_type, phone, address, registration_date FROM flower_user WHERE user_id = $1',
            [userId]
        );

        if (userResult.rows.length === 0) {
            return NextResponse.json({ message: 'Пользователь не найден.' }, { status: 404 });
        }

        const user = userResult.rows[0];

        const ordersResult = await pool.query(`
            SELECT 
                o.order_id,
                o.order_date,
                o.order_status,
                o.total_amount,
                o.payment_method,
                o.delivery_method,
                o.delivery_address,
                oi.order_item_id,
                oi.quantity,
                oi.price_at_order,
                p.product_id,
                p.name AS product_name,
                p.description AS product_description,
                p.price AS product_price,
                p.photo AS product_photo
            FROM 
                flower_order o
            LEFT JOIN 
                flower_order_item oi ON o.order_id = oi.order_id
            LEFT JOIN 
                flower_product p ON oi.product_id = p.product_id
            WHERE 
                o.user_id = $1
        `, [userId]);

        // Группируем результаты по заказам
        const ordersWithItems = ordersResult.rows.reduce((acc, row) => {
            const { order_id, order_date, order_status, total_amount, payment_method, delivery_method, delivery_address, order_item_id, quantity, price_at_order, product_id, product_name, product_description, product_price, product_photo } = row;

            // Проверяем, существует ли уже заказ в результирующем массиве
            let order = acc.find((o: any) => o.order_id === order_id);

            if (!order) {
                // Если заказа нет, создаем новый объект заказа
                order = {
                    order_id,
                    order_date,
                    order_status,
                    total_amount,
                    payment_method,
                    delivery_method,
                    delivery_address,
                    items: []
                };
                acc.push(order);
            }

            // Добавляем элемент заказа с информацией о продукте
            if (order_item_id) {
                order.items.push({
                    order_item_id,
                    quantity,
                    price_at_order,
                    product_id,
                    product: {
                        name: product_name,
                        description: product_description,
                        price: product_price,
                        photo: product_photo
                    }
                });
            }

            return acc;
        }, []);

        return NextResponse.json({ user, orders: ordersWithItems }); 
    } catch (error) {
        console.error('Ошибка при получении информации о пользователе:', error);
        return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
    }
}