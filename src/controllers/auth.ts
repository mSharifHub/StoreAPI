import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import UserModel from "../models/users";
import { CustomAPIError } from "../middlewares/customError";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.create({ ...req.body });
        const token = user.createJWT();
        res.status(201).json({response:{ user: { name: user.username }, token: token }});
    } catch (err: any) {
        next(new CustomAPIError(500, err.message));
    }
};

export const login = async (req: Request, res: Response) => {
    res.send("login user");
};
