export class Order {
    id?: string;
    amount: number = 0.0;
    items: IOrderLine[] = [];
    customerId: string;
    paymentId?: string;
    createdAt: Date;

    constructor(customerId: string, amount: number, items: IOrderLine[]) {
        this.amount = amount;
        this.items = items;
        this.customerId = customerId;
        this.createdAt = new Date();
    }

    setPaymentId(id: string) {
        this.paymentId = id;
    }
}

export interface IOrderLine {
    productId: string;
    productPrice: number;
    quantity: number;
}

export type OrderView = {
    id?: string;
    amount: number;
    createdAt: Date;
}

export interface OrderDetail {
    id?: string;
    amount: number;
    items: IOrderLine[];
    customer: Customer;
    createdAt: Date;
}

export interface Customer {
    id: string;
    username: string;
}