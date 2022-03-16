import { Db } from "mongodb";
import { UserService } from "./userService";
import { UserRepository } from "./userRepository";
import { UserController } from "./userController";

export function createUserController(db: Db): UserController {
    const userService = new UserService(new UserRepository(db));
    return new UserController(userService);
}