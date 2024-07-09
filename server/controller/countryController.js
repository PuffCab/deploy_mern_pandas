import CountryModel from "../models/countryModel.js";


export const getAllCountries = async(req, res) => {
  try {
    const countries = await CountryModel.find({}).populate("meals");
    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: error.message });
    res.status(500).json({ error: "Server Error" });
  }
}