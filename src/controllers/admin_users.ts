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
    const { username } = req.body;

    if (!username) {
        return next(new CustomAPIError(400, "Please provide a value"));
    }

    try {
        const user = await UserModel.findOne({ _id: req.user.userId });

        if (!user) {
            return next(new CustomAPIError(400, "user not found"));
        }

        user.username = username;

        await user.save();

        return res.status(200).json({ response: { result: "username changed successfully" } });
    } catch (err: any) {
        return next(new CustomAPIError(500, err.message));
    }
};

export const updateUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        return next(new CustomAPIError(400, "email does not match"));
    }
    try {
        const user = await UserModel.findOne({ _id: req.user.userId });

        if (!user) {
            return next(new CustomAPIError(400, "user not found"));
        }
        user.email = email;
        await user.save();
        return res.status(200).json({ response: { result: "email changed successfully" } });
    } catch (err: any) {
        return next(new CustomAPIError(500, err.message));
    }
};

export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return next(new CustomAPIError(400, "Please provide both values"));
    }
    try {
        const user = await UserModel.findOne({ _id: req.user.userId });

        const oldPassWordMatch = await user?.comparePassword(oldPassword);

        if (!oldPassWordMatch) {
            return next(new CustomAPIError(400, "password does not match"));
        }
        user!.password = newPassword;

        await user!.save();

        return res.status(200).json({ response: "password changed successfully" });
    } catch (err: any) {
        return next(new CustomAPIError(500, err.message));
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (req.user.userId !== id && req.user.role !== "admin") {
        return next(new CustomAPIError(404, "Not authorized "));
    }

    try {
        const userToDelete = await UserModel.findOneAndDelete({ _id: id });

        if (!userToDelete) {
            return next(new CustomAPIError(400, "User not found"));
        }

        return res.status(200).json({ response: "user deleted successfully" });
    } catch (err: any) {
        return next(new CustomAPIError(500, err.message));
    }
};
