import { PassportStatic } from "passport";
import { Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import { IUserRepository } from "../components/users/userPort";

export async function passportConfig(
    passport: PassportStatic,
    userRepo: IUserRepository
) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
    }

    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await userRepo.findById(payload.userId);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));
}