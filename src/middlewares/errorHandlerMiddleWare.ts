import { Request, Response, NextFunction } from "express";

const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: `Something went wrong,Please try again\nError: ${err}` });
};

export default errorHandler;
