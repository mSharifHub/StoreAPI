import { NextFunction, Request, Response } from "express";
import UserModel from "../models/users";
import { CustomAPIError } from "../middlewares/customError";
import { attachCookie, isTokenValid } from "../utils/utils";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.create({ ...req.body });
        const userPayload: object = { username: user.username, userId: user._id, role: user.role };
        attachCookie(res, userPayload);
        res.status(201).json({ response: { user: userPayload } });
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
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new CustomAPIError(404, "email or password does not match"));
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return next(new CustomAPIError(404, "invalid credentials"));
        }
        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return next(new CustomAPIError(404, "invalid credentials"));
        }
        const userPayload: object = { username: user.username, userId: user._id, role: user.role };
        attachCookie(res, userPayload);
        return res.status(200).json({ user: userPayload });
    } catch (err: any) {
        next(new CustomAPIError(500, err.message));
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.send(200).json({ message: "user logout successfully" });
};
