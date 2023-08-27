import express from "express";
import { deleteUser, getAllUsers, singleUser, updateUserEmail, updateUserPassword, updateUsername } from "../controllers/admin";
import { authenticate, authorize } from "../middlewares/authentication";
const router = express.Router();

router.route("/get-all-users").get([authenticate,authorize('admin')],getAllUsers);
router.route("/find-user/:id").get([authenticate,authorize('admin')],singleUser);
router.route("/update-username").patch(updateUsername);
router.route("/update-email").patch(updateUserEmail);
router.route("/update-password").patch(updateUserPassword);
router.route("/delete-user").delete(deleteUser);

export default router;
