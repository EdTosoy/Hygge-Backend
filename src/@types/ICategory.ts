import { Document } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  creator: {
    username: string;
    avatar: string;
  };
  admin: String[];
  url: string;
  ionIconName: string;
}
