import express from "express";
import {
  getUserProfile,
  login,
  signup,
  updateUser,
} from "../controller/userController.js";
import { multerUpload } from "../middleware/multer.js";
import JWTAuth from "../middleware/JWTAuth.js";

const router = express.Router();

router.post("/signup", multerUpload.single("avatar"), signup);
router.post("/login", login);
router.post("/update", updateUser);
router.get("/profile", JWTAuth, getUserProfile);

export default router;
