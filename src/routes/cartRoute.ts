import express from "express";
import { addItemToCart, getActiveCartForUser } from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";
import { type ExtendedRequest } from "../types/ExtendedRequest.js";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: "Error fetching cart", error });
  }
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data)
  }

  catch(error) {
    res.status(500).send({message: "Can't fetch products", error})
  }
});

export default router;
