import express, { Router } from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controller";
import { authMiddleware } from "../middleware";

export const categoryRouter: Router = express.Router();

// GET REQUESTS
categoryRouter.get("/all-categories", getAllCategories);

// POST REQUESTS
categoryRouter.post("/create-category", authMiddleware, createCategory);

// DELETE REQUESTS
categoryRouter.delete("/:id", deleteCategory);
