import express from "express";
import { getAllCountries } from "../controller/countryController.js";
import JWTAuth from "../middleware/JWTAuth.js";

const router = express.Router();

router.get("/all", JWTAuth, getAllCountries);

export default router;
