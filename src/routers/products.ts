import express from "express";
const router = express.Router();
import { getProductQuery, getAllProducts, getSortedProducts } from "../controllers/products";

router.route("/").get(getAllProducts);
router.route("/query").get(getProductQuery);
router.route("/sorted").get(getSortedProducts);

export default router;
