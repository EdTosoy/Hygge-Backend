import mongoose, { Schema } from "mongoose";
import { ICategory } from "../@types";

// Declare the Schema of the Mongo model
const categorySchema: Schema<ICategory> = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    creator: {
      username: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    admin: {
      type: [String],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    ionIconName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export const Category = mongoose.model<ICategory>("Category", categorySchema);
