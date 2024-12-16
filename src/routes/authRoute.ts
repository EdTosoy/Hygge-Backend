import express, { Router } from "express";
import {
  signUpUser,
  signInUser,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unblockUser,
  logoutUser,
  refreshToken,
  savePost,
  unSavePost,
} from "../controller";
import { authMiddleware, isAdmin } from "../middleware";

export const authRouter: Router = express.Router();

// GET REQUESTS
authRouter.get("/all-users", getAllUser);
authRouter.get("/refresh", refreshToken);
authRouter.get("/logout", logoutUser);
// authRouter.get("/:id", authMiddleware, isAdmin, getAUser);
authRouter.get("/:id", authMiddleware, getAUser);

// POST REQUESTS
authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", signInUser);
authRouter.post("/save", authMiddleware, savePost);
authRouter.post("/unsave", authMiddleware, unSavePost);

// PUT REQUESTS
authRouter.put("/update-user", authMiddleware, updateAUser);
authRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
authRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// DELETE REQUESTS
authRouter.delete("/:id", deleteAUser);
