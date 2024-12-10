import mongoose, { Schema } from "mongoose";
import { IMessage } from "@types";

// Declare the Schema of the Mongo model
const messagesSchema: Schema<IMessage> = new Schema(
  {
    messageFrom: {
      userId: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    messageTo: {
      userId: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export const Message = mongoose.model<IMessage>("Message", messagesSchema);
