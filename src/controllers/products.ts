import { Request, Response } from "express";
import "express-async-errors";
import ProductModel from "../models/products";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.query.page) || 1;

        const limit: number = Number(req.query.limit) || 10; // 10 items per page

        const skip = (page - 1) * limit;

        const products = await ProductModel.find({}).skip(skip).limit(limit);

        res.status(200).json({ result: products, nbHits: products.length });
    } catch (err) {
        res.status(500).json({ message: `internal error\nerror:${err}\n` });
    }
};

export const getQueryProducts = async (req: Request, res: Response) => {
    try {
        let query: Record<string, any> = {};

        const { searchQuery, numericFilter } = req.query;

        if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
            const searchNumber = parseFloat(searchQuery);

            // is is a number
            if (!isNaN(searchNumber)) {
                query = {
                    $or: [{ price: searchNumber }, { stock: searchNumber }],
                };
            } else {
                // this variable is needed to match the string with mongoDb for pattern matching
                const regex = new RegExp(searchQuery, "i");

                query = {
                    $or: [
                        { name: { $regex: regex } },
                        { vendors: { $regex: regex } },
                        { description: { $regex: regex } },
                        { category: { $regex: regex } },
                    ],
                };
            }
        } else if (numericFilter && typeof numericFilter === "string") {
            const operatorMap: Record<string, string> = {
                ">": "$gt",
                ">=": "$gte",
                "=": "$eq",
                "<": "$lt",
                "<=": "$lte",
            };

            const filters = numericFilter.replace(/(>|>=|=|<|<=)/g, (match) => `-${operatorMap[match]}-`);

            filters.split(",").forEach((filter) => {
                const [field, operator, value] = filter.split("-");
                if (operator) {
                    query[field] = { [operator]: Number(value) };
                }
            });
        }

        const pageNumber: number | undefined = Number(req.query.pageNumber) || 1;
        const limit: number | undefined = Number(req.query.limit) || 10;
        const skip = (pageNumber - 1) * limit;

        const products = await ProductModel.find(query).skip(skip).limit(limit);

        res.status(200).json({ result: products, nbHits: products.length });
    } catch (err) {
        res.status(500).json({ message: `internal error\nerror:${err}\n` });
    }
};
