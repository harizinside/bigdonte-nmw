import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  // Validasi jika ID tidak diberikan
  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const response = await axios.get(`https://nmw-cms.vercel.app/api/products${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
      },
    });

    const product = response.data;
    return res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Internal server error",
      details: error.response?.data || error.message,
    });
  }
}
