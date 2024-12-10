import { IUser } from "@types";
import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { Message } from "models";

export const getAllMessages: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // try {
    //   const allCategories = await Category.find();
    //   res.json(allCategories);
    // } catch (error) {
    //   throw new Error(String(error));
    // }
  }
);

export const createMessage: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { message, messageTo } = req.body;
      const { username, avatar, id } = req.user;
      const newMessage = new Message({
        messageFrom: {
          userId: id,
          username,
          avatar,
        },
        messageTo,
        message,
      });
      const saveMessage = await newMessage.save();
      res.json(saveMessage);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const deleteMessage: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // try {
    //   const { categoryId } = req.params;
    //   await Category.findByIdAndDelete({ _id: categoryId });
    //   res.json("Category deleted successfully");
    // } catch (error) {
    //   throw new Error(String(error));
    // }
  }
);
