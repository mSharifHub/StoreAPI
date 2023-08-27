import { CustomAPIError } from "./customError";
import { NextFunction, Request, Response } from "express";
import { isTokenValid } from "../utils/utils";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new CustomAPIError(404, "user not authorized"));
    }
    try {
        const payload: any = isTokenValid(token);

        req.user = { username: payload.username, userId: payload.userId, role: payload.role };

        return next();
    } catch (err: any) {}
};

export const authorize = (req: Request, _: any, next: NextFunction) => {
    const { role, username } = req.user;

    if (role !== "admin") {
        return next(new CustomAPIError(403, `User ${username} not authorized. `));
    }

    return next();
};
