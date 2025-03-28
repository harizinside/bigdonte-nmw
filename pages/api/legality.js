import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/legality`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const legality = response.data;
    res.status(200).json(legality);
  } catch (error) {
    console.error('Error fetching legality:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}