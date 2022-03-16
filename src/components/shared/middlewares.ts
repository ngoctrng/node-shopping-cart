import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../users/user";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user: User) {
        if (err || !user) {
            return res.status(403).send({
                message: 'Permission denied'
            });
        }
        req.user = user;
        return next();
    })(req, res, next)
}