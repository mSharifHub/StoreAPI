import { Request, Response } from "express";
import "express-async-errors";
import ProductModel from "../models/products";


export const getAllProducts = async (req: Request, res: Response) => {
    const products = await ProductModel.find({});

    res.status(200).json(products);
};

export const getProductQuery = async (req: Request, res: Response) => {
    try {
        let query: any = {};

        for (const key in req.query) {
            const value = req.query[key];

            if (typeof value === "string") {
                query[key] = { $regex: new RegExp(value, "i") };
            }
        }

        const products = await ProductModel.find(query);

        res.status(200).json({ products, nbHits: products.length });
    } catch (err) {
        console.log(err);
    }
};
