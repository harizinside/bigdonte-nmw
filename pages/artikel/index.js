import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Kebijakan.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function KebijakanPrivasi() {
  const [kebijakans, setKebijakans] = useState([]); // Default sebagai array
  const [settings, setSettings] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/setting`);
            const data = await response.json();
            console.log('Fetched data:', data);  // Log the entire response

            if (data && data.social_media) {
                setSettings(data); // Set the entire response object to settings
            } else {
                console.error('No social_media data found:', data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    fetchData();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/kebijakan`);
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
      name: `Kebijakan Privasi - NMW Aesthetic Clinic`,
      description: `Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda.`,
      url: `${mainUrl}/kebijakan-privasi`,
      publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
          "@type": "ImageObject",
          url: `${mainUrl}/images/kebijakan-privasi.png`
      }
      },
      mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}/kebijakan-privasi`
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
                  name: "Kebijakan Privasi",
                  item: `${mainUrl}/kebijakan-privasi`
              }
          ]
      }
  };

  return (
    <>
        <Head>
          <title>Artikel | NMW Aesthetic Clinic</title>
          <meta name="description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
        <meta name="keywords" content="artikel kesehatan, tips kecantikan, perawatan kulit, bedah plastik, kesehatan kulit, estetika medis, perawatan wajah, tips kecantikan NMW, artikel kecantikan, perawatan medis, informasi kesehatan, prosedur kecantikan, artikel bedah plastik, konsultasi kecantikan, perawatan anti-aging, rejuvenasi kulit, solusi kecantikan, klinik estetika, perawatan rambut, tips kesehatan, panduan kecantikan" />

          <meta property="og:title" content="Artikel NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/artikel`} />
          <meta property="og:image" content={`${storageUrl}/${settings.logo}`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Artikel NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
          <meta name="twitter:image" content={`${storageUrl}/${settings.logo}`} />

          <link rel="canonical" href={`${mainUrl}/artikel`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
      <div className={banner.banner}>
        <img
          src="/images/kebijakan-privasi.png"
          alt="Kebijakan Privasi NMW Aesthetic Clinic"
        />
      </div>
      <div className={styles.container}>
        <div className={`${styles.heading_section}`}>
          <h1>
            <font>Kebijakan</font> Privasi
          </h1>
        </div>
        <div className={styles.kebijakan_layout}>
          {kebijakans.map((item, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.kebijakan }} // Render HTML dari API
            />
          ))}
        </div>
      </div>
    </>
  );
}
