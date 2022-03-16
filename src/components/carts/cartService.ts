import { ICartRepository, ICartUsecases } from "./cartPort";
import { AddProductCommand, RemoveProductCommand } from "./cartDTO";
import { ShoppingCartView } from "./cart";

export class CartService implements ICartUsecases {

    constructor(
       private Cart: ICartRepository
    ) {}

    async addProduct(command: AddProductCommand): Promise<void> {
        const { userId, productId } = command;
        const cart = await this.Cart.getByUserId(userId);

        cart.addItem(productId);

        await this.Cart.save(userId, cart);
    }

    async removeProduct(command: RemoveProductCommand): Promise<void> {
        const { userId, productId } = command;
        const cart = await this.Cart.getByUserId(userId);

        cart.removeItem(productId);

        await this.Cart.save(userId, cart);
    }

    async showShoppingCartFor(userId: string): Promise<ShoppingCartView> {
        return await this.Cart.getShoppingCartDetail(userId);
    }

}