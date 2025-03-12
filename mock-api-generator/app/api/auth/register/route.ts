import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {client} from '../../../../lib/db'; // Adjust path if necessary
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    // Attempt to connect to the database
  

  // Check if the user exists
    const res = await client.execute({sql:'SELECT * FROM users WHERE email = ?', args: [email]});
    const existingUser = res.rows[0]; // Get the first matching row (if any)
    console.log('Database query result:', existingUser);

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }


  console.log('Hashing the password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully:', hashedPassword);

    // Save the user to the database
    console.log('Saving new user to the database...');
    const userId = uuidv4();
    await client.execute({sql:'INSERT INTO users (id, email, password) VALUES (?, ?, ?)', args:[userId, email, hashedPassword]});
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "1d" });
    console.log('User saved successfully');

    return NextResponse.json({ message: "User created successfully", token});
} catch (err) {
    console.error('Error during user registration:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } 
}
