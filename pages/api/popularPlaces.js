// pages/api/popular-places.js
import dbConnect from "../../db/connect";
import PopularPlace from "../../db/models/popularPlaces";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await PopularPlace.find({});
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}
