'use client'

import { Order } from '@/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch('/api/order');
    const data = await res.json();
    setOrders(data);
  }

  async function handleStatusChange(orderId: number, newStatus: string) {
    await fetch(`/api/order`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, order_status: newStatus }),
    });
    fetchOrders();
  }

  return (
    <div className="container mx-auto p-6 my-12 font-inter">
      <h1 className="text-2xl font-bold mb-4">Управление заказами</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className='text-left'>
            <th className="px-4 py-2">ID Заказа</th>
            <th className="px-4 py-2">Дата и время</th>
            <th className="px-4 py-2">Продукты</th>
            <th className="px-4 py-2">Метод получения</th>
            <th className="px-4 py-2">Адрес доставки</th>
            <th className="px-4 py-2">Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.order_id}>
              <td className="border px-4 py-2">{order.order_id}</td>
              <td className="border px-4 py-2">{new Date(order.order_date).toLocaleString()}</td>
              <td className="border px-4 py-2 flex gap-1">{order.items.map((item) => <Link href={`/flowers/${item.product.id}`} key={item.order_id}><img src={item.product.photo} alt={item.product.name} className='size-8 rounded-md' /></Link>)}</td>
              <td className="border px-4 py-2">{order.delivery_method}</td>
              <td className="border px-4 py-2">{order.delivery_address}</td>
              <td className="border px-4 py-2">
                <select
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  value={order.order_status}
                >
                  <option value="В обработке">В обработке</option>
                  <option value="В сборке">В сборке</option>
                  <option value="В пути">В пути</option>
                  <option value="Доставлен">Доставлен</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
