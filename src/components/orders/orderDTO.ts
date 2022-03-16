import { IOrderLine } from "./order";

export interface CreateOrderCommand {
    customerId: string;
    amount: number;
    items: IOrderLine[];
    paymentMethodId: string;
}

export interface PaymentInput {
    paymentMethodId: string;
    payAmount: number;
}