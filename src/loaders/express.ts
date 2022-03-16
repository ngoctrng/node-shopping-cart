import express, { Application, NextFunction, Request, Response, Router } from "express";
import helmet from "helmet";
import { Db } from "mongodb";
import { createUserController } from "../components/users";
import { createProductController } from "../components/products";
import { passportConfig } from "./passport";
import passport from "passport";
import { UserRepository } from "../components/users/userRepository";
import { isAuthenticated } from "../components/shared/middlewares";
import { createCartController } from "../components/carts";
import { createOrderController } from "../components/orders";

export interface LoaderOptions {
    app: Application;
    db: Db;
}

export async function loadExpressApp({ app, db }: LoaderOptions) {
    await passportConfig(passport, new UserRepository(db))

    // user routes
    const user = createUserController(db);
    const userRoutes = Router();
    userRoutes.post("/signup", user.signup);
    userRoutes.post("/login", user.login);

    // product routes
    const product = createProductController(db);
    const productRoutes = Router();
    productRoutes.get("/", product.listProducts);

    // cart routes
    const cart = createCartController(db);
    const cartRoutes = Router();
    cartRoutes.post("/add-to-cart/:productId", cart.addToCart);
    cartRoutes.post("/remove-item/:productId", cart.removeAnItem);
    cartRoutes.get("/", cart.getCart);

    // order routes
    const order = createOrderController(db);
    const orderRoutes = Router();
    orderRoutes.post("/", order.newOrder);
    orderRoutes.get("/", order.getOrders);
    orderRoutes.get("/:id", order.viewOrder);

    // middlewares
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // setup routes
    app.get("/healthz", (_req, res) => {
        return res.send("OK!");
    });
    app.use("/api/users", userRoutes);
    app.use("/api/products", isAuthenticated, productRoutes);
    app.use("/api/carts", isAuthenticated, cartRoutes);
    app.use("/api/orders", isAuthenticated, orderRoutes);

    // error handler
    app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
        console.error(err);
        return res.json({ message: err.message });
    })
}