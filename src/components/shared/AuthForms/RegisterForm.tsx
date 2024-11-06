'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch(`/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
        setFormData({
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        router.push('/profile')
      } else {
        setErrorMessage(data.message || 'Ошибка регистрации');
      }
    } catch (error) {
      setErrorMessage('Ошибка сервера');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 border-2 border-zinc-300 w-1/2 max-sm:w-full mx-auto">
      <h2 className="text-4xl font-semibold text-center mb-6">Регистрация</h2>
      <div className="mb-4">
        <label className="block text-md font-inter font-medium text-gray-700 mb-2" htmlFor="first_name">
          Имя
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          className="block w-full p-2 border font-inter border-gray-300 rounded-md focus:outline-none"
          placeholder="Введите ваше имя"
          value={formData.first_name}
          onChange={handleChange}
          required
          />
      </div>

      <div className="mb-4">
        <label className="block text-md font-inter font-medium text-gray-700 mb-2" htmlFor="last_name">
          Фамилия
        </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          className="block w-full p-2 border font-inter border-gray-300 rounded-md focus:outline-none"
          placeholder="Введите вашу фамилию"
          value={formData.last_name}
          onChange={handleChange}
          required
          />
      </div>

      <div className="mb-4">
        <label className="block text-md font-inter font-medium text-gray-700 mb-2" htmlFor="phone">
          Номер телефона
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="block w-full p-2 border font-inter border-gray-300 rounded-md focus:outline-none"
          placeholder="+7 (900) 000-00-00"
          value={formData.phone}
          onChange={handleChange}
          required
          />
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium font-inter text-gray-700 mb-2" htmlFor="email">
          Электронная почта
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full p-2 border font-inter border-gray-300 rounded-md focus:outline-none"
          placeholder="Введите вашу почту"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-md font-inter font-medium text-gray-700 mb-2" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full p-2 border font-inter border-gray-300 rounded-md focus:outline-none"
          placeholder="Введите ваш пароль"
          value={formData.password}
          onChange={handleChange}
          required
          />
      </div>

      <div className="mb-6">
        <label className="block text-md font-inter font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
          Подтверждение пароля
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="block w-full p-2 border font-inter border-gray-300 rounded-md focus:outline-none"
          placeholder="Введите пароль еще раз"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          />
      </div>

      {errorMessage && <p className="text-red-500 text-center my-4 font-inter">{errorMessage}</p>}

      <button
        type="submit"
        className="w-full py-2 bg-[#717171] font-inter text-xl text-white rounded-md hover:bg-[#6d6d6d] focus:outline-none"
        >
        Зарегистрироваться
      </button>

      <p className="mt-4 text-center text-gray-600 font-inter">
        Уже есть аккаунт? <a href="/auth/sign-in" className="text-blue-600 hover:underline">Войти</a>
      </p>
    </form>
  );
}