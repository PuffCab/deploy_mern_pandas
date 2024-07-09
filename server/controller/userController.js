import UserModel from "../models/userModel.js";
import { imageUpload } from "../utils/imageManagement.js";
import { encryptPassword, verifyPassword } from "../utils/passwordServices.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { generateToken } from "../utils/tokenServices.js";

const signup = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // 1. custom validation goes here
  if (!req.body.email || !req.body.password) {
    removeTempFile(req.file);
    res.status(400).json({ error: "Credentials missing" });
    return;
  }
  //2. Check if email is already in the database (if user exists)
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      removeTempFile(req.file);
      res.status(500).json({ error: "Email already registered" });
      return;
    }
    //3. If user doesn't exist :
    if (!existingUser) {
      //3.1 Encrypt user password (the one coming in the request)
      const encryptedPassword = await encryptPassword(req.body.password);
      if (!encryptedPassword) {
        console.log("error encrypting pasword");
        res.status(401).json({
          message: "error encrypting pasword",
        });
        return;
      }
      if (encryptedPassword) {
        //3.2 We store the user in our database
        //  const newUser = new UserModel(req.body);
        const newUser = new UserModel({
          email: req.body.email,
          password: encryptedPassword,
          username: req.body.username,
        });
        if (req.file) {
          const avatarURL = await imageUpload(req.file, "pandas_avatars");
          newUser.avatar = avatarURL;
        }

        await newUser.save();
        const userForFront = {
          email: newUser.email,
          username: newUser.username,
          _id: newUser._id,
          avatar: newUser.avatar,
        };
        res.status(200).json(userForFront);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
    // if (error.code === 11000) {
    //   res.status(500).json({ error: "Email already registered" });
    // } else {
    //   res.status(500).json({ error: "Server Error" });
    // }
  } finally {
    removeTempFile(req.file);
  }
};

const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    // const userToUpdate = await UserModel.findById(req.body.id);
    // userToUpdate.username = req.body.username;
    // await userToUpdate.save();
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body._id,
      { ...req.body },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  // console.log("login :>> ", req.body);

  //1. input validation (check that email is present and in the correct form ..., password format/lenght)

  //2. check if user exists in DB

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (!existingUser) {
      //If user doesn't exist, maybe user is not registered
      res.status(401).json({
        message: "email not registered",
      });
      return;
    }
    if (existingUser) {
      //3. If user Exists , we validate password
      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      console.log("isPasswordCorrect :>> ", isPasswordCorrect);

      //4. Generate Token

      const token = generateToken(existingUser._id);

      if (!token) {
        console.log("something went wrong generation the token");
        res.status(401).json({
          message: "problem generating token. Cannot login user",
        });
        return;
      }
      if (token) {
        //5. if token is created, we send response to client confirming the login
        res.status(200).json({
          message: "Login succesful",
          user: {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
            avatar: existingUser.avatar,
          },
          token,
        });
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(401).json({
      message: "something went wrong during login",
    });
  }
};

const getUserProfile = async (req, res) => {
  console.log("user profile function");
  console.log("req.user :>> ", req.user);

  if (req.user) {
    res.status(200).json({
      message: "user profile information",
      user: {
        email: req.user.email,
        username: req.user.username,
        avatar: req.user.avatar,
      },
    });
  }
};

export { signup, updateUser, login, getUserProfile };
