import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Kebijakan.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function SyaratKetentuan() {
  const [kebijakans, setKebijakans] = useState([]); 
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/syarat`);
        const data = await response.json();
        if (Array.isArray(data)) { // Pastikan data adalah array
          setKebijakans(data); // Setel data array kebijakan
        } else {
          console.error("Invalid response data format:", data);
        }
      } catch (error) {
        console.error("Error fetching kebijakan:", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Syarat Ketentuan - NMW Aesthetic Clinic`,
      description: `Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda.`,
      url: `${mainUrl}/syarat-ketentuan`,
      publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
          "@type": "ImageObject",
          url: `${mainUrl}/images/term-condition.webp`
      }
      },
      mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}/syarat-ketentuan`
      },
      breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
              {
              "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `${mainUrl}`
              },
              {
              "@type": "ListItem",
              position: 2,
                  name: "Syarat & Ketentuan",
                  item: `${mainUrl}/syarat-ketentuan`
              }
          ]
      }
  };

  return (
    <>
      <Head>
          <title>Syarat & Ketentuan | NMW Aesthetic Clinic</title>
          <meta name="description" content="Berikut Syarat & Ketentuan untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content="Syarat & Ketentuan NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Berikut Syarat & Ketentuan untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/syarat-ketentuan`} />
          <meta property="og:image" content={`${mainUrl}/images/term-condition.webp`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Syarat & Ketentuan NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Berikut Syarat & Ketentuan untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={`${mainUrl}/images/term-condition.webp`} />

          <link rel="canonical" href={`${mainUrl}/syarat-ketentuan`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
      <div className={banner.banner}>
        <img
          src="/images/term-condition.webp"
          alt="Kebijakan Privasi NMW Aesthetic Clinic"
          loading="lazy"
        />
      </div>
      <div className={styles.container}>
        <div className={`${styles.heading_section}`}>
          <h1>
            <font>Syarat</font> & Ketentuan
          </h1>
        </div>
        <div className={styles.kebijakan_layout}>
          {kebijakans.map((item, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.syarat }} // Render HTML dari API
            />
          ))}
        </div>
      </div>
    </>
  );
}
