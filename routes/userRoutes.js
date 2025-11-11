import express from "express";
// eslint-disable-next-line import/extensions
import { signUp, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

export default router;
