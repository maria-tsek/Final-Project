import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  const { id: userId } = req.query;
  console.log("id", userId);
  if (req.method === "GET") {
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}
