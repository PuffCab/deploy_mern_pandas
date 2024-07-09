import MealModel from "../models/mealModel.js";

const allMeals = async (req, res) => {
  console.log("req :>> ".bgYellow, req);
  try {
    const allMeals = await MealModel.find({});
    console.log("allMeals :>> ", allMeals);

    res.status(200).json({
      number: allMeals.length,
      allMeals,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

const mealsByCountryCode = async (req, res) => {
  //   console.log("req :>> ".yellow, req);
  const countryCode = req.params.countryCode;
  // const {countryCode}=req.params
  const likesNumber = Number(req.query.likes);
  console.log("likes :>> ", typeof likesNumber);
  console.log("countryCode :>> ", countryCode);
  if (likesNumber) {
    try {
      const allMeals = await MealModel.find({
        countryCode: countryCode,
        likes: { $gte: likesNumber },
      }).populate("country");

      if (allMeals.length === 0) {
        res.status(200).json({
          message: "no meals with this number of likes",
        });
        return;
      }
      console.log("allMeals :>> ", allMeals);
      res.status(200).json({
        number: allMeals.length,
        allMeals,
      });
    } catch (error) {
      res.status(400).json({
        message: "something went wrong",
      });
    }
  }
  if (!likesNumber) {
    try {
      const allMeals = await MealModel.find({ countryCode: countryCode }).populate("country");
      // console.log("allMeals :>> ", allMeals);

      res.status(200).json({
        number: allMeals.length,
        allMeals,
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(400).json({
        message: "something went wrong",
      });
    }
  }
};

export { allMeals, mealsByCountryCode };
