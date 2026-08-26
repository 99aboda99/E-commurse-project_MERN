import express from "express";
import adminJWTValidate from "../middlewares/adminJWTValidate.js";
import type { ExtendedRequest } from "../types/ExtendedRequest.js";
import {
  getAllUsers,
  addNewAdmin,
  deleteUser,
  updateItems,
  createItem,
  deleteAdmin,
  getAllAdmins,
} from "../services/adminServices.js";

const router = express.Router();

//* Add new admins (only OWNER can Do this)
router.post(
  "/create",
  adminJWTValidate,
  async (request: ExtendedRequest, response) => {
    try {
      if (request.user.role !== "owner") {
        return response.status(403).send("Only OWNER can create admins");
      }
      const { firstName, lastName, email, password } = request.body;
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

//* Get all admins (only OWNER can Do this)
router.get(
  "/",
  adminJWTValidate,
  async (request: ExtendedRequest, response) => {
    try {
      if (request.user.role !== "owner") {
        return response.status(403).send("Only OWNER can get all admins");
      }
      const { data, statusCode } = await getAllAdmins();
      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong");
    }
  },
);

//* Delete admin by ID (only OWNER can Do this)
router.delete(
  "/:adminId",
  adminJWTValidate,
  async (request: ExtendedRequest, response) => {
    try {
      if (request.user.role !== "owner") {
        return response.status(403).send("Only OWNER can delete admins");
      }
      const { adminId } = request.params;
      if (!adminId || typeof adminId !== "string") {
        return response.status(400).json({ message: "Invalid admin ID" });
      }
      const { data, statusCode } = await deleteAdmin({ adminId });
      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong");
    }
  },
);

//* Get all users
router.get("/users", adminJWTValidate, async (request, response) => {
  try {
    const { data, statusCode } = await getAllUsers();
    response.status(statusCode).json(data);
  } catch {
    response.status(500).send("Something went wrong");
  }
});

//* Delete a user by ID
router.delete(
  "/users/:userId",
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

//* Create new products
router.post("/item", adminJWTValidate, async (request, response) => {
  try {
    const { title, image, price, stock } = request.body;
    if (!title || !image || !price || !stock) {
      return response.status(400).json("Missing required fields");
    }
    const { data, statusCode } = await createItem({
      title,
      image,
      price,
      stock,
    });
    response.status(statusCode).json(data);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});

//* Update items */
router.put("/item", adminJWTValidate, async (request, response) => {
  try {
    const { data, statusCode } = await updateItems(request.body);
    response.status(statusCode).json(data);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});
export default router;
