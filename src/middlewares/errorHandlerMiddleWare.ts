import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "./customError";
import "express-async-errors";

const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ status: "failure", error: err });
};

export default errorHandler;
