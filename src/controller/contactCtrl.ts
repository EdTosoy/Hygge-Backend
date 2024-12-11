import { IUser } from "@types";
import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { Contact } from "models";

export const getAllContacts: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { _id } = req.user;
      const allContacts = await Contact.find({ "contactOf.id": _id });
      res.json(allContacts);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const addContact: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { contactUserId, contactUsername, contactAvatar } = req.body;
      const { username, avatar, _id } = req.user;

      const isContactExist = await Contact.findOne({
        "contactInfo.userId": contactUserId,
        "contactOf.id": _id,
      });
      if (isContactExist) {
        res.status(400);
        throw new Error("Contact already exist");
      }
      const newContact = new Contact({
        contactInfo: {
          userId: contactUserId,
          username: contactUsername,
          avatar: contactAvatar,
        },
        contactOf: {
          username,
          avatar,
          id: _id,
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
