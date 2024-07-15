import express, { Router } from "express";
import { user } from "../models/User.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

// Register a user

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = new user({ username, email, password: hashedPassword });
  try {
    const User = newUser.save();
    res.status(200).json(User);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // This is the user that we are finding into the db
    const User = await user.findOne({ username: req.body.username });
    {
      !User && res.status(500).send("username or password is not correct!");
    }
    const validate = await bcrypt.compare(req.body.password, User.password);
    {
      !validate && res.status(500).send("username or password is not correct!");
    }

    const payload = {
      id: User._id,
      isAdmin: User.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    const { password, ...otherInfo } = User._doc;

    res.status(200).json({ ...otherInfo, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
