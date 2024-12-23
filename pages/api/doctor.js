import axios from 'axios';

export default async function handler(req, res) {
  const baseUrl = 'https://nmw.prahwa.net/api/doctors';
  const { page = 1, per_page = 8 } = req.query;
  
  try {
    const response = await axios.get(`${baseUrl}?page=${page}&per_page=${per_page}`);
    
    if (response.status === 200) {
      const doctorsData = response.data;
      res.status(200).json({
        data: doctorsData.data || [],
        meta: doctorsData.meta || {},
      });
    } else {
      res.status(response.status).json({
        error: 'Failed to fetch data',
      });
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
