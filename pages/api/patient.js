// http://localhost:3001/api/patients?services=plastic-surgery&page=1

import axios from 'axios';

export default async function handler(req, res) {
    const { services } = req.query; 
  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/patients?services=${services}`, {
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