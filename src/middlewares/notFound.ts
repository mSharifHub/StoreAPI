import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => res.status(404).send("End point requested does not exist");

export default notFound;
