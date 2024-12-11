import mongoose, { Schema } from "mongoose";
import { IContact } from "@types";

// Declare the Schema of the Mongo model
const contactSchema: Schema<IContact> = new Schema(
  {
    contactInfo: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    contactOf: {
      username: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export const Contact = mongoose.model<IContact>("Contact", contactSchema);
