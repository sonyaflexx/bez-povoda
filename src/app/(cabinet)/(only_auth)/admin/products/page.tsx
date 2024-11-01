'use client'

import { useState, useEffect } from 'react';

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    photo: '',
    availability: true,
    category_id: 1,
    new: false,
    date: false,  
    holiday: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch('/api/product');
    const data = await res.json();
    setProducts(data);
  }

  async function handleSave() {
    const method = selectedProduct ? 'PATCH' : 'POST';
    const url = selectedProduct ? `/api/product/${selectedProduct.product_id}` : '/api/product';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({
      name: '', description: '', price: 0, photo: '',
      availability: true, category_id: 1, new: false, date: false, holiday: false 
    });
    setSelectedProduct(null);
    fetchProducts();
  }

  async function handleEdit(product: any) {
    setSelectedProduct(product);
    setFormData(product);
  }

  async function handleDelete(productId: number) {
    await fetch(`/api/product/${productId}`, { method: 'DELETE' });
    fetchProducts();
  }

  return (
    <div className="container mx-auto my-12 p-6 font-inter bg-gray-100 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Управление продуктами</h1>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
                type="text"
                placeholder="Название"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Описание"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Цена"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <input
                type="text"
                placeholder="Ссылка на фото"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
            />
            {/* Выбор категории */}
            <select
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
            >
                <option value={1}>Цветы</option>
                <option value={2}>Сухоцветы</option>
            </select>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
            {/* Доступен */}
            <label className="flex items-center text-gray-700">
                <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400 focus:outline-none mr-2"
                checked={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                />
                Доступен
            </label>
            
            {/* Новый товар */}
            <label className="flex items-center text-gray-700">
                <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400 focus:outline-none mr-2"
                checked={formData.new}
                onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
                />
                Новый
            </label>
            
            {/* Для свиданий */}
            <label className="flex items-center text-gray-700">
                <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400 focus:outline-none mr-2"
                checked={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.checked })}
                />
                Для свиданий
            </label>
            
            {/* Праздничный */}
            <label className="flex items-center text-gray-700">
                <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400 focus:outline-none mr-2"
                checked={formData.holiday}
                onChange={(e) => setFormData({ ...formData, holiday: e.target.checked })}
                />
                Праздничный
            </label>
            </div>

            <button
            onClick={handleSave}
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
            {selectedProduct ? 'Сохранить изменения' : 'Добавить продукт'}
            </button>
        </div>

        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
                <th className="py-3 px-6 text-left">Название</th>
                <th className="py-3 px-6 text-left">Цена</th>
                <th className="py-3 px-6 text-center">Действия</th>
            </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
            {products.map((product: any) => (
                <tr key={product.product_id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{product.price}</td>
                <td className="py-3 px-6 text-center">
                    <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                    Редактировать
                    </button>
                    <button
                    onClick={() => handleDelete(product.product_id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                    Удалить
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
  );
}