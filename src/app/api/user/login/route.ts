import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest, res: NextResponse) {
    const { email, password } = await req.json();

    try {
        const userQuery = await pool.query('SELECT * FROM flower_user WHERE email = $1', [email]);
        const user = userQuery.rows[0];

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ userId: user.user_id, userType: user.user_type }, process.env.JWT_SECRET || '123123');

            const cookieHeader = cookie.serialize('token', token, {
                httpOnly: false,
                secure: false, // HTTPS в продакшене
                maxAge: 3600000, // 1 час
                path: '/',
                sameSite: 'lax', // CSRF защита
            });

            const response = NextResponse.json({ message: 'Вход успешен', user });
            response.headers.set('Set-Cookie', cookieHeader);

            return response;
        } else {
            return NextResponse.json({ message: 'Неверные учетные данные.' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
    }
}
