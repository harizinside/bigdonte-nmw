import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://nmw.prahwa.net/api/subscribers');
    const achievment = response.data;
    res.status(200).json(achievment);
  } catch (error) {
    console.error('Error fetching achievment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
 