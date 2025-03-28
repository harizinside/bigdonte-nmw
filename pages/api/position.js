import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/position?page=all`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const position = response.data;
    res.status(200).json(position);
  } catch (error) {
    console.error('Error fetching position:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}