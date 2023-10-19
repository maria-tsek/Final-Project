// pages/api/popular-places.js
import dbConnect from "../../db/connect";
import PopularPlace from "../../db/models/PopularPlace";

export default async function handler(req, res) {
  const dbconnected = await dbConnect();
  console.log("dbconnected", dbconnected);

  if (req.method === "GET") {
    try {
      const places = await PopularPlace.find();
      res.status(200).json(places);
      console.log("places", places);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}