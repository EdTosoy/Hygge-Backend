import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "models";

export const authMiddleware: RequestHandler = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
          const user = await User.findById(decoded.id);
          req.user = user;
          next();
        }
      } catch (error) {
        throw new Error("Not Authorized token expired, Please login again");
      }
    } else {
      throw new Error("There is no token found in headers");
    }
  }
);

export const isAdmin: RequestHandler = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { email } = req.user;

    const adminUser = await User.findOne({ email });

    if (adminUser?.role !== "admin") {
      throw new Error("Not Authorized as an Admin");
    } else {
      next();
    }
  }
);
