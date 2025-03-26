import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/articles?page=all`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const promo = response.data;
    res.status(200).json(promo);
  } catch (error) {
    console.error('Error fetching promo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}