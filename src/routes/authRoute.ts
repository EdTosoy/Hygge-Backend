import express, { Router } from "express";
import {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unblockUser,
  logoutUser,
  refreshToken,
} from "controller";
import { authMiddleware, isAdmin } from "middleware";

export const authRouter: Router = express.Router();

// GET REQUESTS
authRouter.get("/all-users", getAllUser);
authRouter.get("/refresh", refreshToken);
authRouter.get("/logout", logoutUser);
authRouter.get("/:id", authMiddleware, isAdmin, getAUser);

// POST REQUESTS
authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);

// PUT REQUESTS
authRouter.put("/update-user", authMiddleware, updateAUser);
authRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
authRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// DELETE REQUESTS
authRouter.delete("/:id", deleteAUser);
