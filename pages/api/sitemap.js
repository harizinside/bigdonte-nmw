// pages/api/sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const fetch = (await import('node-fetch')).default;

  try {
    const apis = [
      { url: `${baseUrl}/article-new`, pathPrefix: '/artikel', nameKey: 'title' },
      { url: `${baseUrl}/service`, pathPrefix: '/layanan', nameKey: 'name' },
      { url: `${baseUrl}/promo`, pathPrefix: '/promo', nameKey: 'title' },
    ];

    const urls = [];

    // Tambahkan halaman statis
    const staticPages = [
      { url: '/', changefreq: 'weekly', priority: 1.0 },
      { url: '/faq', changefreq: 'monthly', priority: 0.8 },
      { url: '/dokter', changefreq: 'monthly', priority: 0.8 },
      { url: '/branches', changefreq: 'monthly', priority: 0.8 },
      { url: '/penghargaan', changefreq: 'monthly', priority: 0.8 },
      { url: '/katalog', changefreq: 'monthly', priority: 0.8 },
      { url: '/kebijakan-privasi', changefreq: 'monthly', priority: 0.8 },
      { url: '/syarat-ketentuan', changefreq: 'monthly', priority: 0.8 },
    ];
    urls.push(...staticPages);

    // Ambil data dari API dinamis
    for (const api of apis) {
      const response = await fetch(api.url);

      if (!response.ok) {
        console.error(`Gagal mengambil data dari ${api.url}`);
        continue;
      }

      const result = await response.json();
      const data = result.data || [];

      if (api.url === `${baseUrl}/article-new`) {
        if (data.articles) {
          const filteredArticles = data.articles.filter(article => article.status === true);
          const apiUrls = filteredArticles
            .filter((item) => item[api.nameKey] && typeof item[api.nameKey] === 'string')
            .map((item) => ({
              url: `${api.pathPrefix}/${encodeURIComponent(item[api.nameKey].replace(/\s+/g, '-').toLowerCase())}`,
              changefreq: 'daily',
              priority: 0.7,
              lastmod: new Date().toISOString(),
            }));

          urls.push(...apiUrls);
        }
      } else if (api.url === `${baseUrl}/service`) {
        if (data.services) {
          const servicesData = data.services;
          const apiUrls = servicesData
            .filter((item) => item[api.nameKey] && typeof item[api.nameKey] === 'string')
            .map((item) => ({
              url: `${api.pathPrefix}/${encodeURIComponent(item[api.nameKey].replace(/\s+/g, '-').toLowerCase())}`,
              changefreq: 'daily',
              priority: 0.7,
              lastmod: new Date().toISOString(),
            }));

          urls.push(...apiUrls);
        }
      } else if (api.url === `${baseUrl}/promo`) {
        if (data.promos) {
          const promosData = data.promos;
          const apiUrls = promosData
            .filter((item) => item[api.nameKey] && typeof item[api.nameKey] === 'string')
            .map((item) => ({
              url: `${api.pathPrefix}/${encodeURIComponent(item[api.nameKey].replace(/\s+/g, '-').toLowerCase())}`,
              changefreq: 'daily',
              priority: 0.7,
              lastmod: new Date().toISOString(),
            }));

          urls.push(...apiUrls);
        }
      }
    }

    if (urls.length === 0) {
      console.error('Tidak ada URL yang dihasilkan');
      res.status(404).send('Sitemap tidak ditemukan');
      return;
    }

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