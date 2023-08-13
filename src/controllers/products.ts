import { Request, Response } from "express";

export const getAllProductsStatic = async (req: Request, res: Response) => {
    res.status(200).json({ message: `products testing router` });
};

export const getAllProducts = async (req: Request, res: Response) => {
    res.status(200).json({ message: `products testing router` });
};
