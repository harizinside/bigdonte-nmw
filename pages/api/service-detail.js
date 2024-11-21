import axios from 'axios';

export default async function handler(req, res) {
    const { id } = req.query; // Ambil ID dari query parameter
    if (!id) {
        return res.status(400).json({ error: 'ID artikel tidak disediakan' });
    }

    try {
        const response = await axios.get(`https://nmw.prahwa.net/api/services/${id}`);
        const articleDetail = response.data;
        res.status(200).json(articleDetail);
    } catch (error) {
        console.error('Error fetching article detail:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
