import express, { Router } from "express";
import {
  getAllPost,
  getAllUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "controller";

import { authMiddleware, isAuthorizedUser } from "middleware";

export const postsRouter: Router = express.Router();

// GET REQUESTS
postsRouter.get("/all-posts", getAllPost);
postsRouter.get("/user-posts", authMiddleware, getAllUserPosts);

// POST REQUESTS
postsRouter.post("/create-post", createPost);

// PUT REQUESTS
postsRouter.put("/update-post", authMiddleware, isAuthorizedUser, updatePost);

// DELETE REQUESTS
postsRouter.delete(
  "/delete-post/:postId",
  authMiddleware,
  isAuthorizedUser,
  deletePost
);
