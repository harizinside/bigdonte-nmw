import axios from 'axios';

export default async function handler(req, res) {
    const { slug } = req.query; 
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/patients/${slug}`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });
    const patients = response.data;
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}