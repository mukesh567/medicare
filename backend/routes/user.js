import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from "../controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.route("/:id").get(authenticate, restrict(["patient"]), getSingleUser);
router.route("/").get(authenticate, restrict(["admin"]), getAllUser);
router.route("/:id").put(authenticate, restrict(["patient"]), updateUser);
router.route("/:id").delete(authenticate, restrict(["patient"]), deleteUser);
router
  .route("/profile/me")
  .get(authenticate, restrict(["patient"]), getUserProfile);
router
  .route("/appointments/my-appointments")
  .get(authenticate, restrict(["patient"]), getMyAppointments);

export default router;
