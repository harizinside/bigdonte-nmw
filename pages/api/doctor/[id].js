import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query; 
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/doctors/${id}`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const branch = response.data;
    res.status(200).json(branch);
  } catch (error) {
    console.error('Error fetching branch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}