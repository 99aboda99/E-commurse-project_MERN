import dotenv from "dotenv";

import express, { type Express } from "express";
import mongoose from "mongoose";

//* Import routers
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import adminRouter from "./routes/adminRoute.js";

import { seedInitialProducts } from "./services/productServices.js";

//* Import cors
import cors from "cors";
import { seedInitialAdmin } from "./services/adminServices.js";

dotenv.config();

const app: Express = express();
const port: number = 3001;

//* CORS configuration (Must be BEFORE routes)
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo DB Connected"))
  .catch((error: any) => console.log("Mongo DB Connection error : ", error));

//* Use Routers
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
//* admin router
app.use("/admin", adminRouter);

//* Seed Products To Database
seedInitialProducts();
seedInitialAdmin();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
