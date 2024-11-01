import { User, UserWithOrders } from "@/types";

const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '';

export async function getUser(userId: string): Promise<UserWithOrders | null> {
  try {
      const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Обязательно для отправки куки
      });

      if (!response.ok) {
          console.error('Ошибка при получении информации о пользователе:', response.statusText);
          return null; // Возвращаем null в случае ошибки
      }

      const data: UserWithOrders = await response.json();
      return data; // Возвращаем данные о пользователе
  } catch (error) {
      console.error('Ошибка при выполнении запроса к API пользователя:', error);
      return null; // Возвращаем null в случае исключения
  }
}