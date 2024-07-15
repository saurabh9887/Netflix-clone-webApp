import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import movieRoute from "./routes/movies.js";
import listRouter from "./routes/lists.js";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRouter);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
