import express from "express";
const router = express.Router();
import { getAllProducts, getQueryProducts, createProduct, deleteProduct } from "../controllers/products";

router.route("/").get(getAllProducts);
router.route("/query").get(getQueryProducts);
router.route("/create-product").post(createProduct);
router.route("/delete-product").delete(deleteProduct);

export default router;
