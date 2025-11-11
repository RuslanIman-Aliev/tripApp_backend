/* eslint-disable import/extensions */
import express from "express";
import { createTrip } from "../controllers/tripController.js";
import { createTourProgramm } from "../controllers/aiReqController.js";

const router = express.Router();

router.route("/").post(createTrip);
router.route("/:tripId/program").post(createTourProgramm);
export default router;
