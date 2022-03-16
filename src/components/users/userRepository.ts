import { User } from "./user";
import { Collection, Db, Document, ObjectId } from "mongodb";
import { IUserRepository } from "./userPort";

export class UserRepository implements IUserRepository {

    private COLLECTION_NAME = "users";
    private coll: Collection;

    constructor(private db: Db) {
        this.coll = db.collection(this.COLLECTION_NAME);
    }

    async save(user: User): Promise<void> {
        delete user.id;
        await this.coll.insertOne(user);
    }

    async findById(id: string): Promise<User | null> {
        const doc = await this.coll.findOne({ _id: new ObjectId(id) });
        if (!doc) {
            return null;
        }
        return this.toUser(doc);
    }

    async findByUsername(username: string): Promise<User | null> {
        const doc = await this.coll.findOne({ username });
        if (!doc) {
            return null;
        }
        return this.toUser(doc);
    }

    toUser(doc: Document): User {
        return {
            id: doc._id,
            username: doc.username,
            password: doc.password
        }
    }
}
