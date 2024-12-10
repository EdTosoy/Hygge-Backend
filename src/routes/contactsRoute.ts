import express, { Router } from "express";
import { addContact, deleteContact, getAllContacts } from "controller";
import { authMiddleware } from "middleware";

export const contactsRouter: Router = express.Router();

// GET REQUESTS
contactsRouter.get("/all-contacts", getAllContacts);

// POST REQUESTS
contactsRouter.post("/add-contact", authMiddleware, addContact);

// DELETE REQUESTS
contactsRouter.delete("/:id", deleteContact);
