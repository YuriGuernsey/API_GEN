import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../../lib/db";

//@ts-ignore
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
//@ts-ignore
      const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: "7d" });
      res.status(200).json({ token });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
