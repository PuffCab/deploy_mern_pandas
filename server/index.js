import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import colors from "colors";
import router from "./routes/testRoute.js";
import mealRouter from "./routes/mealsRouter.js";
import countryRouter from "./routes/countryRouter.js";
import userRouter from "./routes/userRouter.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";

dotenv.config();
const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passport.use(passportStrategy);
};

const startServer = () => {
  const port = process.env.port || 5002;
  app.listen(port, () => {
    console.log("server is running on ", port, " port");
  });
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/famous-meals", mealRouter);
  app.use("/api/countries", countryRouter);
  app.use("/api/users", userRouter);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Endpoint doesn't exist" });
  });
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connection with MongoDB established".bgGreen);
  } catch (error) {
    console.log("problems connecting to MongoDB".bgRed, error);
  }
};

//IIFE //we use it in order not to create a new instance of the function everytime our server starts again
(async function controller() {
  await DBConnection();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
