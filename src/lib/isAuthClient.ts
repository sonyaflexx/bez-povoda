export const isAuthClient = () => {
    if (typeof window !== 'undefined') {
        console.log(document.cookie); // Выводим все куки в консоль

        const cookieString = document.cookie;
        const tokenCookie = cookieString.split('; ').find(row => row.startsWith('token='));
    
        return tokenCookie ? !!tokenCookie.split('=')[1] : false;
    }

};
