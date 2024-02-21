import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

router.route("/:id").get(getSingleDoctor);
router.route("/").get(getAllDoctor);
router.route("/:id").put(authenticate, restrict(["doctor"]), updateDoctor);
router.route("/:id").delete(authenticate, restrict(["doctor"]), deleteDoctor);
router
  .route("/profile/me")
  .get(authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
