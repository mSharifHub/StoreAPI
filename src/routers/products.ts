import express from "express";
const router = express.Router();
import { getProductQuery, getAllProducts } from "../controllers/products";

router.route("/").get(getAllProducts);
router.route("/query").get(getProductQuery);

export default router;
