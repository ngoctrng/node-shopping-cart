import dotenv from "dotenv";
import products from "./products.json";
import { connectDB } from "../loaders/mongodb";

async function run() {
    dotenv.config();

    const db = await connectDB(process.env.DB_URI || "");

    await db.collection("products").insertMany(products)
}

run()
    .then(() => {
        console.log("Product seeds done!");
        process.exit(0);
    })
    .catch(console.error);