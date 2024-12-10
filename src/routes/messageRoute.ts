import express, { Router } from "express";
import { createMessage, getAllMessages, deleteMessage } from "controller";
import { authMiddleware } from "middleware";

export const messageRouter: Router = express.Router();

// GET REQUESTS
messageRouter.get("/all-messages", getAllMessages);

// POST REQUESTS
messageRouter.post("/create-message", authMiddleware, createMessage);

// DELETE REQUESTS
messageRouter.delete("/:id", deleteMessage);
