import express from "express";
const router = express.Router();
import { movie } from "../models/Movie.js";
import verify from "../verifyToken.js";

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).send("You are not allowed!");
  }
});

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const updatedMovie = await movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } else {
    req.status(500).send("You are not allowed to make changes!");
  }
});

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await movie.findByIdAndDelete(req.params.id);
      res.status(200).send("Movie has been deleted!");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send("Your are not allowed to delete this movie!");
  }
});

router.get("/find/:id", verify, async (req, res) => {
  try {
    const movieGot = await movie.findById(req.params.id);
    res.status(200).json(movieGot);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let Movie;
  try {
    if (type === "series") {
      Movie = await movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      Movie = await movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(Movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const allMovies = await movie.find();
      res.status(200).json(allMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  } else res.status(500).send("You are not allowed!");
});

export default router;

// The aggregate function is used for complex data processing in MongoDB.
// It processes data through a pipeline consisting of multiple stages.
// Each stage performs specific operations such as filtering, grouping, sorting, and projecting data.
// Aggregation allows for powerful data transformations and computations, making it a vital tool for handling large datasets and complex queries in MongoDB.
