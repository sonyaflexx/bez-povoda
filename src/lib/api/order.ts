const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '';

export async function createOrder({
    payment_method,
    delivery_method,
    delivery_address,
  }: {
    payment_method: string;
    delivery_method: string;
    delivery_address?: string;
  }): Promise<void> {
    const response = await fetch(`/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method,
        delivery_method,
        delivery_address: delivery_method === 'Доставка' ? delivery_address : undefined, 
      }),
    });
  
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Не удалось создать заказ: ${errorMessage.message}`);
    }
  
    const data = await response.json();
    console.log('Заказ успешно создан:', data.message);
}
  