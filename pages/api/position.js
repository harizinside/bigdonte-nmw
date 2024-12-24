import axios from 'axios';

export default async function handler(req, res) {
  const { position, per_page = 8, page = 1 } = req.query;

  try {
    const apiUrl = position
      ? `https://nmw.prahwa.net/api/position?position=${encodeURIComponent(position)}&per_page=${per_page}`
      : 'https://nmw.prahwa.net/api/position';

    const response = await axios.get(apiUrl);
    const doctor = response.data;

    res.status(200).json({
      data: doctor.data || [],
      meta: doctor.meta || {},
    });
    
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
