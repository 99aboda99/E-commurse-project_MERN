export interface OrderItem {
    productTitle: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
}

export interface MyOrder {
    _id: string
    orderItems: OrderItem[];
    totalAmount: number;
    address: string;
    userId: string;
}