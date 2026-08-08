import express, { type Express } from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";

const app: Express = express();
const port: number = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo DB Connected"))
  .catch((error: any) => console.log("Mongo DB Connection error : ", error));

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
