import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import UserModel from "../models/users";
import { CustomAPIError } from "../middlewares/customError";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.create({ ...req.body });
        const token = user.createJWT();
        res.status(201).json({ response: { user: { name: user.username }, token: token } });
    } catch (err: any) {
        next(new CustomAPIError(500, err.message));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new CustomAPIError(404, "email or password not provided"));
    }
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return next(new CustomAPIError(404, "email or password does not match"));
        }

        const isPassword = await user!.comparePassword(password);

        if (!isPassword) {
            return next(new CustomAPIError(404, "email or password does not match"));
        }

        const token = user!.createJWT();

        return res.status(200).json({ response: { user: { name: user!.username }, token: token } });
    } catch (err: any) {
        return next(new CustomAPIError(500, err.message));
    }
};
