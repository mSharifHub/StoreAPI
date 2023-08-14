import express from "express";
const router = express.Router();
import { getAllProducts, getQueryProducts } from "../controllers/products";


router.route("/").get(getAllProducts)
router.route("/query").get(getQueryProducts)



export default router;
