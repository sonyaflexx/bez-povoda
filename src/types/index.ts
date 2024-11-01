export interface Card {
    product_id: number;
    name: string;
    description: string;
    photo: string;
    price: number;
    availability: boolean;
}

export interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    phone: string | null;
    address: string | null;
    registration_date: Date;
}

export interface Order {
    order_id: number;
    order_date: string;
    order_status: string;
    total_amount: number;
    payment_method: string;
    delivery_method: string;
    delivery_address: string;
    items: any[];
}

export interface UserWithOrders {
    user: User;
    orders: Order[];
}

export interface CartItem {
    item_id: string;
    product_id: number;
    quantity: number;
    price: number;
    name: string;
    description: string;
    photo: string;
}

export interface Cart {
    cartId: number;
    items: CartItem[];
}