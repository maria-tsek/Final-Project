import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await Place.find({ type: "other" });
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }

  if (req.method === "POST") {
    const { destinationId, userId, action } = req.body;
    console.log("destinationId", destinationId);
    console.log("userId", userId);
    console.log("action", action);
    try {
      const user = await User.findOne({ _id: userId });

      if (user) {
        if (action === "add") {
          user.favoritePlaces.push(destinationId);
        } else if (action === "remove") {
          user.favoritePlaces = user.favoritePlaces.filter(
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
  }
}
