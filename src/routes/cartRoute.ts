import express from "express";
import { getActiveCartForUser } from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";
import { type ExtendedRequest } from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: "Error fetching cart", error });
  }
});

export default router;
