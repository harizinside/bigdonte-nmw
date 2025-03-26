import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { page = 1, limit = 15, id_position } = req.query;
    let url = `https://nmw-cms.vercel.app/api/doctors?page=all`;

    if (id_position) {
      url += `&id_position=${id_position}`;
    }

    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });

    // Ambil total data dan balik urutan dari bawah ke atas
    let allDoctors = response.data.doctors || [];
    allDoctors.reverse(); // Urutkan dari bawah ke atas

    // Ambil total data dan filter sesuai pagination
    const totalDoctors = allDoctors.length;
    const paginatedDoctors = allDoctors.slice((page - 1) * limit, page * limit);

    res.status(200).json({ doctors: paginatedDoctors, totalDoctors });
  } catch (error) {
    console.error('❌ Error fetching doctors:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
