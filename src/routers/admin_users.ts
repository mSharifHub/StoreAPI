import express from "express";
import {
    deleteUser,
    getAllUsers,
    singleUser,
    updateUserEmail,
    updateUserPassword,
    updateUsername,
} from "../controllers/admin_users";
import { authenticate, authorize } from "../middlewares/authentication";
const router = express.Router();

router.route("/get-all-users").get([authenticate, authorize("admin")], getAllUsers);
router.route("/find-user/:id").get([authenticate, authorize("admin")], singleUser);
router.route("/update-username").patch([authenticate, authorize("admin", "user")], updateUsername);
router.route("/update-email").patch([authenticate, authorize("admin", "user")], updateUserEmail);
router.route("/update-password").patch([authenticate, authorize("admin", "user")], updateUserPassword);
router.route("/delete-user").delete([authenticate,authorize("admin","user")],deleteUser);

export default router;
