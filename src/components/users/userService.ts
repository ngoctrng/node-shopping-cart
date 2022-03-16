import { User } from "./user";
import { CreateUserCommand, UserLoginCommand } from "./userDTO";
import { IUserRepository, IUserUsecases } from "./userPort";
import { comparePassword, hasher } from "./userUtil";

export class UserService implements IUserUsecases{
    private repo: IUserRepository;

    constructor(repo: IUserRepository) {
        this.repo = repo;
    }

    async createUser(command: CreateUserCommand): Promise<void> {
        const { username, password } = command;

        const existedUser = await this.repo.findByUsername(username);
        if (existedUser) {
            throw new Error("username has already been taken")
        }

        const hashedpw = await hasher(password);
        const user = new User(username, hashedpw);
        await this.repo.save(user);
    }

    async userLogin(command: UserLoginCommand): Promise<string> {
        const { username, password } = command;

        const user = await this.repo.findByUsername(username);
        if (!user) {
            throw new Error("user not found");
        }

        const isMatch = comparePassword(password, user.password)
        if (!isMatch) {
            throw new Error("credentials mismatch");
        }

        return user.id!;
    }

}