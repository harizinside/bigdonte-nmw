import axios from 'axios';

export default async function handler(req, res) {
    const { services } = req.query; 
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/servicesList?services=${services}`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const serviceList = response.data;
    res.status(200).json(serviceList);
  } catch (error) {
    console.error('Error fetching serviceList:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}