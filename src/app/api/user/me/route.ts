// src/app/api/user/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
    const cookieHeader = req.headers.get('cookie');
    const cookies = parse(cookieHeader || '');

    if (!cookies.token) {
        return NextResponse.json({ message: 'Токен не найден.' }, { status: 401 });
    }

    try {
        const secret = process.env.JWT_SECRET || '123123';
        const decoded = jwt.verify(cookies.token, secret) as { userId: string };

        const { userId } = decoded;
        const result = await pool.query('SELECT user_id, first_name, last_name, email, user_type, phone, address, registration_date FROM flower_user WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            return NextResponse.json({ message: 'Пользователь не найден.' }, { status: 404 });
        }

        const user = result.rows[0];
        return NextResponse.json({ user });
    } catch (error) {
        console.error('Ошибка при получении информации о пользователе:', error);
        return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
    }
}
