import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import db from "../../../lib/db"; // Adjust the path if necessary

export async function POST(req: Request) {
  const { apiName, apiSchema } = await req.json();

  // Check if the API name already exists
  const existingApi = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM apis WHERE name = ?", [apiName], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });

  if (existingApi) {
    return NextResponse.json({ error: "API name already exists." }, { status: 400 });
  }

  // Generate a unique API key
  const apiKey = uuidv4();
  const apiEndpoint = `/api/${apiKey}`;

  // Insert the new API into the database
  await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO apis (name, schema, endpoint, api_key) VALUES (?, ?, ?, ?)",
      [apiName, apiSchema, apiEndpoint, apiKey],
      function (err) {
        if (err) reject(err);
        resolve(true);
      }
    );
  });

  // Return the API key to the frontend
  return NextResponse.json({ apiKey, message: "API created successfully." });
}
