import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Award.module.css";
import not from "@/styles/Not.module.css";
import banner from "@/styles/Banner.module.css";
import breadcrumb from "@/styles/Breadcrumb.module.css";
import { useState } from "react";

export default function Penghargaan({ achievments }) {
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [popupImage, setPopupImage] = useState("");

  const handleImageClick = (src) => {
    setPopupImage(src);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!achievments || achievments.length === 0) {
    return (
      <div className={`${not.box} ${not.box_flex}`}>
        <div className={`${styles.heading_section}`}>
          <h1><font>Penghargaan</font> Kami</h1>
        </div>
        <div className={not.content}>
          <img src="../images/not-found.webp" alt='Artikel Tidak Ditemukan' loading="lazy" />
          <span>Penghargaan Tidak Ditemukan</span>
        </div>
      </div>
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Penghargaan - NMW Aesthetic Clinic`,
    description: `Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional`,
    url: `${mainUrl}/penghargaan`,
    publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${mainUrl}/images/banner_award.webp`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}/penghargaan`
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
          name: "Penghargaan",
          item: `${mainUrl}/penghargaan`
        }
      ]
    }
  };

  return (
    <div>
      <Head>
        <title>Penghargaan | NMW Aesthetic Clinic</title>
        <meta name="description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
        <meta name="keywords" content="pencapaian NMW Clinic, penghargaan klinik kecantikan, prestasi NMW Aesthetic Clinic, penghargaan layanan medis, pencapaian klinik estetika, inovasi medis, pengakuan industri kecantikan, sertifikasi kecantikan, penghargaan layanan terbaik, prestasi klinik kecantikan, penghargaan perawatan kulit, pencapaian layanan kesehatan, penghargaan dokter kecantikan, pengakuan klinik medis, pencapaian global NMW Clinic" />

        <meta property="og:title" content="Penghargaan NMW Aesthetic Clinic"  />
        <meta property="og:description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/penghargaan`} />
        <meta property="og:image" content={`${mainUrl}/images/banner_award.webp`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Penghargaan NMW Aesthetic Clinic" />
        <meta name="twitter:description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
        <meta name="twitter:image" content={`${mainUrl}/images/banner_award.webp`} />

        <link rel="canonical" href={`${mainUrl}/penghargaan`} />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Head>
      <div className={banner.banner}>
        <Image priority width={800} height={800} src="/images/banner_award.webp" alt="Layanan Nmw Aesthetic Clinic"/>
      </div>
      <div className={breadcrumb.breadcrumb}>
        <h5><Link href={'/'}>Home</Link> / <span><Link href={'/penghargaan'}>Penghargaan</Link></span></h5>
      </div>
      <h1 className={styles.heading_hide}>Selamat Datang di Halaman Penghargaan Pada Website NMW Aesthetic Clinic</h1>
      <div className={styles.container}>
        <div className={`${styles.heading_section}`}>
          <h2><font>Penghargaan</font> Kami</h2>
        </div>
        <div className={styles.cabang_layout}>
          {achievments.map(achievment => (
            <div className={styles.cabang_box} key={achievment._id}>
              <div 
                className={styles.cabang_box_image} 
                onClick={() => handleImageClick(`${process.env.NEXT_PUBLIC_API_STORAGE_URL}/${achievment.image}`)}
                >
                <Image priority width={500} height={500} src={`${process.env.NEXT_PUBLIC_API_STORAGE_URL}/${achievment.image}`} alt={achievment.heading} />
              </div>
              <div className={styles.cabang_box_content}>
                <h3>{achievment.heading}</h3>
                <div className={styles.cabang_box_text}>
                  <p>{achievment.description}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Modal Popup */}
          {isOpen && (
            <div className={styles.modal}>
              <div className={styles.overlay_modal} onClick={closeModal}></div>
              <div className={styles.modal_content}>
                <span className={styles.close} onClick={closeModal}>&times;</span>
                <Image priority width={900} height={900} src={popupImage} alt="Popup Image" className={styles.popup_image} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  const response = await fetch(`${baseUrl}/achievment`);
  const data = await response.json();
  const achievments = data.achievements;

  return {
    props: {
      achievments,
    },
  };
}