import { signIn } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Sign-in page" });
  } else if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const result = await signIn("github", req.body);

      console.log("Sign-in result:", result);

      if (result.error) {
        res
          .status(400)
          .json({ error: `Authentication failed: ${result.error}` });
      } else {
        console.log("User signed in successfully");

        //  log the successful sign-in
        console.log(`User signed in with email: ${email}`);

        res.status(200).json({ message: "Sign-in successful" });
      }
    } catch (error) {
      res.status(500).json({ error: `Server error: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
