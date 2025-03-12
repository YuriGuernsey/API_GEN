import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Send the user description to OpenAI to generate API specs
const generateApiFromOpenAI = async (description: string) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Generate API specifications for the following description: "${description}". Include the paths, methods (GET, POST, etc.), and expected parameters. Be concise.`,
        max_tokens: 300,
        temperature: 0.7,
        stop: ['\n'],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return null;
  }
};

// Handle the API generation flow
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { description, currentSpec } = req.body; // currentSpec is used for refinement

  // If description is provided, get API specs from OpenAI
  if (description) {
    const apiSpec = await generateApiFromOpenAI(description);

    if (!apiSpec) {
      return res.status(500).json({ error: 'Failed to generate API' });
    }

    // Store the API spec or send back to user for refinement
    return res.status(200).json({ apiSpec });
  }

  // If refining the previous API spec, show feedback for iteration
  if (currentSpec) {
    return res.status(200).json({
      apiSpec: `Refined version of your API based on your request: ${currentSpec}`,
    });
  }

  return res.status(400).json({ error: 'Description is required' });
}
