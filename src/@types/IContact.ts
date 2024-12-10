import { Document } from "mongoose";

export interface IContact extends Document {
  userId: string;
  username: string;
  avatar: string;
}
