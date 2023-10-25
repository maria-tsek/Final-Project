import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const place = await Place.findById(id);
      res.status(200).json(place);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}
