import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest, res: NextResponse) {
    const { first_name, last_name, email, password, phone, address } = await req.json();
    console.log(req)

    if (!first_name || !last_name || !email || !password) {
        return NextResponse.json({ message: 'Пожалуйста, заполните все обязательные поля.' }, { status: 400 });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM flower_user WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({ message: 'Пользователь с таким email уже существует.' }, { status: 409 });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = await pool.query(
            'INSERT INTO flower_user (first_name, last_name, email, password, user_type, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [first_name, last_name, email, hashedPassword, 'Customer', phone, address]
        );

        const user = newUser.rows[0];
        
        // Создание JWT токена
        const token = jwt.sign(
            { userId: user.user_id, userType: user.user_type },
            process.env.JWT_SECRET || '123123'
        );

        // Установка куки с токеном
        const cookieHeader = cookie.serialize('token', token, {
            httpOnly: false,
            secure: false, // HTTPS в продакшене
            maxAge: 3600000, // 1 час
            path: '/',
            sameSite: 'lax', // CSRF защита
        });

        const response = NextResponse.json({ message: 'Регистрация успешна', user });
        response.headers.set('Set-Cookie', cookieHeader);

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
    }
}
