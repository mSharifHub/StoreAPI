import express from "express";
const router = express.Router();
import { getAllProducts, getQueryProducts, createProduct } from "../controllers/products";

router.route("/").get(getAllProducts);
router.route("/query").get(getQueryProducts);
router.route("/create-product").post(createProduct);

export default router;
