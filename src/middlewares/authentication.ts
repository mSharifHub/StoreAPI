import UserModel from "../models/users";
import { verify } from "jsonwebtoken";
import { CustomAPIError } from "./customError";
import { NextFunction, Request, Response } from "express";

export const authenticator = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    console.log(`in the authenticator: the req.headers.authorization is: ${authHeader}`);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.log("Authenticator failed");
        return next(new CustomAPIError(404, "authentication invalid"));
    }

    const token = authHeader.split(" ")[1];
    console.log(`header exist and token is ${token}`);
    const JWT = process.env.JWT_SECRET;
    console.log(`JWT extracted from env and is ${JWT}`);

    try {
        const payload: Function | any = verify(token, JWT!);

        console.log(`Debugging payload: ${JSON.stringify(payload)}`);

        req.user = { userId: payload.userId, username: payload.username };
        console.log(`Debugging req.user: ${JSON.stringify(req.user)}`);
        console.log(`exiting authenticator to next function`);
        next();
    } catch (err: any) {
        next(new CustomAPIError(500, err.message));
    }
};
