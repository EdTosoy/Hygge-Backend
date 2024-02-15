import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { notFound, errorHandler } from "middleware";
import { dbConnect } from "config";
import { authRouter } from "routes";

dotenv.config();
dbConnect();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/user", authRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  const HOST = process.env.HOST || "localhost";
  console.log(`Server is running on ${HOST}:${PORT}`);
});
