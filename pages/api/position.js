import axios from 'axios';

export default async function handler(req, res) {
  const { position } = req.query; // Membaca parameter query 'position'

  try {
    const apiUrl = position
      ? `https://nmw.prahwa.net/api/position?position=${encodeURIComponent(position)}`
      : 'https://nmw.prahwa.net/api/position';

    const response = await axios.get(apiUrl);
    const doctor = response.data;

    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
