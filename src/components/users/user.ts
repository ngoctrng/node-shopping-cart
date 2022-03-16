export class User {
    id?: string = "";
    username: string;
    password: string;
    address?: string | undefined;
    fullname?: string | undefined;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}