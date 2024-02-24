import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Posts, User } from "models";

export const authMiddleware: RequestHandler = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authorizationToken = Boolean(
      req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer") &&
        req.headers.authorization.split(" ")[1]
    );
    const refreshToken = req.cookies.refreshToken;
    if (authorizationToken || refreshToken) {
      token = authorizationToken || refreshToken;
      try {
        if (token) {
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
          const user = await User.findById(decoded.id);
          if (!user) throw new Error("User not found");
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
export const isAuthorizedUser: RequestHandler = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { email } = req.user;
    const postId = req.body.postId || req.params.postId;

    const user = await User.findOne({ email });
    const post = await Posts.findById(postId);

    if (!user) {
      throw new Error("Not Authorized");
    }
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.userId.toString() !== user.id) {
      throw new Error("Not Authorized to manipulate this post");
    }

    next();
  }
);
