import { Card } from "@/types";

const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '';

export async function getProducts(): Promise<Card[]> {
  try {
      const response = await fetch(`${BASE_URL}/api/product`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
          console.error('Не удалось получить продукты:', response.statusText);
          return []; // Возвращаем пустой массив в случае ошибки
      }

      return await response.json();
  } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
      return []; // Возвращаем пустой массив в случае исключения
  }
}

// Получить продукты по категории
export async function getProductsByCategory(category: string): Promise<Card[]> {
  try {
      let url = `${BASE_URL}/api/product`;
      const params: URLSearchParams = new URLSearchParams();
      params.append('category', category);

      if (params.toString()) {
          url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
          console.error('Не удалось получить продукты по категории:', response.statusText);
          return []; // Возвращаем пустой массив в случае ошибки
      }

      return await response.json();
  } catch (error) {
      console.error('Ошибка при получении продуктов по категории:', error);
      return []; // Возвращаем пустой массив в случае исключения
  }
}

// Получить продукт по ID
export async function getProductById(id: number): Promise<Card | null> {
  try {
      const response = await fetch(`${BASE_URL}/api/product?id=${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
          console.error(`Не удалось получить продукт с id ${id}:`, response.statusText);
          return null; // Возвращаем null в случае ошибки
      }

      return await response.json();
  } catch (error) {
      console.error(`Ошибка при получении продукта с id ${id}:`, error);
      return null; // Возвращаем null в случае исключения
  }
}

// Создать новый продукт
export async function createProduct(product: Card): Promise<Card> {
    const response = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
  
    return response.json();
  }
  
// Обновить продукт по ID
export async function updateProduct(id: number, product: Card): Promise<Card> {
    const response = await fetch(`/api/product?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update product with id ${id}`);
    }
  
    return response.json();
}
  
// Удалить продукт по ID
export async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(`/api/product?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to delete product with id ${id}`);
    }
}
  
