import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({message:"get all users"})
    } catch (err: any) {}
};

export const singleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({message:"get single user"})
    } catch (err: any) {}
};

export const updateUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({message:" update username"})
    } catch (err: any) {}
};

export const updateUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({message:"update user email"})
    } catch (err: any) {}
};

export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({message:"update user password"})
    } catch (err: any) {}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({message:"delete user"})
    } catch (err: any) {}
};