import { Document } from "mongoose";

export interface IUser extends Document {
  bio: string;
  email: string;
  isBlocked: boolean;
  isPasswordMatch(enteredPassword: string): Promise<boolean>;
  password: string;
  profileId: string;
  refreshToken: string;
  role: string;
  username: string;
  avatar: string;
  wallpaper: string;
  savedPosts: string[];
}
