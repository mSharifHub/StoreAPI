import express from "express";
const router = express.Router();
import { auth, login, logout } from "../controllers/auth";

router.route("/register").post(auth);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
