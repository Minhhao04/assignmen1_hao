import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";

dotenv.config();
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://assignmen1-hao.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
