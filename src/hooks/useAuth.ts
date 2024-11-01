import { headers } from 'next/headers';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

interface User {
    userId: string;
    userType: string;
}

export const useAuth = () => {
    const reqHeaders = headers();
    const cookieHeader = reqHeaders.get('cookie');
    const cookies = parse(cookieHeader || '');

    let userData: User | null = null;
    let isAuthenticated = false;

    if (cookies.token) {
        try {
            const secret = process.env.JWT_SECRET || '123123';
            userData = jwt.verify(cookies.token, secret) as User;
            console.log(userData)
            isAuthenticated = true;
        } catch (error) {
            console.error('Ошибка при декодировании токена:', error);
            userData = null;
            isAuthenticated = false;
        }
    }

    return { userData, isAuthenticated };
};