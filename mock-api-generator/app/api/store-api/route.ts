// pages/api/store-api.ts
import { NextApiRequest, NextApiResponse } from 'next';
import {client} from '../../../lib/db'; // Your database connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { apiSpec } = req.body;

  if (!apiSpec) {
    return res.status(400).json({ error: 'API specification is required' });
  }



  // Insert the API spec into the database
  const apiId = uuidv4(); // Generate a unique ID for the API
  await client.run(
    'INSERT INTO apis (id, name, path, description) VALUES (?, ?, ?, ?)',
    [apiId, 'Dynamic API', '/api/dogs/age', apiSpec]  // Store the spec or modify as necessary
  );

  return res.status(201).json({ message: 'API confirmed and stored' });
}
