import express from "express";
import { login, register, getMyOrders } from "../services/userServices.js";
import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendedRequest } from "../types/ExtendedRequest.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { status, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(status).json(data);
  } catch (error) {
    console.error("User Route Error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { status, data } = await login({ email, password });
    res.status(status).json(data);
  } catch (error) {
    console.error("User Route Error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

router.get(
  "/my-orders",
  validateJWT,
  async (request: ExtendedRequest, response) => {
    try {
      const userId = request.user?._id;
      const { data, statusCode } = await getMyOrders({ userId });
      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong");
    }
  },
);

export default router;
