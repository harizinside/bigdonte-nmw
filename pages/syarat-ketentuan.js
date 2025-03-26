import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Kebijakan.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Link from "next/link";

export default function SyaratKetentuan() {
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
        setLegality(data.termsCondition || "Kebijakan privasi tidak tersedia.");
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
        <Image priority width={800} height={800}
          src="/images/term-condition.webp"
          alt="Kebijakan Privasi NMW Aesthetic Clinic"
        />
      </div>
      <div className={breadcrumb.breadcrumb}>
          <h5><Link href={'/'}>Home</Link> / <span><Link href={'/syarat-ketentuan'}>Syarat Ketentuan</Link></span></h5>
      </div>
      <h1 className={styles.heading_hide}>Selamat Datang di Halaman Kebijakan Privasi Pada Website NMW Aesthetic Clinic</h1>
      <div className={styles.container}>
        <div className={`${styles.heading_section}`}>
          <h2>
            <span>Syarat</span> & Ketentuan
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
