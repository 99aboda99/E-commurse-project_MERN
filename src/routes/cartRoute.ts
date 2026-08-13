import express from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemFromCart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";
import { type ExtendedRequest } from "../types/ExtendedRequest.js";

const router = express.Router();

//*Create a new cart
router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (error) {
    console.error("Cart Route Error:", error);
    res.status(500).send({ message: "Something went wrong", error });
  }
});

//*Clear cart
router.delete("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Cart Route Error:", error);
    res.status(500).send({ message: "Something went wrong", error });
  }
});

//*Add new items to current cart & create a new active cart if user doesn't have one
router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Cart Route Error:", error);
    res.status(500).send({ message: "Something went wrong", error });
  }
});

//*Update items in current cart
router.put("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Cart Route Error:", error);
    res.status(500).send({ message: "Something went wrong", error });
  }
});

//* Delete items from current cart
router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendedRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemFromCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong", error });
    }
  },
);

//* Create checkout

router.post("/checkout", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Cart Route Error:", error);
    res.status(500).send({ message: "Something went wrong", error });
  }
});
export default router;
