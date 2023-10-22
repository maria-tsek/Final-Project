import bcrypt from "bcrypt";
import dbConnect from "../../db/connect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashedPassword,
        name,
      });

      await user.save();

      res.status(200).json({ message: "Sign-up successful" });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Validation error", details: error.errors });
      }
      res.status(500).json({ error: "Sign-up failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
