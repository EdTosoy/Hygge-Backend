import { Document } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  isBlocked: boolean;
  refreshToken: string;
  isPasswordMatch(enteredPassword: string): Promise<boolean>;
}
