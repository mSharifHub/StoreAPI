import express from "express";
import { Request, Response } from "express";
const app = express();
app.use(express.json());
import * as dotenv from "dotenv";
dotenv.config();
import errorHandler from "./middlewares/errorHandlerMiddleWare";
import notFound from "./middlewares/notFound";
import { connect } from "./database/connection";
import productRouters from "./routers/products";
import auhtRouters from "./routers/auth";
import { authenticator } from "./middlewares/authentication";

interface EndPoints {
    productsAPI: string;
    authAPI: string;
}

const addressEndPoints: EndPoints = {
    productsAPI: "/api/v1/products",
    authAPI: "/api/v1/",
};

const PORT = process.env.PORT || 3000;
const IP = process.env.IP!;
const MONGO_URL = process.env.MONGO_URL!;

app.get("/", (req: Request, res: Response) => {
    res.send(`<h1>Store API</h1> <a href = "/api/v1/products> Products Route</a>`);
});

app.use(addressEndPoints.productsAPI, authenticator, productRouters);
app.use(addressEndPoints.authAPI, auhtRouters);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connect(MONGO_URL);
        app.listen(PORT, () => console.log(`Listening to http://${IP}:${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start();

export default app;
