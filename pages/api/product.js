// import axios from 'axios';

// export default async function handler(req, res) {
//   try {
//     const response = await axios.get(`https://nmw-cms.vercel.app/api/products`, {
//       headers: {
//         "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
//       },
//     });
//     const product = response.data;
//     res.status(200).json(product);
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

import axios from 'axios';

export default async function handler(req, res) {
    const { id } = req.query; // Pastikan mengambil query parameter dengan benar

    if (!id) {
        return res.status(400).json({ error: "Parameter 'id' diperlukan" });
    }

    try {
        const response = await axios.get(`https://nmw-cms.vercel.app/api/products?id=${id}`, {
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching serviceList:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'Internal server error',
        });
    }
}
