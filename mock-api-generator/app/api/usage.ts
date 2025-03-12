import db from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query; // Assuming userId is passed in query params

    db.get("SELECT total_requests, remaining_requests FROM usage WHERE user_id = ?", [userId], (err, row) => {
      if (err) {
        console.error("Error fetching usage", err);
        return res.status(500).json({ error: "Error fetching usage" });
      }

      if (!row) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(row); // Returning the usage stats (total_requests, remaining_requests)
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
