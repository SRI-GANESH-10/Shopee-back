import express from "express";
import { createOrder } from "../controllers/orderController";
import { protect } from "../config/protect";

const router = express.Router();

router.post("/", protect ,createOrder);

export default router;
