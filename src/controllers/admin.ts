import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users";
import { CustomAPIError } from "../middlewares/customError";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usersData = await UserModel.find({ role: "user" }).select("-password -role");

        const numberOfUsers = usersData.length;

        if (numberOfUsers < 1) {
            return next(new CustomAPIError(200, "there are no users registered"));
        }

        return res.status(200).json({ response: { usersData: usersData } });
    } catch (err: any) {
        return next(new CustomAPIError(500, err.message));
    }
};

export const singleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserModel.findOne({ _id: req.params.id }).select("-password -role");
        if (!result) {
            return next(new CustomAPIError(400, "the id does not exist"));
        }
        return res.status(200).json({ response: { usersData: result } });
    } catch (err: any) {
        return next(new CustomAPIError(500, err.message));
    }
};

export const updateUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: " update username" });
    } catch (err: any) {}
};

export const updateUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "update user email" });
    } catch (err: any) {}
};

export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "update user password" });
    } catch (err: any) {}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "delete user" });
    } catch (err: any) {}
};
