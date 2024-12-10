import { IUser } from "@types";
import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { Contact } from "models";

export const getAllContacts: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // try {
    //   const allCategories = await Category.find();
    //   res.json(allCategories);
    // } catch (error) {
    //   throw new Error(String(error));
    // }
  }
);

export const addContact: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { contactUserId, contactUsername, contactAvatar } = req.body;
      const { username, avatar, id } = req.user;
      const newContact = new Contact({
        contactInfo: {
          userId: contactUserId,
          username: contactUsername,
          avatar: contactAvatar,
        },
        contactOf: {
          username,
          avatar,
          id,
        },
      });
      const saveMessage = await newContact.save();
      res.json(saveMessage);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const deleteContact: RequestHandler = asyncHandler(
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
