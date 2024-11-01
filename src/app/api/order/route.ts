import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
  

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  const cookies = parse(cookieHeader || '');

  if (!cookies.token) {
    return NextResponse.json({ message: 'Токен не найден.' }, { status: 401 });
  }

  try {
    const { payment_method, delivery_method, delivery_address } = await req.json();

    if (!payment_method || !delivery_method) {
      return NextResponse.json({ message: 'Необходимо заполнить все поля.' }, { status: 400 });
    }

    const secret = process.env.JWT_SECRET || '123123';
    const decoded = jwt.verify(cookies.token, secret) as { userId: string };
    const { userId } = decoded;

    // Проверка адреса только при доставке
    if (delivery_method === 'Доставка' && !delivery_address) {
      return NextResponse.json({ message: 'Укажите адрес доставки' }, { status: 400 });
    }

    // Получение товаров из корзины и расчёт общей суммы
    const cartResult = await pool.query(
        `SELECT * FROM flower_cart_item WHERE cart_id = (SELECT cart_id FROM flower_cart WHERE user_id = $1)`,
        [userId]
    );
    const cartItems = cartResult.rows;
    const cartId = cartResult.rows[0].cart_id;

    if (cartItems.length === 0) {
      return NextResponse.json({ message: 'Корзина пуста.' }, { status: 400 });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Создание заказа со статусом по умолчанию "В обработке"
    const orderResult = await pool.query(
      'INSERT INTO flower_order (order_date, order_status, total_amount, payment_method, delivery_method, delivery_address, user_id) VALUES (NOW(), $1, $2, $3, $4, $5, $6) RETURNING order_id',
      ['В обработке', totalAmount, payment_method, delivery_method, delivery_address || null, userId]
    );
    const orderId = orderResult.rows[0].order_id;

    // Добавление товаров в заказ
    for (const item of cartItems) {
      await pool.query(
        'INSERT INTO flower_order_item (quantity, price_at_order, order_id, product_id) VALUES ($1, $2, $3, $4)',
        [item.quantity, item.price, orderId, item.product_id]
      );
    }

    await pool.query('DELETE FROM flower_cart_item WHERE cart_id = $1', [cartId]);
    await pool.query('DELETE FROM flower_cart WHERE cart_id = $1', [cartId]);

    return NextResponse.json({ message: 'Заказ успешно создан.' });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
  }
}


// ADMINS
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        o.order_id,
        o.order_date,
        o.order_status,
        o.total_amount,
        o.payment_method,
        o.delivery_method,
        o.delivery_address,
        o.user_id,
        oi.order_item_id,
        oi.quantity,
        oi.price_at_order,
        p.product_id,
        p.name as product_name,
        p.description,
        p.price as product_price,
        p.photo,
        p.availability,
        p.category_id,
        p.new,
        p.date,
        p.holiday
      FROM flower_order o
      LEFT JOIN flower_order_item oi ON o.order_id = oi.order_id
      LEFT JOIN flower_product p ON oi.product_id = p.product_id
      ORDER BY o.order_id DESC
    `);

    const orders = result.rows.reduce((acc, row) => {
      const { order_id, order_date, order_status, total_amount, payment_method, delivery_method, delivery_address, user_id } = row;

      // Находим существующий заказ по order_id, если он уже в массиве
      let order = acc.find((o: any) => o.order_id === order_id);

      if (!order) {
        // Если заказ не найден, добавляем новый объект заказа в массив
        order = {
          order_id,
          order_date,
          order_status,
          total_amount,
          payment_method,
          delivery_method,
          delivery_address,
          user_id,
          items: []
        };
        acc.push(order);
      }

      // Добавляем товар в items для текущего заказа
      order.items.push({
        order_item_id: row.order_item_id,
        quantity: row.quantity,
        price_at_order: row.price_at_order,
        product: {
          product_id: row.product_id,
          name: row.product_name,
          description: row.description,
          price: row.product_price,
          photo: row.photo,
          availability: row.availability,
          category_id: row.category_id,
          new: row.new,
          date: row.date,
          holiday: row.holiday
        }
      });

      return acc;
    }, []);

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { order_id, order_status } = await req.json();
  try {
    await pool.query('UPDATE flower_order SET order_status = $1 WHERE order_id = $2', [order_status, order_id]);
    return NextResponse.json({ message: 'Статус заказа обновлен.' });
  } catch (error) {
    console.error('Ошибка при обновлении заказа:', error);
    return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
  }
}
