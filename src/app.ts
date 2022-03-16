import express, { Application } from 'express';
import { loadExpressApp } from "./loaders/express";
import dotenv from "dotenv";
import { connectDB } from "./loaders/mongodb";

async function initApplication(): Promise<Application> {
    dotenv.config();

    const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/shopping-cart";
    const db = await connectDB(uri);

    const app: Application = express();

    await loadExpressApp({ app, db });

    return app;
}

export default initApplication;