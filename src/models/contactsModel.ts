import mongoose, { Schema } from "mongoose";
import { IContact } from "@types";

// Declare the Schema of the Mongo model
const contactSchema: Schema<IContact> = new Schema(
  {
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
  {
    timestamps: true,
  }
);

//Export the model
export const Contact = mongoose.model<IContact>("Contact", contactSchema);
