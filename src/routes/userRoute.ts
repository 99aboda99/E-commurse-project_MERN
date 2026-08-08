import express from "express";
import { login, register } from "../services/userServices.js";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const { status, data } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  response.status(status).send(data);
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { status, data } = await login({ email, password });
  response.status(status).send(data);
});

export default router;
