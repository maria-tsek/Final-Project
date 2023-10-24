import dbConnect from "../../db/connect";
import Place from "@/db/models/Place";
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await Place.find({ type: "popular" });
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}
