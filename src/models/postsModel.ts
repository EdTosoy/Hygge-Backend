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
    category: {
      type: String,
      required: true,
    },
    likes: {
      type: Array<string>,
      default: [],
    },
    comments: {
      type: Array<string>,
      default: [],
    },
    shares: {
      type: Array<string>,
      default: [],
    },
    userAvatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxsc1spde/image/upload/v1708760699/tiibc5hyfrfdluz0urkg.png",
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model<IPosts>("Posts", postsSchema);
