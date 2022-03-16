import { IOrderRepository, IOrderUsecases, IPaymentGateway } from "./orderPort";
import { CreateOrderCommand } from "./orderDTO";
import { Order, OrderDetail, OrderView } from "./order";

export class OrderService implements IOrderUsecases {

    constructor(
        private OrderRepo: IOrderRepository,
        private Payment: IPaymentGateway
    ) {
    }

    async createOrder(command: CreateOrderCommand): Promise<void> {
        const { paymentMethodId, amount, items, customerId } = command;
        const paymentInput = { paymentMethodId, payAmount: amount };
        const paymentId = await this.Payment.pay(paymentInput);
        const order = new Order(customerId, amount, items);
        order.setPaymentId(paymentId);
        await this.OrderRepo.save(order);
    }

    async listOrders(customerId: string): Promise<OrderView[]> {
        return this.OrderRepo.findOrderBy(customerId);
    }

    async showOrder(id: string): Promise<OrderDetail | null> {
        return await this.OrderRepo.findById(id)
    }

}