import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Kebijakan.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function KebijakanPrivasi() {
  const [kebijakans, setKebijakans] = useState([]); // Default sebagai array
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

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
        name: `Penghargaan - NMW Aesthetic Clinic`,
        description: `Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional`,
        url: `${mainUrl}/achievment`,
        publisher: {
        "@type": "Organization",
        name: "NMW Aesthetic Clinic",
        logo: {
            "@type": "ImageObject",
            url: `${mainUrl}/images/banner_award.png`
        }
        },
        mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${mainUrl}/achievment`
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
                    name: "Achievment",
                    item: `${mainUrl}/achievment`
                }
            ]
        }
    };

  return (
    <>
        <Head>
          <title>Penghargaan | NMW Aesthetic Clinic</title>
          <meta name="description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
          <meta name="keywords" content="pencapaian NMW Clinic, penghargaan klinik kecantikan, prestasi NMW Aesthetic Clinic, penghargaan layanan medis, pencapaian klinik estetika, inovasi medis, pengakuan industri kecantikan, sertifikasi kecantikan, penghargaan layanan terbaik, prestasi klinik kecantikan, penghargaan perawatan kulit, pencapaian layanan kesehatan, penghargaan dokter kecantikan, pengakuan klinik medis, pencapaian global NMW Clinic" />

          <meta property="og:title" content="Penghargaan NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/penghargaan`} />
          <meta property="og:image" content={`${mainUrl}/images/banner_award.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Penghargaan NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
          <meta name="twitter:image" content={`${mainUrl}/images/banner_award.png`} />

          <link rel="canonical" href={`${mainUrl}/penghargaan`} />

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
