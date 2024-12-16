import { IUser } from "../@types";
import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { Category } from "../models";

export const getAllCategories: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allCategories = await Category.find();
      res.json(allCategories);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const createCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categoryName, url, ionIconName } = req.body;
      console.log(req.body);
      const { username, avatar, id } = req.user;
      const newCategory = new Category({
        categoryName,
        url: url,
        ionIconName: ionIconName,
        creator: {
          username,
          avatar,
        },
        admin: [id],
      });
      const saveCategory = await newCategory.save();
      res.json(saveCategory);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const deleteCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      await Category.findByIdAndDelete({ _id: categoryId });
      res.json("Category deleted successfully");
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
