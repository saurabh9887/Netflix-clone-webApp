import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    durationHr:{type:Number,required:true},
    durationMin:{type:Number,default:0},
    img: { type: String },
    titleImg: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    limit: { type: Number },
    year: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const movie = mongoose.model("Movie", movieSchema);
