import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="py-32 bg-gray-100 flex flex-col items-center justify-center font-inter p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Админ-панель</h1>
        
        <div className="space-y-4">
          <Link href="/admin/products" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg text-center block hover:bg-blue-600 transition">
              Управление продуктами
          </Link>
          <Link href="/admin/orders" className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg text-center block hover:bg-green-600 transition">
              Управление заказами
          </Link>
        </div>
      </div>
    </div>
  );
}
