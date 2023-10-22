import dbConnect from "../../db/connect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  const dbconnected = await dbConnect();
  console.log("dbconnected", dbconnected);

  if (req.method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
      console.log("users", users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}
