'use client'

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { createOrder } from '@/lib/api/order';

export default function OrderForm() {
  const router = useRouter();
  const [orderData, setOrderData] = useState({
    payment_method: '',
    delivery_method: '',
    delivery_address: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (orderData.delivery_method === 'Доставка' && !orderData.delivery_address) {
        setErrorMessage('Укажите адрес доставки');
        return;
    }

    try {
        await createOrder(orderData);

        setSuccessMessage('Заказ успешно создан!');
        router.push('/profile')
    } catch (error) {
      setErrorMessage('Не удалось создать заказ');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mb-4">
        <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="payment_method">
          Способ оплаты
        </label>
        <select
          name="payment_method"
          id="payment_method"
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          value={orderData.payment_method}
          onChange={handleChange}
          required
        >
          <option value="">Выберите способ оплаты</option>
          <option value="Картой при получении">Картой при получении</option>
          <option value="Наличными">Наличными</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="delivery_method">
          Способ получения
        </label>
        <select
          name="delivery_method"
          id="delivery_method"
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          value={orderData.delivery_method}
          onChange={handleChange}
          required
        >
          <option value="">Выберите способ получения</option>
          <option value="Доставка">Доставка</option>
          <option value="Самовывоз">Самовывоз</option>
        </select>
      </div>

      {orderData.delivery_method === 'Доставка' && (
        <div className="mb-4">
          <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="delivery_address">
            Адрес доставки
          </label>
          <input
            type="text"
            name="delivery_address"
            id="delivery_address"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Введите адрес доставки"
            value={orderData.delivery_address}
            onChange={handleChange}
            required={orderData.delivery_method === 'Доставка'}
          />
        </div>
      )}

      {errorMessage && <p className="text-red-500 text-center my-4">{errorMessage}</p>}

      <button
        type="submit"
        className="px-6 mt-4 w-full py-3 bg-[#717171] text-lg text-white hover:bg-[#6d6d6d] focus:outline-none"
      >
        Оформить заказ
      </button>
    </form>
  );
}