import express from "express";
const router = express.Router();
import { user } from "../models/User.js";
import verify from "../verifyToken.js";
import bcrypt from "bcrypt";

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
    }

    try {
      const updatedUser = await user.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(401).send("You can only update your own account!");
  }
});

router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await user.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted!");
    } catch (error) {
      res.status(401).send(error);
    }
  } else {
    res.status(403).send("You can only delete your own account!");
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const findUser = await user.findById(req.params.id);
    const { password, ...otherInfo } = findUser._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    res.status(401).json(error);
  }
});

router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await user.find().sort({ _id: -1 }).limit(5)
        : await user.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

// States of users

router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await user.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

// This $set: req.body, updates all the fields present into the req.body document and keep the rest of the properties in the db unchanges.

// {
//     "username":"Saurabh Ghodke",
//     "password":"Mike"
// }
