import axios from 'axios';
import FormData from 'form-data';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const url = 'https://nmw.prahwa.net/api/subscribers';

    try {
      // Buat instance FormData
      const formData = new FormData();
      formData.append('email', email);

      // Kirim data menggunakan axios
      const response = await axios.post(url, formData, {
        headers: {
          ...formData.getHeaders(), // Menggunakan header yang dihasilkan oleh FormData
        },
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(error.response ? error.response.status : 500).json({
        error: error.response?.data || 'An error occurred',
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
