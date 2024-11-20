import axios from 'axios';

export default async function handler(req, res) {
  const { page = 1 } = req.query; // Ambil halaman dari query parameter (default page 1)
  
  try {
    const response = await axios.get(`https://nmw.prahwa.net/api/articles`, {
      params: {
        page, // Kirimkan parameter halaman untuk pagination
        per_page: 3 // Ambil 3 artikel per halaman
      }
    });
    const article = response.data;
    res.status(200).json(article); // Kembalikan artikel beserta data pagination
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
