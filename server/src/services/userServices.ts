import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel.js";
import adminModel from "../models/adminModel.js";
import { generateAdminJWT } from "./adminServices.js";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return { data: "User already exists!", status: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return {
    data: generateJWT({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email,
      role: "user",
    }),
    status: 201,
  };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });
  const findAdmin = await adminModel.findOne({ email });

  if (findUser) {
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
      return {
        data: generateJWT({
          _id: findUser._id,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          email,
          role: "user",
        }),
        status: 200,
      };
    }
  } else if (findAdmin) {
    const passwordMatch = await bcrypt.compare(password, findAdmin.password);
    if (passwordMatch) {
      if (findAdmin.role === "owner") {
        return {
          data: generateAdminJWT({
            _id: findAdmin._id,
            firstName: findAdmin.firstName,
            lastName: findAdmin.lastName,
            email,
            role: "owner",
          }),
          status: 200,
        };
      }
      return {
        data: generateAdminJWT({
          _id: findAdmin._id,
          firstName: findAdmin.firstName,
          lastName: findAdmin.lastName,
          email,
          role: "admin",
        }),
        status: 200,
      };
    }
  } else {
    return { data: "Invalid email or password", status: 400 };
  }

  return { data: "Invalid email or password", status: 400 };
};

interface GetMyOrdersParams {
  userId: string;
}

export const getMyOrders = async ({ userId }: GetMyOrdersParams) => {
  try {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
  } catch (error) {
    return { data: "Cannot get your orders" + error, statusCode: 400 };
  }
};

const generateJWT = (data: any) => {
  const secretKey = process.env.JWT_SECRET_KEY || "";
  return jwt.sign(data, secretKey);
};
