'use client'

import { useState } from "react";

export default function AddCartForm({ id }: { id: number }) {
    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    };
    
    const decrement = () => {
        if (count > 0) {
          setCount(count - 1);
        }
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        if (newValue >= 0) {
          setCount(newValue);
        } else {
          setCount(0);
        }
    };

    return (
        <div className="flex gap-[50px] w-full h-[70px] font-public-sans font-medium">
            <div className="h-full w-[160px] border border-[#1E1E1E] flex items-center justify-center">
                <button onClick={decrement} className="flex-1 h-full pl-[17px]">
                    <div className="relative">
                        <div className="absolute left-0 w-[25px] h-[2px] rounded-[48px] bg-[#292D32]" />
                    </div>
                </button>
                <input
                    type="text"
                    value={count}
                    min="0"
                    onChange={handleChange}
                    className="outline-none text-[25px] w-[2ch] text-center text-[#292D32] flex-1"
                />
                <button onClick={increment} className="flex-1 h-full pr-[17px]">
                    <div className="relative">
                        <div className="absolute right-0 w-[25px] h-[2px] rounded-[48px] bg-[#292D32]" />
                        <div className="absolute right-0 w-[25px] h-[2px] rounded-[48px] rotate-90 bg-[#292D32]" />
                    </div>
                </button>
            </div>

            <button className="h-full flex-1 border border-[#1E1E1E] flex items-center justify-center text-[#292D32] text-[20px]">
                В корзину
            </button>
        </div>
    )
}