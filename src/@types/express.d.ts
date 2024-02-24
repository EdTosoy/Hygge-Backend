import * as Express from "express";
import { IUser } from "./IUser";
declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
