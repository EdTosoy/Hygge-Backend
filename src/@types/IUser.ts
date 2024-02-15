import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
  refreshToken: string;
  isPasswordMatch(enteredPassword: string): Promise<boolean>;
}
