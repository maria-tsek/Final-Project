import mongoose from "mongoose";

const { Schema } = mongoose;

const popularPlaceSchema = new Schema(
  {
    name: { type: String, required: true },
    Header: { type: String, required: true },
    images: [
      {
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        image3: { type: String },
      },
    ],
    mapURL: { type: String, required: true },
    description: { type: String, required: true },
    favorite: { type: Boolean, default: false },
  },
  { collection: "popular_places" }
);

const PopularPlace =
  mongoose.models.PopularPlace ||
  mongoose.model("PopularPlace", popularPlaceSchema);

export default PopularPlace;
