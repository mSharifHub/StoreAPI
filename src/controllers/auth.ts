import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import UserModel from "../models/users";
import { CustomAPIError } from "../middlewares/customError";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        const err = new CustomAPIError(400, "missing fields");
        return next(err);
    }
    res.send('error skipped')
};

export const login = async (req: Request, res: Response) => {
    res.send("login user");
};
