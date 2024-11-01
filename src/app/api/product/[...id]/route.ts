import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name, description, price, photo, availability, category_id, new: isNew, date, holiday } = await req.json();
  
    try {
      await pool.query(
        `UPDATE flower_product SET name = $1, description = $2, price = $3, photo = $4, availability = $5, category_id = $6, new = $7, date = $8, holiday = $9
         WHERE product_id = $10`,
        [name, description, price, photo, availability, category_id, isNew, date, holiday, id]
      );
      return NextResponse.json({ message: 'Продукт обновлен' });
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
    }
}
  
  // Удаление продукта
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
      await pool.query('DELETE FROM flower_product WHERE product_id = $1', [id]);
      return NextResponse.json({ message: 'Продукт удален' });
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
      return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
    }
}