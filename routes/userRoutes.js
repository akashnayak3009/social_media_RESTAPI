import { getAllUser, login, signup } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/allUser", getAllUser);
router.post("/signup", signup);
router.post("/login", login);

export default router;
