import { Db, Document, WithId } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { Product } from "./product";

export class ProductController {

    private DB: Db

    constructor(db: Db) {
        this.DB = db;
        this.listProducts = this.listProducts.bind(this);
    }

    async listProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const cursor = await this.DB.collection("products").find();
            const products: Product[] = [];
            await cursor.forEach((doc: WithId<Document>) => {
                products.push({
                    id: doc.id,
                    name: doc.name,
                    description: doc.description,
                    price: doc.price,
                    image: doc.image
                });
                return true;
            })
            return res.status(200).json(products);
        } catch (err) {
            return next(err)
        }
    }
}