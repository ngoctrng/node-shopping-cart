import { Db } from "mongodb";
import { ProductController } from "./productController";

export function createProductController(db: Db): ProductController {
    return new ProductController(db);
}