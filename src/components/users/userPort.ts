import { CreateUserCommand, UserLoginCommand } from "./userDTO";
import { User } from "./user";

// Input Port
export interface IUserUsecases {
    createUser(command: CreateUserCommand): Promise<void>;
    userLogin(command: UserLoginCommand): Promise<string>;
}

// Output Port
export interface IUserRepository {
    save(user: User): Promise<void>;
    findByUsername(username: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}