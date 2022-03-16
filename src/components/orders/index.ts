import { Db } from "mongodb";
import { OrderService } from "./orderService";
import { OrderRepository } from "./orderRepository";
import { StripePayment } from "./paymentGateway";
import { OrderController } from "./orderController";

export function createOrderController(db: Db) {
    const service  = new OrderService(
        new OrderRepository(db),
        new StripePayment()
    )
    return new OrderController(service);
}