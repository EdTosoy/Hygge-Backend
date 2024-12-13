import { IUser } from "@types";
import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { Posts, User } from "models";

export const getAllPost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allPost = await Posts.find().sort({ createdAt: -1 });
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
      const { title, content, mediaUrl, userId, username, category } = req.body;
      const { avatar } = req.user;
      const newPost = new Posts({
        title,
        content,
        mediaUrl,
        userId,
        username,
        userAvatar: avatar,
        category,
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
      const { newTitle, newContent, newMediaUrl, postId, category } = req.body;
      const updatedPost = await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          title: newTitle,
          content: newContent,
          mediaUrl: newMediaUrl,
          category,
        },
        { new: true }
      );
      res.json(updatedPost);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const likePost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.body;
      const { _id } = req.user;

      const updatedPost = await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          $addToSet: { likes: req.user._id },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        _id,
        {
          $addToSet: { likes: postId },
        },
        { new: true }
      );
      res.json(updatedPost);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const unLikePost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.body;

      const updatedPost = await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      res.json(updatedPost);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const commentPost: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { postId, comment, date } = req.body;
      const user = req.user as IUser;

      const updatedPost = await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          $addToSet: {
            comments: {
              userId: user._id,
              username: user.username,
              userAvatar: user.avatar,
              date,
              comment,
            },
          },
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
