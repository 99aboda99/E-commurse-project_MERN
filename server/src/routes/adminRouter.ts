import express from "express";
import adminJWTValidate from "../middlewares/adminJWTValidate.js";
import type { ExtendedRequest } from "../types/ExtendedRequest.js";
import {
  getAllUsers,
  addNewAdmin,
  deleteUser,
  updateItems,
} from "../services/adminServices.js";

const router = express.Router();

/* Get all users */
router.get(
  "/users",
  adminJWTValidate,
  async (request: ExtendedRequest, response) => {
    try {
      const { data, statusCode } = await getAllUsers();
      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong");
    }
  },
);

/*Add new admins */
router.post(
  "/create",
  adminJWTValidate,
  async (request: ExtendedRequest, response) => {
    try {
      const { firstName, lastName, email, password } = request.body;
      if (!firstName || !lastName || !email || !password) {
        return response.status(400).json("Missing required fields");
      }
      const { data, statusCode } = await addNewAdmin({
        firstName,
        lastName,
        email,
        password,
      });

      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong");
    }
  },
);

/* Delete admin by ID (only OWNER can Do this) */

router.delete(
  "/:id",
  adminJWTValidate, async (request: ExtendedRequest, response) => {
    request.user.role === "OWNER"
      ? response.status(403).send("Only OWNER can delete admins")
      : response.status(200).send("Admin deleted successfully");
  }
);

/* Delete a user by ID */
router.delete(
  "/users/:id",
  adminJWTValidate,
  async (request: ExtendedRequest, response) => {
    try {
      const { userId } = request.params;
      if (!userId || typeof userId !== "string") {
        return response.status(400).json({ message: "Invalid user ID" });
      }
      const { data, statusCode } = await deleteUser({ userId });
      response.status(statusCode).json(data);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },
);

/* Update items */
router.put(
  "/item",
  adminJWTValidate,
  async (request: ExtendedRequest, response) => {
    try {
      const { data, statusCode } = await updateItems(request.body);
      response.status(statusCode).json(data);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },
);
export default router;
