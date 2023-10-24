import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
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
  { collection: "places" }
);

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
