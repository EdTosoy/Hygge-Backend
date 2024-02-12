import express from "express";
import bodyParser from "body-parser";
const dotenv = require("dotenv").config();
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { notFound, errorHandler } from "./middleware";

import dbConnect from "./config/dbConnect";
import authRouter from "./routes/authRoute";

const app = express();

const PORT = process.env.PORT || 4000;

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
