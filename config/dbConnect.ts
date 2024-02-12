import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB Error");
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
