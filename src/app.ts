import express from "express";
import { Request, Response } from "express";
const app = express();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
import errorHandler from "./middlewares/errorHandlerMiddleWare";
import notFound from "./middlewares/notFound";
import { connect } from "./database/connection";
import productRouters from "./routers/products";



type Env = {
    PORT: string | number;
    IP: string | number;
    MONGO_URL: string;
};

interface EndPoints {
    productsAPI: string;
}

const addressEndPoints: EndPoints = {
    productsAPI: "/api/v1/products",
};

const env = process.env as Env;
const PORT = env.PORT || 3000;
const IP = env.IP!;
const MONGO_URL = env.MONGO_URL!;

app.get("/", (req: Request, res: Response) => {
    res.send(`<h1>Store API</h1> <a href = "/api/v1/products> Products Route</a>`);
});

app.use(addressEndPoints.productsAPI, productRouters);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connect(MONGO_URL);
        app.listen(PORT, () => console.log(`Listening to http://${IP}:${PORT}`));
    } catch (err) {}
};

start();
