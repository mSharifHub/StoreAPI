import express from "express";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
app.use(express.json());
app.use(cookieParser(/*process.env.JWT_SECRET*/));
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

// const options: cors.CorsOptions ={
//     allowedHeaders:[
//         'Origin',
//         'X-Requested-Width',
//         'Content-Type',
//         "Accept",
//         'X-Access-Token',
//     ],
//     credentials:true,
//     methods:'GET,HEAD,OPTIONS,PUT.PATCH,POST,DELETE',
//     origin:

// }
app.use(cors());
app.use(addressEndPoints.productsAPI, productRouters);
app.use(addressEndPoints.authAPI, auhtRouters);
app.use(notFound);
app.use(errorHandler);

app.get("/", (_, res: Response) => {
    return res.send(`<h1>Store API Back End</h1>`);
});

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
