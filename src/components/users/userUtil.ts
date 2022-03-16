import bcrypt, { genSalt, hash } from "bcrypt";

export async function hasher(pass: string): Promise<string> {
    const salt = await genSalt(5);
    return await hash(pass, salt);
}

export async function comparePassword(
    pass: string,
    encrypted: string
): Promise<boolean> {
    return await bcrypt.compare(pass, encrypted)
}