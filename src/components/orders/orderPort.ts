import { CreateOrderCommand, PaymentInput } from "./orderDTO";
import { Order, OrderDetail, OrderView } from "./order";

export interface IOrderUsecases {
    createOrder(command: CreateOrderCommand): Promise<void>;

    listOrders(customerId: string): Promise<OrderView[]>;

    showOrder(id: string): Promise<OrderDetail | null>;
}

export interface IPaymentGateway {
    pay(input: PaymentInput): Promise<string>;
}

export interface IOrderRepository {
    save(order: Order): Promise<void>;

    findOrderBy(customerId: string): Promise<OrderView[]>;

    findById(id: string): Promise<OrderDetail | null>;
}