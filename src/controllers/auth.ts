import { Request, Response } from "express";
import "express-async-errors";
import UserModel from '../models/users'

export const auth = async (req: Request, res: Response) => {
    res.send("resgister user");
};

export const login = async (req: Request, res: Response) => {
    res.send("login user");
};
