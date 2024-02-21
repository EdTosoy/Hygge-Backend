import mongoose, { Document, Schema, Model } from "mongoose";
import { IPosts } from "@types";

const postsSchema: Schema<IPosts> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model<IPosts>("Posts", postsSchema);
