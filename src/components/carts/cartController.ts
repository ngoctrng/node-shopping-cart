import { ICartUsecases } from "./cartPort";
import { NextFunction, Request, Response } from "express";
import { AddProductCommand, RemoveProductCommand } from "./cartDTO";

export class CartController {

    constructor(private service: ICartUsecases) {
        this.addToCart = this.addToCart.bind(this);
        this.removeAnItem = this.removeAnItem.bind(this);
        this.getCart = this.getCart.bind(this);
    }

    async addToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const user = <any>req.user;
            const command: AddProductCommand = {
                productId: req.params.productId,
                userId: user!.id
            }
            await this.service.addProduct(command);
            return res.status(200).json({ message: "OK!" });
        } catch (err) {
            return next(err);
        }
    }

    async removeAnItem(req: Request, res: Response, next: NextFunction) {
        try {
            const user = <any>req.user;
            const command: RemoveProductCommand = {
                productId: req.params.productId,
                userId: user.id
            }
            await this.service.removeProduct(command);
            return res.status(200).json({ message: "OK!" });
        } catch (err) {
            return next(err);
        }
    }

    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            const user = <any>req.user;
            const cart = await this.service.showShoppingCartFor(user.id);
            return res.status(200).json({ cart });
        } catch (err) {
            return next(err);
        }
    }
}