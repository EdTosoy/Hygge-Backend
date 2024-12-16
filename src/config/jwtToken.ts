import jwt, { Secret } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateToken = (id: ObjectId) => {
  const secret: Secret = process.env.JWT_SECRET || "";
  if (!secret) {
    throw new Error("JWT secret is not defined.");
  }
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};
