import express from "express";


const router = express.Router();

const middleware = (req, res, next) => {
  console.log("this is the middleware!!");
  next();
}

router.get("/test", middleware, (request, response) => {
  console.log("this is test controller");
  response.send({
    message: "this is a test route",
  });
});

router.post("/test", (req, res) => {
  console.log(req.body);
  res.send({ message: "this is a test POST route" })
})



export default router;



















// import { meals, countries } from "../data.js";
// import MealModel from "../models/mealModel.js";
// import CountryModel from "../models/countryModel.js";


// router.post("/addRaulDocs", async(_, res) => {
//   try {
//     const mealsPromised = meals.map((meal) => {
//       delete meal._id;
//       return MealModel.create({ ...meal });
//     });
//     await Promise.all(mealsPromised);
//     // await MealModel.create({ name: "test" });
//     res.status(200).json({ message: "meals should be added" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/addCountries", async(_, res) => {
//   try {
//     const countriesPromised = countries.map((country) => {
//       return CountryModel.create({ ...country });
//     })
//     await Promise.all(countriesPromised);
//     res.status(200).json({ message: "countries should be added" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// })


