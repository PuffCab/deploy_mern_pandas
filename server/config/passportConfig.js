import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/userModel.js";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   secretOrKey:process.env.MYSECRET
  secretOrKey: "this is secret password that you should put in an .env file",
};

const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const user = await userModel.findOne({ _id: jwt_payload.sub });
    if (user) {
      return done(null, user);
    }
    if (!user) {
      return done(null, false);
      // or you could create a new account
    }
  } catch (error) {
    return done(error, false);
  }
});

export default passportStrategy;
