import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import productModel, { type IProduct } from "../models/productModel.js";
import adminModel from "../models/adminModel.js";
/* ================================================================================ */

export const seedInitialAdmin = async () => {
  const email = process.env.OWNER_EMAIL;
  const password = process.env.OWNER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "OWNER_EMAIL or OWNER_PASSWORD is not defined in environment variables",
    );
  }

  const hashedAdminPassword = await bcrypt.hash(password, 10);

  const admin = {
    firstName: "Admin",
    lastName: "Admin",
    email,
    password: hashedAdminPassword,
    role: "owner" as const,
  };

  const adminExist = await adminModel.findOne({ role: "owner" });

  if (adminExist) return;

  const createdAdmin = await adminModel.create(admin);

  const token = jwt.sign(
    {
      _id: createdAdmin._id,
      email: createdAdmin.email,
      role: createdAdmin.role,
    },
    process.env.JWT_ADMIN_SECRET_KEY || "",
  );
};

//* Add new admin (only OWNER can do this)
interface AddNewAdminParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const addNewAdmin = async ({
  firstName,
  lastName,
  email,
  password,
}: AddNewAdminParams) => {
  if(!firstName || !lastName || !email || !password) {
    return{ data: "Missing required fields", statusCode: 400 }
  }
  const findAdmin = await adminModel.findOne({ email });
  if (findAdmin) {
    return { data: "Admin already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await adminModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: "admin",
  });
  await newAdmin.save();
  return {
    data: generateAdminJWT({
      _id: newAdmin._id,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      email,
    }),
    statusCode: 201,
  };
};

//* Delete admin by ID (only OWNER can do this)
export const deleteAdmin = async ({ adminId }: { adminId: string }) => {
  const deletedAdmin = await adminModel.findByIdAndDelete(adminId);
  if (!deletedAdmin) {
    return { statusCode: 404, data: "Admin not found" };
  }

  return { statusCode: 200, data: "Admin deleted successfully!" };
};

//* Get all admins (only OWNER can do this)
export const getAllAdmins = async () => {
  const admins = await adminModel.find({ role: "admin" }).select("-password");
  return { data: admins, statusCode: 200 };
};

//* Get all users
export const getAllUsers = async () => {
  const users = await userModel.find({ role: "user" }).select("-password");
  return { data: users, statusCode: 200 };
};

//* Delete user by ID
interface DeleteUserParams {
  userId: string;
}

export const deleteUser = async ({ userId }: DeleteUserParams) => {
  const deletedUser = await userModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    return { statusCode: 404, data: "User not found" };
  }

  return { statusCode: 200, data: "User deleted successfully!" };
};

interface CreateItemParams {
  title: string;
  price: number;
  stock: number;
  image: string;
}
export const createItem = async ({
  title,
  price,
  stock,
  image,
}: CreateItemParams) => {
  const existsProduct = await productModel.findOne({ title });
  if (existsProduct) {
    return { data: "This product already exists!", statusCode: 400 };
  }
  const product = await productModel.create({ title, image, price, stock });
  return { data: product, statusCode: 201 };
};

export const updateItems = async (items: any) => {
  const productId = items._id || items.id;
  if (!productId) {
    return { statusCode: 400, data: "Product ID (_id or id) is required" };
  }

  const item = await productModel.findByIdAndUpdate(productId, items, {
    new: true,
  });

  if (!item) {
    return { statusCode: 404, data: "Product not found" };
  }

  return { data: item, statusCode: 200 };
};

export const generateAdminJWT = (data: any) => {
  const secretKey = process.env.JWT_ADMIN_SECRET_KEY || "";
  return jwt.sign(data, secretKey);
};
