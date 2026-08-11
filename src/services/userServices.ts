import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  return { data: generateJWT({firstName: newUser.firstName, lastName: newUser.lastName, email}), status: 201 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Invalid email or password", status: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return { data: generateJWT({firstName: findUser.firstName, lastName: findUser.lastName, email}), status: 200 };
  }

  return { data: "Invalid email or password", status: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "XuFgxZy4ORSICQEaWfWXvbM/1IZp20EQfsXPZG7M9rw=");
};
