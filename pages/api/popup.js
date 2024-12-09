import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://nmw.prahwa.net/api/popups');
    const popups = response.data;
    res.status(200).json(popups);
  } catch (error) {
    console.error('Error fetching popups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
