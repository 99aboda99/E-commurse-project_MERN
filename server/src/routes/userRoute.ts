import express from "express";
import { login, register } from "../services/userServices.js";

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

export default router;
