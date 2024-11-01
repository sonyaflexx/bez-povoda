import { Card } from "@/types";

const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '';

// Получить все продукты
export async function getProducts(): Promise<Card[]> {
    const response = await fetch(`${BASE_URL}/api/product`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      console.error('Failed to fetch products');
      return [];
    }
  
    return response.json();
}

export async function getProductsByCategory(category: string): Promise<Card[]> {
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
        throw new Error('Failed to fetch products');
    }

    return response.json();
}

  
// Получить продукт по ID
export async function getProductById(id: number): Promise<Card> {
    const response = await fetch(`${BASE_URL}/api/product?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
  
    return response.json();
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
  