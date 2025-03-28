// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  images: {
    domains: ['nmw.prahwa.net', 'nmw-cms.vercel.app'], // Tambahkan domain tempat gambar di-host
    formats: ['image/webp'], // Pastikan format modern diaktifkan
  },
};

export default nextConfig;
