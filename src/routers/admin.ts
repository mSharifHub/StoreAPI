import express from "express";
import { deleteUser, getAllUsers, singleUser, updateUserEmail, updateUserPassword, updateUsername } from "../controllers/admin";
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(singleUser);
router.route("/update-username").patch(updateUsername);
router.route("/update-email").patch(updateUserEmail);
router.route("/update-password").patch(updateUserPassword);
router.route("/delete-user").delete(deleteUser);

export default router;
