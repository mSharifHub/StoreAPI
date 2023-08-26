import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "./customError";

const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    next();
};

export default errorHandler;
