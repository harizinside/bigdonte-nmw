import axios from 'axios';

export default async function handler(req, res) {
  try {
    const allDoctors = [];
    let currentPage = 1;
    let lastPage = 1;

    do {
      const response = await axios.get(`https://nmw.prahwa.net/api/branches?page=${currentPage}`);
      const data = response.data;

      // Tambahkan data dokter ke dalam array
      allDoctors.push(...data.data);

      // Update informasi halaman terakhir
      lastPage = data.meta.last_page;
      currentPage++;
    } while (currentPage <= lastPage);

    // Mengirimkan respons dengan format yang sesuai
    res.status(200).json({
      data: allDoctors,
      meta: {
        last_page: lastPage
      }
    });
  } catch (error) {
    console.error('Error fetching all doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
