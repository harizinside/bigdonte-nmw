import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://nmw.prahwa.net/api/services');
    const service = response.data;
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
 