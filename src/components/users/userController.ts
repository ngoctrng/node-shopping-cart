import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateUserCommand, UserLoginCommand } from "./userDTO";
import { IUserUsecases } from "./userPort";

export class UserController {
    private service: IUserUsecases;

    constructor(service: IUserUsecases) {
        this.service = service;
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const command: CreateUserCommand = {
                username: req.body.username,
                password: req.body.password
            };
            await this.service.createUser(command);
            return res.status(200).json({ message: "success" });
        } catch (err) {
            return next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const command: UserLoginCommand = {
                username: req.body.username,
                password: req.body.password
            };
            const userId = await this.service.userLogin(command);
            const token = jwt.sign(
                { userId },
                process.env.SECRET_KEY!,
                { expiresIn: "24h" }
            );
            return res.status(200).json({ token });
        } catch (err) {
            return next(err);
        }
    }

}