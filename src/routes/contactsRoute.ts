import express, { Router } from "express";
import { addContact, getAllContacts } from "controller";
import { authMiddleware } from "middleware";

export const contactsRouter: Router = express.Router();

// GET REQUESTS
contactsRouter.get("/all-contacts", authMiddleware, getAllContacts);

// POST REQUESTS
contactsRouter.post("/add-contact", authMiddleware, addContact);
