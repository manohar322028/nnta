import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import newsRoutes from "./routes/news.route.js";
import noticeRoutes from "./routes/notice.route.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import Connect from "connect-mongodb-session";
import session from "express-session";
import User from "./models/user.model.js";
import path from "path";

import bcryptjs from "bcryptjs";

import adminOptions from "./admin.options.js";

import * as url from "url";
import { appendFile } from "fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();

var database;

mongoose
  .connect(process.env.MONGO_URI)
  .then((x) => {
    database = x;
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

const ADMIN_USER = await User.findOne({ type: "admin" });

const authenticate = async (email, password) => {
  if (
    email === ADMIN_USER.username &&
    bcryptjs.compareSync(password, ADMIN_USER.password)
  ) {
    return Promise.resolve(ADMIN_USER);
  }
  return null;
};

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const start = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../client/public")));

  const admin = new AdminJS(adminOptions);
  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: process.env.SESSION_SECRET,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    console.log(
      `AdminJS started on http://localhost:3000${admin.options.rootPath}`
    );
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/news", newsRoutes);
  app.use("/api/notices", noticeRoutes);

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
  admin.watch();
};

start();
