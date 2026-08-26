import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import productModel from "../models/productModel.js";
import adminModel from "../models/adminModel.js";

export const seedInitialAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL or ADMIN_PASSWORD is not defined in environment variables",
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

interface AddNewAdminParams {
  firstName: string;
  lastName: string;
  email:string;
  password: string
}

export const addNewAdmin = async ({firstName, lastName, email, password}:AddNewAdminParams) => {
  const findAdmin = await adminModel.findOne({ email });
  if (findAdmin) {
    return { data: "Admin already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new adminModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
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
}

export const getAllUsers = async () => {
  const users = await userModel.find({ role: "user" }).select("-password");
  return { data: users, statusCode: 200 };
};

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

export const updateItems = async (items: any) => {
  const item = await productModel.findByIdAndUpdate(items._id, items);
  return { data: item, statusCode: 200 };
};

const generateAdminJWT = (data: any) => {
  const secretKey = process.env.JWT_ADMIN_SECRET_KEY || "";
  return jwt.sign(data, secretKey);
};
