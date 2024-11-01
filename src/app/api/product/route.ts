import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');

    try {
        let result;
        let query = 'SELECT * FROM flower_product WHERE 1=1';
        const params = [];

        if (id) {
            query += ' AND product_id = $1';
            params.push(id);
        }

        if (category) {
            switch (category.toLowerCase()) {
                case 'новое':
                    query += ' AND new = TRUE';
                    break;
                case 'цветы':
                    query += ' AND category_id = 1'; 
                    break;
                case 'сухоцветы':
                    query += ' AND category_id = 2';
                    break;
                case 'праздник':
                    query += ' AND holiday = TRUE';
                    break;
                case 'свидание':
                    query += ' AND date = TRUE';
                    break;
                default:
                    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
            }
        }

        result = await pool.query(query, params);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
  const { name, description, price, photo, availability, category_id, new: isNew, date, holiday } = await req.json();
  try {
    await pool.query(
      'INSERT INTO flower_product (name, description, price, photo, availability, category_id, new, date, holiday) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [name, description, price, photo, availability, category_id, isNew, date, holiday]
    );
    return NextResponse.json({ message: 'Продукт добавлен.' });
  } catch (error) {
    console.error('Ошибка при добавлении продукта:', error);
    return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
  }
}
