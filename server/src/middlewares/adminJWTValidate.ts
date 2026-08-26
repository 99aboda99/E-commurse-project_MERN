import type { ExtendedRequest } from "../types/ExtendedRequest.js";
import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";

export const adminJWTValidate = async(
  request: ExtendedRequest,
  response: Response,
  next:NextFunction,
) => {
    const authorizationHeader = request.get("Authorization");

  if (!authorizationHeader) {
    response.status(403).send("Authorization Was Not Provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    response.status(403).send("Bearer Token Not Found");
    return;
  }

  jwt.verify(
    token,process.env.JWT_ADMIN_SECRET_KEY || "",
    async (err, payload) => {
      if (err) {
        response.status(403).send("Invalid token");
        return;
      }

      if (!payload) {
        response.status(403).send("Invalid token payload");
        return;
      }

      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };

      const admin = await adminModel.findOne({ email: userPayload.email });

      if (!admin) {
        response.status(403).send("Admin not found");
        return;
      }

      request.user = admin;
    next();
    },
  );
};

export default adminJWTValidate;
