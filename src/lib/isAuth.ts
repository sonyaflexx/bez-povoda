import { headers } from 'next/headers'; 
import { parse } from 'cookie'; 

export const isAuth = () => { 
    const reqHeaders = headers(); 
    const cookieHeader = reqHeaders.get('cookie'); 
    const cookies = parse(cookieHeader || ''); 
    return cookies.token ? true : false; 
};