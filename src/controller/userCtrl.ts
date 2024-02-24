import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { GetPublicKeyOrSecret, Secret, VerifyErrors } from "jsonwebtoken";
import { User } from "models";
import { validateMongoDbId } from "utils";
import { generateRefreshToken, generateToken } from "config";

// Register A User
export const signUpUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { confirmPassword, password, email, username } = req.body;

    const findUser = await User.findOne({ email });
    if (password !== confirmPassword)
      throw new Error("Password does not match");

    if (!findUser) {
      const NewUser = await User.create({
        ...req.body,
        /// get the ID from email
        profileId: `h/${username}.2023029731`,
      });
      res.json(NewUser);
    } else {
      throw new Error("User already exists");
    }
  }
);

// Login A user
export const signInUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if user exists
    const findUser = await User.findOne({ email });
    if (findUser) {
      const isPasswordMatch = await findUser.isPasswordMatch(password);
      if (findUser && isPasswordMatch) {
        const refreshToken = generateRefreshToken(findUser._id);
        const updatedUser = await User.findByIdAndUpdate(
          findUser._id,
          {
            refreshToken,
          },
          { new: true }
        );
        const { _id, email, username, profileId, bio, avatar } = findUser;
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
          _id,
          email,
          username,
          profileId,
          bio,
          avatar,
          token: generateToken(findUser._id),
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("User not found");
    }
  }
);

// Update A user
export const updateAUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const { username, profileId, bio, avatar } = req.body;

      // check if user exists and update
      const updatedUser = await User.findOneAndUpdate(
        _id,
        {
          username,
          profileId,
          bio,
          avatar,
        },
        {
          new: true,
        }
      );

      res.json(updatedUser);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

//Logout User
export const logoutUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error("No Refresh Token in Cookies");

    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204);
    }
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
);

/// =================================================================================================
// Handle Refresh Token
export const refreshToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error("No Refresh Token in Cookies");

    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No User Found");
    const jwtSecret: Secret | GetPublicKeyOrSecret =
      process.env.JWT_SECRET || "defaultSecret";
    jwt.verify(
      refreshToken,
      jwtSecret,
      (err: VerifyErrors | null, decoded: any) => {
        if (err || user.id !== decoded.id) {
          throw new Error("Invalid Refresh Token");
        }
        const accessToken = generateToken(user.id);
        res.json({ accessToken });
      }
    );
  }
);

// Get All users
export const getAllUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

// Get A Single User
export const getAUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

// Block A user
export const blockUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const blockUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "User blocked successfully",
        blockUser,
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

// UnBlock A User
export const unblockUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const unBlockUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "User unblocked successfully",
        unBlockUser,
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

// Delete A Single User
export const deleteAUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      res.json(deletedUser);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

// disable user
