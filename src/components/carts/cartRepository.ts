import { ICartRepository } from "./cartPort";
import { Cart, CartItems, ProductLineDetail, ShoppingCartView } from "./cart";
import { Collection, Db, ObjectId } from "mongodb";

export class CartRepository implements ICartRepository {

    private coll: Collection;

    constructor(
       private DB: Db
    ) {
        this.coll = this.DB.collection("carts");
    }

    async getByUserId(id: string): Promise<Cart> {
        const doc = await this.coll.findOne({ userId: id });
        if (!doc) {
            return new Cart({});
        }
        return new Cart(doc.cart.items);
    }

    async save(userId: string, cart: Cart): Promise<void> {
        await this.coll.findOneAndReplace({ userId }, { userId, cart }, { upsert: true })
    }

    async getShoppingCartDetail(userId: string): Promise<ShoppingCartView> {
        const doc = await this.coll.findOne({ userId });
        if (!doc) {
            return [];
        }

        const items = <CartItems>doc.cart.items;
        const expandQuery = Object.values(items).map<Promise<ProductLineDetail>>(async item => {
            const doc = await this.DB
                .collection("products")
                .findOne({ _id: new ObjectId(item.id)});
            return {
                product: {
                    id: <string>doc?._id.toString(),
                    name: <string>doc?.name,
                    price: <number>doc?.price
                },
                qty: item.qty
            }
        });
        return await Promise.all(expandQuery);
    }
}
