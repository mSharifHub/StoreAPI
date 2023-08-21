import express from "express";
const router = express.Router();
import { auth, login } from "../controllers/auth";

router.route("/auth").post(auth);
router.route("/login").post(login);

export default router;
