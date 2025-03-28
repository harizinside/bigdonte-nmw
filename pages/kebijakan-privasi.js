import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Kebijakan.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Link from "next/link";

export default function KebijakanPrivasi() {
  const [legality, setLegality] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/legality`);
        const data = await response.json();
  
        // Ambil nilai privacyPolicy atau termsCondition (sesuai kebutuhan)
        setLegality(data.privacyPolicy || "Kebijakan privasi tidak tersedia.");
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
          url: `${mainUrl}/images/kebijakan-privasi.webp`
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
          <title>Kebijakan & Privasi | NMW Aesthetic Clinic</title>
          <meta name="description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content="Kebijakan Privasi NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/kebijakan-privasi`} />
          <meta property="og:image" content={`${mainUrl}/images/kebijakan-privasi.webp`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kebijakan Privasi NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={`${mainUrl}/images/kebijakan-privasi.webp`} />

          <link rel="canonical" href={`${mainUrl}/kebijakan-privasi`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
      <div className={banner.banner}>
        <Image priority width={800} height={800}
          src="/images/kebijakan-privasi.webp"
          alt="Kebijakan Privasi NMW Aesthetic Clinic"
        />
      </div>
      <div className={breadcrumb.breadcrumb}>
          <h5><Link href={'/'}>Home</Link> / <span><Link href={'/kebijakan-privasi'}>Kebijakan Privasi</Link></span></h5>
      </div>
      <h1 className={styles.heading_hide}>Selamat Datang di Halaman Kebijakan Privasi Pada Website NMW Aesthetic Clinic</h1>
      <div className={styles.container}>
        <div className={`${styles.heading_section}`}>
          <h2>
            <span>Kebijakan</span> Privasi
          </h2>
        </div>
        <div className={styles.kebijakan_layout}>
          {legality ? (
            <div dangerouslySetInnerHTML={{ __html: legality }} />
          ) : (
            <p>Memuat</p>
          )}
        </div>

      </div>
    </>
  );
}
