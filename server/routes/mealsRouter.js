import express from "express";
import MealModel from "../models/mealModel.js";
import { allMeals, mealsByCountryCode } from "../controller/mealsController.js";

const router = express.Router();

router.get("/all", allMeals);
router.get("/:countryCode", mealsByCountryCode);

export default router;
