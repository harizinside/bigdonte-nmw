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

export default function Patient({ settings, patients }) {
  const router = useRouter();
  const { slugServices, slug, slug_sc, slugPatients } = router.query;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

  const formattedPhone = settings.phone?.startsWith("0")
  ? "62" + settings.phone.slice(1)
  : settings.phone;

  function formatText(text) {
    if (!text) return ""; // Jika text undefined/null, return string kosong

      return text.replace(/-/g, ' ') // Mengganti "-" dengan spasi
                .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi setiap kata
  }

  const formattedName = formatText(slugServices);
  const formattedSlug = formatText(slug);
  const formattedSlugSc = formatText(slug_sc);

  if (!patients) {
    return (
        <div className={styles.emptyPage}>
        </div>
    );
  }

  const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${patients.name} - NMW Aesthetic Clinic`,
      description: `${patients.description}`,
      url: `${mainUrl}/layanan/${slugServices}/${slug}/${slug_sc}/${patients.slug}`,
      publisher: {
        "@type": "Organization",
        name: "NMW Aesthetic Clinic",
        logo: {
          "@type": "ImageObject",
          url: `${storageUrl}/${settings.logo}`
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${mainUrl}/layanan/${slugServices}/${slug}/${slug_sc}/${patients.slug}`
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: `${mainUrl}`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Layanan",
            item: `${mainUrl}/layanan`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${formattedName}`,
            item:  `${mainUrl}/layanan/${slugServices}`
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${formattedSlug}`,
            item: `${mainUrl}/layanan/${slugServices}/${slug}`
          },
          {
            "@type": "ListItem",
            position: 5,
            name: `${formattedSlugSc}`,
            item: `${mainUrl}/layanan/${slugServices}/${slug}/${slug_sc}`
          },
          {
            "@type": "ListItem",
            position: 5,
            name: `${patients.name}`,
            item: `${mainUrl}/layanan/${slugServices}/${slug}/${slug_sc}/${patients.slug}`
          }
        ]
      }
  };

  return(
    <>
    <Head>
        <title>{patients.name ? `${patients.name}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
        <meta name="description" content={patients.description ? `${patients.description.replace(/<[^>]+>/g, '').slice(0, 100)}${patients.description.length > 100 ? '...' : ''}` : 'Pasien NMW Aesthetic Clinic'} />
        <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

        <meta property="og:title" content={patients.name ? `${patients.name}` : `Pasien NMW Aesthetic Clinic`}   />
        <meta property="og:description" content={patients.description ? `${patients.description.replace(/<[^>]+>/g, '').slice(0, 100)}${patients.description.length > 100 ? '...' : ''}` : 'Pasien NMW Aesthetic Clinic'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/Layanan/${slugServices}/${slug}/${slug_sc}/${patients.slug}`} />
        <meta property="og:image" content={patients.image ? `${storageUrl}/${patients.image}` : `${mainUrl}/images/logo.svg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={patients.name ? `${patients.name}` : `Pasien NMW Aesthetic Clinic`}  />
        <meta name="twitter:description" content={patients.description ? `${patients.description.replace(/<[^>]+>/g, '').slice(0, 100)}${patients.description.length > 100 ? '...' : ''}` : 'Pasien NMW Aesthetic Clinic'} />
        <meta name="twitter:image" content={patients.image ? `${storageUrl}/${patients.image}` : `${mainUrl}/images/logo.svg`} />

        <link rel="canonical" href={`${mainUrl}/Layanan/${slugServices}/${slug}/${slug_sc}/${patients.slug}`} />

        <script type="application/ld+json">
        {JSON.stringify(schemaData)}
        </script>
      </Head>
      <div className={banner.banner}>
         <Image
          priority
          width={800}
          height={800}
          src={`${storageUrl}/${patients.imageSecond}`}
          alt={patients.name || "Banner image"}
        />
      </div>
      <div className={breadcrumb.breadcrumb}>
          <h5><Link href={'/'}>Home</Link> / <Link href={`${mainUrl}/layanan`}>Layanan</Link> / <Link href={`${mainUrl}/layanan/${slugServices}`}>{formattedName}</Link> / <Link href={`${mainUrl}/layanan/${slugServices}/${slug}`}>{formattedSlug}</Link> / <Link href={`${mainUrl}/layanan/${slugServices}/${slug}/${slug_sc}`}>Pasien {formattedSlugSc}</Link> / <span>{patients.name}</span></h5>
      </div>

      {/* Section 1 */}
      <div className={`${styles.section_1} ${styles.section_1_sc}`}>
        <div className={styles.section_1_heading}>
          <h1> 
             {patients.name.split(" ")[0]}{" "}
            <font>{patients.name.split(" ").slice(1).join(" ")}</font>
          </h1>
        </div>
        <div className={styles.section_1_content}>
          <div
            className={styles.service_description}
            dangerouslySetInnerHTML={{
              __html: patients.description || "Deskripsi tidak tersedia.",
            }}
          />
          <p>Hasil individu bervariasi <br/> <br/>
          Dibawah ini adalah gambar sebelum dan sesudah pasien yang melalukan tindakan operasi Blepharoplasty di NMW Bedah Plastik. Harap diperhatikan bahwa setiap hasil pasien sebelum dan sesudah berbeda. Silahkan hubungi Customer Service kami apabila ingin bertanya lebih lanjut.</p>
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
       <div className={`${styles.section_2} ${styles.section_2_sc} ${styles.section_2_patient}`}>
         <div className={styles.patient_galeri_layout}>
           {/* Map over the patient data */}
           {patients ? (
            <>
            <div className={styles.box_galeri} key={patients._id}>
              {/* Gambar Pasien */}
              <div className={styles.box_galeri_image}>
                <Image
                  priority
                  width={800}
                  height={800}
                  src={`${storageUrl}/${patients.image}`}
                  alt={patients.name || "Galeri Image"}
                />
                <div className={styles.button_image}>
                  <button type="button">Sebelum</button>
                  <button type="button">Sesudah</button>
                </div>
              </div>
            </div>
            <div className={styles.box_galeri} key={patients._id}>
              {/* Gambar Pasien */}
              <div className={styles.box_galeri_image}>
                <Image
                  priority
                  width={800}
                  height={800}
                  src={`${storageUrl}/${patients.imageSecond}`}
                  alt={patients.name || "Galeri Image"}
                />
                <div className={styles.button_image}>
                  <button type="button">Sebelum</button>
                  <button type="button">Sesudah</button>
                </div>
              </div>
            </div>
            </>
          ) : (
            <p>Data pasien tidak tersedia.</p>
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
    </>
  );
}

export async function getServerSideProps({ query }) {
  const slugPatients = query.slugPatients;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  const responseSettings = await fetch(`${baseUrl}/settings`);
  const settings = await responseSettings.json();

  const responsePatients = await fetch(`${baseUrl}/patientDetail/${slugPatients}`);
  const patients = await responsePatients.json();

  return {
    props: {
      settings,
      patients,
    },
  };
}