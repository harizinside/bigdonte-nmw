import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from "next/link";
import loadingStyles from "@/styles/Loading.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Head from "next/head";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Image from "next/image";

export const getServerSideProps = async (context) => {
  const { slugServices, slug, slug_sc } = context.query;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

  const settings = await fetch(`${baseUrl}/settings`);
  const settingsData = await settings.json();

  const servicesType = await fetch(`${baseUrl}/serviceTypeDetail/${slug_sc}`);
  const servicesTypeData = await servicesType.json();

  const patients = await fetch(`${baseUrl}/patientList?servicesType=${slug_sc}`);
  const patientsData = await patients.json();

  return {
    props: {
      settings: settingsData,
      servicesType: servicesTypeData,
      patients: patientsData.patients,
    },
  };
};

export default function ServicesTypeDetail({ settings, servicesType, patients }) {
  const router = useRouter();
  const { slugServices, slug, slug_sc } = router.query;

  const formattedPhone = settings.phone?.startsWith("0")
  ? "62" + settings.phone.slice(1)
  : settings.phone;

  function formatText(text) {
    if (!text) return ""; 

      return text.replace(/-/g, ' ') 
                .replace(/\b\w/g, char => char.toUpperCase());
  }

  const formattedName = formatText(slugServices);
  const formattedSlug = formatText(slug);

  const cleanedDescription = servicesType?.description
  ? servicesType?.description.replace(/<\/?p>/g, "")
  : "Deskripsi tidak tersedia.";

  const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${servicesType.name} - NMW Aesthetic Clinic`,
      description: `${servicesType.description}`,
      url: `${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}/${servicesType.slug}`,
      publisher: {
        "@type": "Organization",
        name: "NMW Aesthetic Clinic",
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_API_STORAGE_URL}/${settings.logo}`
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}/${servicesType.slug}`
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: `${process.env.NEXT_PUBLIC_API_MAIN_URL}`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Layanan",
            item: `${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${formattedName}`,
            item:  `${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}`
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${formattedSlug}`,
            item: `${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}`
          },
          {
            "@type": "ListItem",
            position: 5,
            name: `${servicesType.name}`,
            item: `${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}/${servicesType.slug}`
          }
        ]
      }
  };

  return (
    <div>
      <Head>
        <title>{servicesType.name ? `${servicesType.name}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
        <meta name="description" content={servicesType.description ? `${servicesType.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesType.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
        <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

        <meta property="og:title" content={servicesType.name ? `${servicesType.name}` : `Layanan NMW Aesthetic Clinic`}   />
        <meta property="og:description" content={servicesType.description ? `${servicesType.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesType.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}/${servicesType.slug}`} />
        <meta property="og:image" content={servicesType.image ? `${process.env.NEXT_PUBLIC_API_STORAGE_URL}/${servicesType.image}` : `${process.env.NEXT_PUBLIC_API_MAIN_URL}/images/logo.svg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={servicesType.name ? `${servicesType.name}` : `Layanan NMW Aesthetic Clinic`}  />
        <meta name="twitter:description" content={servicesType.description ? `${servicesType.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesType.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
        <meta name="twitter:image" content={servicesType.image ? `${process.env.NEXT_PUBLIC_API_STORAGE_URL}/${servicesType.image}` : `${process.env.NEXT_PUBLIC_API_MAIN_URL}/images/logo.svg`} />

        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}/${servicesType.slug}`} />

        <script type="application/ld+json">
        {JSON.stringify(schemaData)}
        </script>
      </Head>
      <div className={banner.banner}>
        <Image 
          priority
          width={800}
          height={800}
          src={`${process.env.NEXT_PUBLIC_API_STORAGE_URL}/${servicesType.image}`}
          alt={servicesType.title || "Banner image"}
        />
      </div>
      <div className={breadcrumb.breadcrumb}>
        <h5><Link href={'/'}>Home</Link> / <Link href={`${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan`}>Layanan</Link> / <Link href={`${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}`}>{formattedName}</Link> / <Link href={`${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}`}>{formattedSlug}</Link> / <span><Link href={`${process.env.NEXT_PUBLIC_API_MAIN_URL}/layanan/${slugServices}/${slug}/${servicesType.slug}`}>Pasien {servicesType.name}</Link></span></h5>
      </div>
      {/* Section 1 */}
      <div className={`${styles.section_1} ${styles.section_1_sc}`}>
        <div className={styles.section_1_heading}>
          <h1>
            {servicesType.name.split(" ")[0]}{" "}
            <font>{servicesType.name.split(" ").slice(1).join(" ")}</font>
          </h1>
        </div>
        <div className={styles.section_1_content}>
          <div
            className={styles.service_description}
            dangerouslySetInnerHTML={{
              __html: cleanedDescription,
            }}
          />
          <Link
            href={`https://api.whatsapp.com/send?phone=${formattedPhone}`}
            target="_blank"
          >
            <button className={styles.btn_layanan}>
              Buat Janji Temu Sekarang <FaWhatsapp />
            </button>
          </Link>
        </div>
      </div>

      <div className={`${styles.section_2} ${styles.section_2_sc}`}> 
        <div className={`${styles.heading_section}`}> 
          <h2>Pasien {servicesType.name.split(" ")[0]}{" "}
          <span>{servicesType.name.split(" ").slice(1).join(" ")}</span></h2>
        </div>
        <div className={styles.box_galeri_layout}>
          {patients.length > 0 ? (
            patients.map((galeriPatient) => (
              <div className={styles.box_galeri} key={galeriPatient._id}>
                {/* Image Section */}
                <div className={styles.box_galeri_image}>
                  <Image
                    priority
                    width={800}
                    height={800}
                    src={`${process.env.NEXT_PUBLIC_API_STORAGE_URL}/${galeriPatient.image}`}
                    alt={galeriPatient.name || "Galeri Image"}
                  />
                  <div className={styles.button_image}> 
                    <button type="button">Sebelum</button>
                    <button type="button">Sesudah</button>
                  </div>
                </div>

                {/* Content Section */}
                <div className={styles.box_galeri_content}>
                  <div className={styles.box_galeri_heading}>
                    <h3>{galeriPatient.name || "Nama Tidak Tersedia"}</h3>
                  </div>
                  <div className={styles.box_galeri_text}>
                    <p>{galeriPatient.description.replace(/<\/?p>/g, "")}</p>
                  </div>
                </div>

                {/* Button Section */}
                <div className={styles.box_galeri_button}>
                  <Link href={`/layanan/${slugServices}/${slug}/${slug_sc}/${galeriPatient.slug}`}>
                    <button type="button">
                      Lihat Gambar {galeriPatient.name || "Galeri"}
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.empty}>
              <img src="../../../images/data_empty.webp" loading="lazy"/>
              <h1>Gambar Segera Hadir</h1>
            </div>
          )}
        </div>
      </div>
      <div className={styles.section_4}>
        <div className={styles.heading_section_4}>
          <div
            className={`${styles.heading_section} ${styles.heading_section_start}`}
          >
            <h2>
              <span>Dokter </span>
              Kami
            </h2>
          </div>
        </div>
        <div className={styles.section_4_box}>
          <img
            src="/images/dokter_layanan.webp"
            alt="Dokter-dokter NMW Aesthetic Clinic"
            className={styles.our_dokter}
            loading="lazy"
          />
          <img
            src="/images/nmw_bg.webp"
            alt="Background Dokter"
            className={styles.bg_our_dokter}
            loading="lazy"
          />
          <div className={styles.section_4_content}>
            <p>
              Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara
              profesional, dan terpercaya untuk melakukan bedah plastik,
              dermatologi, spesialis kulit dan kelamin, serta perawatan kulit
              estetik.
            </p>
            <p>
              Dokter kami telah menjalani pelatihan ekstensif dan memiliki
              keahlian untuk memberikan hasil luar biasa sekaligus memastikan
              keselamatan pasien.
            </p>
            <Link href="/dokter-kami">
              <button>Lihat Lebih Lanjut</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}