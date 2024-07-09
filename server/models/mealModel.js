import mongoose from "mongoose";

const { Schema } = mongoose;

const mealSchema = new Schema({
  name: { type: String, required: true, unique: true },
  country: { type: Schema.Types.ObjectId, ref: "country", required: true, unique: false },
  countryCode: { type: String, required: true, unique: false },
  likes: Number,
});

const MealModel = mongoose.model("meal", mealSchema);

export default MealModel;
