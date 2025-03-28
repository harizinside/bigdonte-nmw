// import axios from 'axios';

// export default async function handler(req, res) {
//   const { page = 1 } = req.query; // Ambil halaman dari query parameter (default page 1)
  
//   try {
//     const response = await axios.get(`https://nmw.prahwa.net/api/articles`, {
//       params: {
//         page, // Kirimkan parameter halaman untuk pagination
//         per_page: 3 // Ambil 3 artikel per halaman
//       }
//     });
//     const article = response.data;
//     res.status(200).json(article); // Kembalikan artikel beserta data pagination
//   } catch (error) {
//     console.error('Error fetching article:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { page = 1, per_page = 3 } = req.query; // Ambil parameter dengan default values

    const response = await axios.get(`https://nmw-cms.vercel.app/api/articles`, {
      params: { page, per_page },
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error fetching articles:', error);

    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Internal server error',
    });
  }
}
