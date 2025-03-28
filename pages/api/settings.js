import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/settings`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const setting = response.data;
    res.status(200).json(setting);
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}