import LogoutButton from "@/components/shared/LogoutButton";
import Container from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import { getUser } from "@/lib/api/user";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export default async function Page() {
  try {

    const { userData } = useAuth(); 
    
    const { user, orders } = await getUser(userData?.userId || '');
    const sortedOrders = orders.sort((a, b) => Number(new Date(b.order_date)) - Number(new Date(a.order_date)));
  
    return (
      <main className="w-full">
        <section className="py-20 bg-gray-100 font-inter">
          <Container>
            <div className="max-w-1/2 w-full mx-auto bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4">Личный Кабинет</h2>
                <div>
                  {userData?.userType === 'Administrator' ? <Link href="/admin" className="border border-black rounded-lg px-4 py-3 text-white bg-black hover:bg-zinc-700 transition-colors mr-4">Админ-панель</Link> : null}
                  <LogoutButton />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Информация о пользователе</h3>
                <p><strong>Имя:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Телефон:</strong> {user.phone || 'Не указано'}</p>
                <p><strong>Адрес:</strong> {user.address || 'Не указано'}</p>
                <p><strong>Дата регистрации:</strong> {new Date(user.registration_date).toLocaleDateString()}</p>
              </div>
  
              <div>
                <h3 className="text-xl mb-4 pt-8 font-bold">Мои Заказы</h3>
                {orders.length > 0 ? (
                  <ul className="space-y-4">
                    {sortedOrders.map(order => (
                      <li key={order.order_id} className="p-4 bg-gray-50 rounded shadow flex">
                          <div>
                              <p><strong>Номер заказа:</strong> {order.order_id}</p>
                              <p><strong>Дата заказа:</strong> {new Date(order.order_date).toLocaleDateString()} {new Date(order.order_date).toLocaleTimeString()}</p>
                              <p><strong>Способ оплаты:</strong> {order.payment_method}</p>
                              <p><strong>Способ получения:</strong> {order.delivery_method}</p>
                              {order.delivery_method === 'Доставка' && <p><strong>Адрес доставки:</strong> {order.delivery_address}</p>}
                          </div>
                        
                        <div className="flex flex-1 flex-col items-end justify-between">
                          <div>{order.order_status}</div>
                          <div className="flex items-end gap-8">
                              <div className="flex flex-wrap gap-1">
                                  {order.items.map(item => (
                                  <div key={item.product_id} className="flex items-center">
                                      <Link href={`/flowers/${item.product_id}`} className="size-12 flex">
                                      <img 
                                          src={item.product.photo} 
                                          alt={item.product.name} 
                                          width={80} 
                                          height={80} 
                                          className="w-full h-full object-cover rounded-xl" 
                                      />
                                      </Link>
                                  </div>
                                  ))}
                              </div>
                              <span className="text-xl font-semibold">{order.total_amount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}₽</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>У вас нет заказов.</p>
                )}
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  } catch (error) {}
}
