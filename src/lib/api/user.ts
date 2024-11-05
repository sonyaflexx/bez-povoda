import { User, UserWithOrders } from "@/types";

const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '';

export async function getUser(userId: string): Promise<UserWithOrders> {
  const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      cache: 'no-store',
      next: { revalidate: 0 }
  });

  if (!response.ok) {
    console.log(response);
      throw new Error('Не удалось получить информацию о пользователе');
  }

  const data = await response.json();
  return data;
}
