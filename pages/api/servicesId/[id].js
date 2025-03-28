import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query; 
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/services/${id}`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const service = response.data;
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}