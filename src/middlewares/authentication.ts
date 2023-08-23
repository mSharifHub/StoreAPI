import UserModel from "../models/users";
import { verify } from "jsonwebtoken";
import { CustomAPIError } from "./customError";
import { NextFunction, Request, Response } from "express";

export const authenticator = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: Express.Request | string | any = req.body.headers;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next(new CustomAPIError(404, "authentication invalid"));
    }

    const token = authHeader.split(" ")[1];
    const JWT = process.env.JWT_SECRET;

    try {
        const payload: Function | any = verify(token, JWT!);
        req.user = { userId: payload.userId, username: payload.username };
        next();
    } catch (err: any) {
        next(new CustomAPIError(500, err.message));
    }
};
