import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from "next/link";
import loadingStyles from "@/styles/Loading.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { slug, slug_sc } = context.query;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const settingsRes = await fetch(`${baseUrl}/setting`);
    const settingsData = await settingsRes.json();

    let serviceDetail = [];
    let serviceDetailList = [];

    if (slug_sc) {
      try {
        const serviceDetailRes = await fetch(`${baseUrl}/stos/${slug_sc}`);
        const serviceDetailData = await serviceDetailRes.json();
        if (serviceDetailData?.data) {
          serviceDetail = serviceDetailData.data;
          // Ambil serviceId dari serviceDetail jika slug_sc ada
          const serviceId = serviceDetail.id;
          console.log("Service ID from /stos/: " + serviceId);

          // Ambil data pasien berdasarkan serviceId
          const serviceDetailListRes = await fetch(`${baseUrl}/patient/${serviceId}`);
          const serviceDetailListData = await serviceDetailListRes.json();
          
          if (serviceDetailListData?.data) {
            serviceDetailList = serviceDetailListData.data;
          }
        }
      } catch (error) {
        console.error("Error fetching service detail by slug_sc:", error);
      }
    }

    // Jika tidak ada serviceDetail dan slug ada
    if (!serviceDetail && slug) {
      try {
        const serviceDetailSubRes = await fetch(`${baseUrl}/service_two/${slug}`);
        const serviceDetailSubData = await serviceDetailSubRes.json();

        console.log("serviceDetailSubData : " + JSON.stringify(serviceDetailSubData));

        if (serviceDetailSubData?.data) {
          serviceDetail = serviceDetailSubData.data;
          const serviceId = serviceDetailSubData.data.id;
          console.log("Service ID from /service_two/: " + serviceId);

          // Ambil data pasien berdasarkan serviceId
          const serviceDetailListRes = await fetch(`${baseUrl}/patient/${serviceId}`);
          const serviceDetailListData = await serviceDetailListRes.json();
          
          if (serviceDetailListData?.data) {
            serviceDetailList = serviceDetailListData.data;
          }          
        }
      } catch (error) {
        console.error("Error fetching service detail by slug:", error);
      }
    }

    return {
      props: {
        initialSettings: settingsData || { phone: "" },
        initialServiceDetail: serviceDetail || null,
        initialServiceDetailList: serviceDetailList || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }
}


export default function SubJenisLayanan({ initialSettings, initialServiceDetail, initialServiceDetailList }) {

    const router = useRouter();
    const { name, slug, slug_sc } = router.query;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

    const formattedPhone = initialSettings.phone?.startsWith("0")
    ? "62" + initialSettings.phone.slice(1)
    : initialSettings.phone;

    if (!initialServiceDetail) {
      return (
        <div className={styles.section_error}>
          <p>Layanan tidak ditemukan.</p>
        </div>
      );
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${initialServiceDetail.title} - NMW Aesthetic Clinic`,
        description: `${initialServiceDetail.description}`,
        url: `${mainUrl}/layanan/${name}/${slug}/${initialServiceDetail.slug}`,
        publisher: {
          "@type": "Organization",
          name: "NMW Aesthetic Clinic",
          logo: {
            "@type": "ImageObject",
            url: `${storageUrl}/${initialSettings.logo}`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/layanan/${name}/${slug}/${initialServiceDetail.slug}`
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
              name: `${name}`,
              item:  `${mainUrl}/layanan/${name}`
            },
            {
              "@type": "ListItem",
              position: 4,
              name: `${slug}`,
              item: `${mainUrl}/layanan/${name}/${slug}`
            },
            {
              "@type": "ListItem",
              position: 5,
              name: `${initialServiceDetail.title}`,
              item: `${mainUrl}/layanan/${name}/${slug}/${initialServiceDetail.slug}`
            }
          ]
        }
    };

    const cleanedDescription = initialServiceDetail.description
  ? initialServiceDetail.description.replace(/<\/?p>/g, "")
  : "Deskripsi tidak tersedia.";

  return (
    <>
        <Head>
          <title>{initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
          <meta name="description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content={initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}   />
          <meta property="og:description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/layanan/${name}/${slug}/${initialServiceDetail.slug}`} />
          <meta property="og:image" content={initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}  />
          <meta name="twitter:description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
          <meta name="twitter:image" content={initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`} />

          <link rel="canonical" href={`${mainUrl}/layanan/${name}/${slug}/${initialServiceDetail.slug}`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
      <div className={banner.banner}>
          <img
            src={`${storageUrl}/${initialServiceDetail.image}`}
            alt={initialServiceDetail.title || "Banner image"}
            loading="lazy"
          />
        </div>

      {/* Section 1 */}
      <div className={`${styles.section_1} ${styles.section_1_sc}`}>
        <div className={styles.section_1_heading}>
          <h1>
            {initialServiceDetail.title.split(" ")[0]}{" "}
            <font>{initialServiceDetail.title.split(" ").slice(1).join(" ")}</font>
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
              <h1>Pasien {initialServiceDetail.title.split(" ")[0]}{" "}
              <font>{initialServiceDetail.title.split(" ").slice(1).join(" ")}</font></h1>
          </div>
          <div className={styles.box_galeri_layout}>
          {initialServiceDetailList.length > 0 ? (
              initialServiceDetailList.map((galeriPatient) => (
                  <div className={styles.box_galeri} key={galeriPatient.id}>
                      {/* Image Section */}
                      <div className={styles.box_galeri_image}>
                          <img
                              src={`${storageUrl}/${galeriPatient.image}`}
                              alt={galeriPatient.name || "Galeri Image"}
                              loading="lazy"
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
                          <Link href={`/layanan/${name}/${slug}/${slug_sc}/${galeriPatient.id}`}>
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
      

      {/* Section 4 */}
      <div className={styles.section_4}>
        <div className={styles.heading_section_4}>
          <div
            className={`${styles.heading_section} ${styles.heading_section_start}`}
          >
            <h1>
              <font>Dokter </font>
              Kami
            </h1>
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
