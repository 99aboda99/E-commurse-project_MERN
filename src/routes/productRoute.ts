import express from "express";
import { getAllProduct } from "../services/productServices.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProduct();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error });
  }
});

export default router;
