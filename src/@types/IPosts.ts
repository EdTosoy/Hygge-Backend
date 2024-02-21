import { Document, Schema } from "mongoose";

export interface IPosts extends Document {
  title: string;
  content: string;
  userId: Schema.Types.ObjectId;
  username: string;
  mediaUrl?: string;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
}
