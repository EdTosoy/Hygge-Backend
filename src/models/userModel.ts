import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "@types";

// Declare the Schema of the Mongo model
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    refreshToken: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    profileId: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxsc1spde/image/upload/v1708760699/tiibc5hyfrfdluz0urkg.png",
    },
    wallpaper: {
      type: String,
      default:
        "https://res.cloudinary.com/dxsc1spde/image/upload/v1708773706/zjmgluhiyqh60cz2xges.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatch = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
export const User = mongoose.model<IUser>("User", userSchema);
