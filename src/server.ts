import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import { notFound, errorHandler } from "./middleware";
import { dbConnect } from "./config";
import {
  authRouter,
  categoryRouter,
  postsRouter,
  messageRouter,
  contactsRouter,
} from "./routes";
import { setupSocketIO } from "./socket";

dotenv.config();

const startServer = async () => {
  await dbConnect();

  const app = express();
  const PORT = process.env.PORT || 8080;
  const server = createServer(app);
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true,
    },
  });

  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, my-custom-header"
    );
    next();
  });

  app.use("/api/user", authRouter);
  app.use("/api/posts", postsRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/messages", messageRouter);
  app.use("/api/contacts", contactsRouter);

  app.use(notFound);
  app.use(errorHandler);

  setupSocketIO(io);

  server.listen(PORT, () => {
    const HOST = process.env.HOST || "localhost";
    console.log(`Server is running on ${HOST}:${PORT}`);
    console.log(`Socket URL: http://${HOST}:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
