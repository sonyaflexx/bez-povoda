'use client'

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      const response = await fetch(`/api/user/login`, {
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

        router.push('/profile')
      } else {
        setErrorMessage(data.message || 'Ошибка входа');
      }
    } catch (error) {
      setErrorMessage('Ошибка сервера');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 border-2 border-zinc-300 w-1/2 max-sm:w-full mx-auto">
      <h2 className="text-4xl font-inter font-semibold text-center mb-6">Вход</h2>
      <div className="mb-4">
        <label className="block text-md font-inter font-medium text-gray-700 mb-2" htmlFor="email">
          Электронная почта
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full font-inter p-2 border border-gray-300 focus:outline-none"
          placeholder="Введите вашу почту"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-md font-inter font-medium text-gray-700 mb-2" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full font-inter p-2 border border-gray-300 focus:outline-none"
          placeholder="Введите ваш пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      {errorMessage && <p className="text-red-500 text-center my-4 font-inter">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center my-4 font-inter">{successMessage}</p>}

      <button
        type="submit"
        className="w-full py-2 bg-[#717171] font-inter text-xl text-white hover:bg-[#6d6d6d] focus:outline-none"
      >
        Войти
      </button>
      <p className="mt-4 text-center text-gray-600 font-inter">
        Нет аккаунта? <a href="/auth/sign-up" className="text-blue-600 hover:underline">Зарегистрироваться</a>
      </p>
    </form>
  );
}