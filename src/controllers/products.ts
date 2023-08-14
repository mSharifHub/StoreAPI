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

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { product } = req.body;

        const newProduct = new ProductModel(product);

        const savedInDataBase = await newProduct.save();

        if (savedInDataBase) {
            res.status(201).json({ created: true, product: savedInDataBase });
        } else {
            res.status(400).json({ created: false, message: "item not saved. check if all fields have been filled" });
        }
    } catch (err) {
        res.status(500).json({ message: `internal error\nerror:${err}\n` });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        // adding a new regular expression so the name can be case insensitive
        const regex = new RegExp(name, "i");

        // delete  name provided in the params
        const result = await ProductModel.deleteOne({ name: { $regex: regex } });

        if (result.deletedCount && result.deletedCount > 0) {
            res.status(200).json({ deleted: true, message: `operation successful` });
        } else {
            res.status(404).json({ deleted: false, message: `operation failed` });
        }
    } catch (err) {
        res.status(500).json({ message: `internal error\nerror:${err}\n` });
    }
};
