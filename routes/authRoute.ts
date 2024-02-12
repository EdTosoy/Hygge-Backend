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

const router: Router = express.Router();

// GET REQUESTS
router.get("/all-users", getAllUser);
router.get("/refresh", refreshToken);
router.get("/logout", logoutUser);
router.get("/:id", authMiddleware, isAdmin, getAUser);

// POST REQUESTS
router.post("/register", createUser);
router.post("/login", loginUser);

// PUT REQUESTS
router.put("/edit-user", authMiddleware, updateAUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// DELETE REQUESTS
router.delete("/:id", deleteAUser);

export default router;
