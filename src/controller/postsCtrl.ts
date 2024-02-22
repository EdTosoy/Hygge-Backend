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

export const getAllUserPosts: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user;
    try {
      const allPost = await Posts.find({ userId: _id });
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
      const { newTitle, newContent, newMediaUrl, postId } = req.body;
      const updatedPost = await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          title: newTitle,
          content: newContent,
          mediaUrl: newMediaUrl,
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
      const { postId } = req.params;
      await Posts.findByIdAndDelete({ _id: postId });
      res.json("Post deleted successfully");
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
