import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://nmw.prahwa.net/api/kebijakan?keyword=kebijakan');
    const kebijakan = response.data;
    res.status(200).json(kebijakan);
  } catch (error) {
    console.error('Error fetching kebijakan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}