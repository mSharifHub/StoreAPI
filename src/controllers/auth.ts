import { NextFunction, Request, Response } from "express";
import UserModel from "../models/users";
import { CustomAPIError } from "../middlewares/customError";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.create({ ...req.body });
        res.status(201).json({ response: { user: user } });
    } catch (err: any) {
        if (err.code === 11000) {
            next(new CustomAPIError(400, "email or name already in use"));
        } else if (err.name === "ValidationError") {
            const validationError = Object.values(err.errors)
                .map((item: string | object | any) => item.message)
                .join(",");
            return next(new CustomAPIError(400, validationError));
        }

        next(new CustomAPIError(500, err.message));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    // const { email, password } = req.body;
    // if (!email || !password) {
    //     return next(new CustomAPIError(404, "email or password not provided"));
    // }
    // try {
    //     const user = await UserModel.findOne({ email });
    //     if (!user) {
    //         return next(new CustomAPIError(404, "email or password does not match"));
    //     }
    //     const isPassword = await user!.comparePassword(password);
    //     if (!isPassword) {
    //         return next(new CustomAPIError(404, "email or password does not match"));
    //     }
    //     const token = user!.createJWT();
    //     return res.status(200).json({ response: { user: { name: user!.username }} });
    // } catch (err: any) {
    //     return next(new CustomAPIError(500, err.message));
    // }
};
