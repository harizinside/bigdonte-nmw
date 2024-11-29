import axios from 'axios';

export default async function handler(req, res) {
    const { slug } = req.query; // Ambil ID dari query parameter
    if (!slug) {
        return res.status(400).json({ error: 'ID artikel tidak disediakan' });
    }

    try {
        const response = await axios.get(`https://nmw.prahwa.net/api/sub-type-of-services/${slug}`);
        const service = response.data;
        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
