import { Request, Response } from "express";
import "express-async-errors";
import ProductModel from "../models/products";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        let query: any = {};
        // To handle Unanmed Query Parameter ${searchQuery}for the front end
        // user can type products/?value
        const searchQuery = Object.values(req.query)[0];

        // search for a string value and checks for empty string
        if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
            const regex = new RegExp(searchQuery, "i");

            // add the search qury on the  values of document to reflect the search
            query = {
                $or: [{ name: { $regex: regex } }, { vendors: { $regex: regex } }, { category: { $regex: regex } }],
            };
        }

        const products = await ProductModel.find(query);

        res.status(200).json({ products, nbHits: products.length });
    } catch (err) {
        console.log(err);
        res.status(500).json({ mesasage: `Error occurred\nError:${err}` });
    }
};

export const getSortedProducts = async (req: Request, res: Response) => {

    const sortParams: any = req.query.sort;

    let query: any = {};

    let results = ProductModel.find(query);

    if (typeof sortParams === "string") {
        // the sortList params should be split on comma and a space should be added  Ex. -name price when -name,price is typed
        const sortList: string = sortParams.split(',').join(" ")
        results = results.sort(sortList);
    } else {
        results = results.sort("createdAt");
    }

    const products = await results;

    res.status(200).json({ products: products, nbHits: products.length });
};

export const getProductQuery = async (req: Request, res: Response) => {
    try {
        let query: any = {};

        for (const key in req.query) {
            const value = req.query[key];

            if (typeof value != "string") {
                return res.status(400).json({ message: "No proper value  was provided" });
            }
            query[key] = { $regex: new RegExp(value, "i") };
        }

        if (Object.keys(query).length === 0) {
            return res.status(200).json({ result: query, nbHits: Object.keys(query).length });
        }

        const products = await ProductModel.find(query);
        res.status(200).json({ products, nbHits: products.length });
    } catch (err) {
        console.log(err);
    }
};
