import { Document } from "mongoose";

export interface IContact extends Document {
  contactInfo: {
    userId: string;
    username: string;
    avatar: string;
  };
  contactOf: {
    username: string;
    avatar: string;
    id: string;
  };
}
