import { IOrderUsecases } from "./orderPort";
import { NextFunction, Request, Response } from "express";
import { CreateOrderCommand } from "./orderDTO";

export class OrderController {
    constructor(
        private orderService: IOrderUsecases
    ) {
        this.newOrder = this.newOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.viewOrder = this.viewOrder.bind(this);
    }

    async newOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const user = <any>req.user;
            const command: CreateOrderCommand = {
                amount: req.body.amount,
                paymentMethodId: req.body.payment_method_id,
                customerId: user.id,
                items: req.body.items
            }
            await this.orderService.createOrder(command);
            return res.status(200).json({ message: "OK!" });
        } catch (err) {
            return next(err);
        }
    }

    async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const user = <any>req.user;
            const orders = await this.orderService.listOrders(user.id);
            return res.status(200).json({ orders });
        } catch (err) {
            return next(err);
        }
    }

    async viewOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const order = await this.orderService.showOrder(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "order not found"});
            }
            return res.status(200).json({ order });
        } catch (err) {
            return next(err);
        }
    }
}