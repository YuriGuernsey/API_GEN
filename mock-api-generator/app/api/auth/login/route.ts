import bcrypt from "bcryptjs";
//@ts-ignore
import jwt from "jsonwebtoken";
import { client } from "../../../../lib/db"; // Assuming the client is set up properly
import { NextResponse } from 'next/server';
// POST request handler for user login
//@ts-ignore
export async function POST(req, res) {
  const { username, password } = await req.json(); // Parsing the request body as JSON

  try {
    // Execute the SQL query to find the user by username
    const result = await client.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });

    const user = result.rows[0]; // Get the first user row from the result

    // If no user found or password doesn't match, return error
    //@ts-ignore
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.SECRET_KEY, // Ensure SECRET_KEY is set in .env
      { expiresIn: "7d" }
    );

    // Send the token as a response
    return NextResponse.json({ token }, { status: 200 });
 
  } catch (error) {
    console.error("Error during authentication:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 
  }
}
