import { Document } from "mongoose";

export interface IMessage extends Document {
  messageFrom: {
    userId: string;
    username: string;
    avatar: string;
  };
  messageTo: {
    userId: string;
    username: string;
    avatar: string;
  };
  message: string;
}
