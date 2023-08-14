import { Request, Response } from "express";
import "express-async-errors";
import ProductModel from "../models/products";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.query.page) || 1;

        const limit: number = Number(req.query.limit) || 10; // 10 items per page

        const skip = (page - 1) * limit;

        const products = await ProductModel.find({}).skip(skip).limit(limit);

        const nbHits = await ProductModel.countDocuments();

        res.status(200).json({ result: products, pages: Math.ceil(nbHits / limit) });
    } catch (err) {
        res.status(500).json({ message: `internal error\nerror:${err}\n` });
    }
};

export const getQueryProducts = async (req: Request, res: Response) => {
    try {
        let query: Record<string, any> = {};

        const { searchQuery } = req.query;

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
        }

        const pageNumber: number | undefined = Number(req.query.pageNumber) || 1;
        const limit: number | undefined = Number(req.query.limit) || 10;
        const skip = (pageNumber - 1) * limit;

        const products = await ProductModel.find(query).skip(skip).limit(limit);

        const nbHits = await ProductModel.countDocuments();

        res.status(200).json({ result: products, pages: nbHits });
    } catch (err) {
        res.status(500).json({ message: `internal error\nerror:${err}\n` });
    }
};

// export const getSortedProducts = async (req: Request, res: Response) => {
//     try {
//         const { sort, fields, numericFilters } = req.query;

//         const query: Record<string, any> = {};

//         if (numericFilters && typeof numericFilters === "string") {
//             const operatorMap: Record<string, string> = {
//                 ">": "$gt",
//                 ">=": "$gte",
//                 "=": "$eq",
//                 "<": "$lt",
//                 "<=": "$lte",
//             };

//             const options: string[] = ["price", "stock"];

//             numericFilters.split(",").forEach((option) => {
//                 const [field, operator, value] = option.split(/(>|>=|=|<|<=)/);

//                 if (options.includes(field)) {
//                     query[field] = { [operatorMap[operator]]: Number(value) };
//                 }
//             });
//         }

//         let results = ProductModel.find(query);

//         if (sort && typeof sort === "string") {
//             const sortedList: string = sort.split(",").join(" ");
//             results = results.sort(sortedList);
//         }

//         if (fields && typeof fields === "string") {
//             const fieldList: string = fields.split(",").join(" ");
//             results = results.select(fieldList);
//         }

//         if (!sort && !fields && !numericFilters) {
//             results = results.sort("createdAt");
//         }

//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 10;
//         const skip = (page - 1) * limit;

//         results = results.skip(skip).limit(limit);

//         const products = await results;

//         res.status(200).json({ products: products, nbHits: products.length });
//     } catch (err) {
//         res.status(500).json({ message: err });
//     }
// };

// export const getProductQuery = async (req: Request, res: Response) => {
//     try {
//         let query: any = {};

//         for (const key in req.query) {
//             const value = req.query[key];

//             if (typeof value != "string") {
//                 return res.status(400).json({ message: "No proper value  was provided" });
//             }
//             query[key] = { $regex: new RegExp(value, "i") };
//         }

//         if (Object.keys(query).length === 0) {
//             return res.status(200).json({ result: query, nbHits: Object.keys(query).length });
//         }

//         const products = await ProductModel.find(query);
//         res.status(200).json({ products, nbHits: products.length });
//     } catch (err) {
//         console.log(err);
//     }
// };
