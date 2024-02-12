import jwt, { Secret } from "jsonwebtoken";

export const generateRefreshToken = (id: number) => {
  const secret: Secret = process.env.JWT_SECRET || "";
  return jwt.sign({ id }, secret, { expiresIn: "3d" });
};
