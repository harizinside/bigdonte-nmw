import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Kebijakan.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/settings`);
  const settingsData = await response.json();

  return {
    props: {
      settings: settingsData.logo || null,
    },
  };
}

export default function KebijakanPrivasi({ settings }) {
  const [kebijakans, setKebijakans] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/kebijakan`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setKebijakans(data);
        } else {
          console.error("Invalid data format:", data);
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
    name: "Kebijakan Privasi - NMW Aesthetic Clinic",
    description: "Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic.",
    url: `${mainUrl}/kebijakan-privasi`,
    publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${mainUrl}/images/kebijakan-privasi.png`,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Artikel | NMW Aesthetic Clinic</title>
        <meta name="description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
        <meta property="og:title" content="Artikel | NMW Aesthetic Clinic" />
        <meta property="og:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/artikel`} />
        <meta property="og:image" content={settings ? `${storageUrl}/${settings}` : `${mainUrl}/images/kebijakan-privasi.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Artikel | NMW Aesthetic Clinic" />
        <meta name="twitter:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
        <meta name="twitter:image" content={settings ? `${storageUrl}/${settings}` : `${mainUrl}/images/kebijakan-privasi.png`} />
        <link rel="canonical" href={`${mainUrl}/Artikel`} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Head>

      <div className={banner.banner}>
        <img src="/images/kebijakan-privasi.png" alt="Kebijakan Privasi NMW Aesthetic Clinic" />
      </div>

      <div className={styles.container}>
        <div className={styles.heading_section}>
          <h1>
            <font>Kebijakan</font> Privasi
          </h1>
        </div>

        <div className={styles.kebijakan_layout}>
          {kebijakans.map((item, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: item.kebijakan }} />
          ))}
        </div>
      </div>
    </>
  );
}
