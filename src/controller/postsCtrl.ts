import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { Posts } from "models";

export const getAllPost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allPost = await Posts.find();
      res.json(allPost);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const createPost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { title, content, mediaUrl, userId, username } = req.body;
      const newPost = new Posts({
        title,
        content,
        mediaUrl,
        userId,
        username,
      });
      const savedPost = await newPost.save();
      res.json(savedPost);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const updatePost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { title, content, mediaUrl, postId } = req.body;
      const updatedPost = await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          title,
          content,
          mediaUrl,
        },
        { new: true }
      );
      res.json(updatedPost);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const deletePost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.body;
      await Posts.findByIdAndDelete({ _id: postId });
      res.json("Post deleted successfully");
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
