import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import router from "./routes/authRoutes";
import productRoutes from "./routes/produtRoutes";
import orderRoutes from './routes/orderRoute';
import cors from "cors";

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*"
}));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Shopee API is running!", status: "ok" });
});


// Routes go here
app.use("/api/auth" , router);
app.use("/api/products" , productRoutes);
app.use("/api/order" , orderRoutes)


export default app;
