import { Db, MongoClient } from "mongodb";

export async function connectDB(uri: string): Promise<Db> {
    const client = new MongoClient(uri);
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db().command({ ping: 1 });

    return client.db();
}