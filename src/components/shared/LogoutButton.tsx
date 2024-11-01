'use client'

import Cookies from 'js-cookie';

export default function LogoutButton() {
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/auth/sign-in';
    };

    return (
        <button onClick={handleLogout} className="border border-black rounded-lg px-4 py-2 hover:text-white hover:bg-black transition-colors">Выйти из аккаунта</button>
    );
}