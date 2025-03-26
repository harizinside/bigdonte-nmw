import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const url = 'https://nmw-cms.vercel.app/api/subscribers';

  try {
    const response = await axios.post(
      url,
      JSON.stringify({ email }), // Kirim data sebagai JSON string
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error posting to API:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || 'An error occurred',
    });
  }
}
