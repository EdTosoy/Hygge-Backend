import jwt, { Secret } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateRefreshToken = (id: ObjectId) => {
  const secret: Secret = process.env.JWT_SECRET || "";
  return jwt.sign({ id }, secret, { expiresIn: "3d" });
};
