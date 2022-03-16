import { AddProductCommand, RemoveProductCommand } from "./cartDTO";
import { Cart, ShoppingCartView } from "./cart";

export interface ICartUsecases {
    addProduct(command: AddProductCommand): Promise<void>;

    removeProduct(command: RemoveProductCommand): Promise<void>;

    showShoppingCartFor(userId: string): Promise<ShoppingCartView>;
}

export interface ICartRepository {
    getByUserId(id: string): Promise<Cart>;

    save(userId: string, cart: Cart): Promise<void>;

    getShoppingCartDetail(userId: string): Promise<ShoppingCartView>
}