import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  const payload = {
    sub: userID,
    //   exp:123123123123123
  };

  const secretOrPrivateKey =
    "this is secret password that you should put in an .env file";
  const signOptions = {
    expiresIn: "2d",
  };

  const token = jwt.sign(payload, secretOrPrivateKey, signOptions);

  return token;
};

export { generateToken };
