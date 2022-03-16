import { IOrderRepository } from "./orderPort";
import { Order, OrderDetail, OrderView } from "./order";
import { Collection, Db, ObjectId } from "mongodb";

export class OrderRepository implements IOrderRepository {

    private coll: Collection;

    constructor(private DB: Db) {
        this.coll = this.DB.collection("orders");
    }

    async save(order: Order): Promise<void> {
        await this.coll.insertOne(order);
    }

    async findOrderBy(customerId: string): Promise<OrderView[]> {
        const cursors = await this.coll.find({ customerId: new ObjectId(customerId) })
        if (!cursors) {
            return [];
        }

        const orders: OrderView[] = [];
        await cursors.forEach(doc => {
            orders.push({
                id: doc._id.toString(),
                amount: doc.amount,
                createdAt: doc.createdAt
            })
        })
        return orders;
    }

    async findById(id: string): Promise<OrderDetail | null> {
        const order = await this.coll.findOne({ _id: new ObjectId(id) });
        if (!order) {
            return null;
        }
        const customer = await this.DB.collection("users")
            .findOne({ _id: order.customerId })
        return {
            id: order._id.toString(),
            amount: order.amount,
            customer: { id: customer!._id.toString(), username: customer!.username },
            items: order.items,
            createdAt: order.createdAt
        }
    }

}