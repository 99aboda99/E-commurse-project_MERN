import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export interface ExtendedRequest extends Request {
    user?: any
}

const validateJWT = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization Was Not Provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Bearer Token Not Found");
    return;
  }

  jwt.verify(
    token,
    "XuFgxZy4ORSICQEaWfWXvbM/1IZp20EQfsXPZG7M9rw=",
    async (err, payload) => {
      if (err) {
        res.status(403).send("Invalid token");
        return;
      }

      if (!payload) {
        res.status(403).send("Invalid token payload");
        return;
      }

      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };

      const user = await userModel.findOne({ email: userPayload.email });

      if (!user) {
        res.status(403).send("User not found");
        return;
      }

      req.user = user;
      next();
    },
  );
};

export default validateJWT;
