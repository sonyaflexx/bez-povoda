'use client'

import { removeItemFromCart } from '@/lib/api/cart';
import React, { FC, ReactNode } from 'react';
import Spinner from './Spinner';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    handleClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, className, handleClick}) => {
    const [loading, setLoading] = React.useState(false);

    const onClick = async () => {
        if (handleClick) {
            setLoading(true);
            try {
                await handleClick();
            } catch (error) {
                console.error('Ошибка при выполнении действия:', error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`border border-black text-black px-4 py-2 relative hover:text-white hover:bg-black transition-colors duration-300 ${loading ? 'pointer-events-none' : ''} ${className || ''}`}
        >
            <div className={`h-full w-full absolute top-0 left-0 pointer-events-none flex items-center justify-center ${loading ? '' : 'opacity-0'}`}>
                <Spinner className={`size-5 ${loading ? '' : 'opacity-0'}`} />
            </div>
            <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>{children}</span>
        </button>
    );
};

export default Button;
