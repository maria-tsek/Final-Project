import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import Place from "@/db/models/Place";
export default async function handler(req, res) {
  const { id: userId } = req.query;
  await dbConnect();
  console.log("id in Faavorites", userId);
  if (req.method === "GET") {
    try {
      const user = await User.findById(userId).populate("favoritePlaces");

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}
