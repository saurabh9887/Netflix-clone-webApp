import express from "express";
const router = express.Router();
import { list } from "../models/List.js";
import verify from "../verifyToken.js";

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new list(req.body);
    try {
      const savedList = await newList.save();
      res.status(200).json(savedList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).send("You are not authorised!");
  }
});

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await list.findByIdAndDelete(req.params.id);
      res.status(200).send("List has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).send("You are not authorized!");
  }
});

router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let List = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        List = await list.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        List = await list.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      List = await list.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(List);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
