import { Db } from "mongodb";
import { CartController } from "./cartController";
import { CartService } from "./cartService";
import { CartRepository } from "./cartRepository";

export function createCartController(db: Db): CartController {
    return new CartController(
        new CartService(new CartRepository(db))
    )
}