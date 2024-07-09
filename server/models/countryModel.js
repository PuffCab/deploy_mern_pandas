import mongoose from "mongoose";

const { Schema } = mongoose;

const countrySchema = new Schema({
  name: { type: String, required: true },
  countryCode: { type: String, required: true, unique: true },
  capital: { type: String, required: true },
  population: { type: String, required: true },
  meals: [{ type: Schema.Types.ObjectId, ref: "meal" }]
});
// }, { timestamps: true, collection: "" });

const CountryModel = mongoose.model("country", countrySchema);

export default CountryModel;