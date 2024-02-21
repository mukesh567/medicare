import express from "express";
import {
  getAllReviews,
  createReview,
} from "../controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllReviews);
router.route("/").post(authenticate, restrict(["patient"]), createReview);

export default router;
