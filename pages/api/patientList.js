import axios from 'axios';

export default async function handler(req, res) {
    const { servicesType } = req.query; // Pastikan mengambil query parameter dengan benar

    if (!servicesType) {
        return res.status(400).json({ error: "Parameter 'servicesType' diperlukan" });
    }

    try {
        const response = await axios.get(`https://nmw-cms.vercel.app/api/patients?servicesType=${servicesType}`, {
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
