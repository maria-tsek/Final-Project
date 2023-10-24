import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const { userId } = req.query;

      const user = await User.findOne({ _id: userId });

      if (user) {
        res.status(200).json(user.favorites);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  } else if (req.method === "POST") {
    const { userId, destinationId, action } = req.body;

    try {
      await dbConnect();

      const user = await User.findOne({ _id: userId });

      if (user) {
        if (action === "add") {
          user.favorites.push(destinationId);
        } else if (action === "remove") {
          user.favorites = user.favorites.filter(
            (fav) => fav.toString() !== destinationId
          );
        }

        await user.save();

        res.status(200).json({ message: "Favorite destination updated." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.status(405).end();
  }
}
