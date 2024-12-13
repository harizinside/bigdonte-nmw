// pages/api/sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

  // Pastikan fetch tersedia di server
  const fetch = (await import('node-fetch')).default;

  try {
    // Definisikan daftar API
    const apis = [
      { url: `${baseUrl}/service`, pathPrefix: '/layanan', nameKey: 'name' },
      { url: `${baseUrl}/promo`, pathPrefix: '/promo', nameKey: 'title' },
      { url: `${baseUrl}/article-new`, pathPrefix: '/artikel', nameKey: 'title' },
    ];

    const urls = [];

    // Loop untuk mengambil data dari masing-masing API
    for (const api of apis) {
      const response = await fetch(api.url);

      if (!response.ok) {
        console.error(`Gagal mengambil data dari ${api.url}`);
        continue; // Lewati jika respons tidak berhasil
      }

      const result = await response.json();
      const data = result.data || [];

      const apiUrls = data
        .filter((item) => item[api.nameKey] && typeof item[api.nameKey] === 'string')
        .map((item) => ({
          url: `${api.pathPrefix}/${encodeURIComponent(item[api.nameKey].replace(/\s+/g, '-').toLowerCase())}`,
          changefreq: 'daily',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        }));

      urls.push(...apiUrls);
    }

    if (urls.length === 0) {
      console.error('Tidak ada URL yang dihasilkan');
      res.status(404).send('Sitemap tidak ditemukan');
      return;
    }

    // Buat sitemap XML
    const stream = new SitemapStream({ hostname: mainUrl });
    const readable = Readable.from(urls);

    readable.pipe(stream);

    const xml = await streamToPromise(stream).then((data) => data.toString());

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error saat membuat sitemap:', error);
    res.status(500).send('Internal Server Error');
  }
}
