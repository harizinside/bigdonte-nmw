import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://nmw.prahwa.net/api/type-of-services/1');
    const faq = response.data;
    res.status(200).json(faq);
  } catch (error) {
    console.error('Error fetching faq:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
