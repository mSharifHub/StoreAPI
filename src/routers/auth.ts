import express from "express";
const router = express.Router();
import { auth, login, logout } from "../controllers/auth";
import { authenticate } from "../middlewares/authentication";

router.route("/register").post(auth);
router.route("/login").post(login);
router.route("/logout").post(authenticate,logout);

export default router;
