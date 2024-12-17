import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from 'next/link';
import loadingStyles from "@/styles/Loading.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Head from 'next/head';

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        // Fetch settings
        const settingsRes = await fetch(`${baseUrl}/setting`);
        const settingsData = await settingsRes.json();

        // Fetch service detail
        const serviceDetailRes = await fetch(`${baseUrl}/service_two/${slug}`);
        const serviceDetailData = await serviceDetailRes.json();

        if (!serviceDetailData.data) {
            return { notFound: true };
        }

        // Fetch service detail list
        const serviceId = serviceDetailData.data.id;
        const serviceDetailListRes = await fetch(`${baseUrl}/sub_service_list/${serviceId}`);
        const serviceDetailListData = await serviceDetailListRes.json();

        return {
            props: {
                initialSettings: settingsData || {},
                initialServiceDetail: serviceDetailData.data || null,
                initialServiceDetailList: serviceDetailListData.data || [],
                showPopup: serviceDetailData.data.sensitive_content === 1,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { notFound: true };
    }
}

export default function JenisLayanan({ initialSettings, initialServiceDetail, initialServiceDetailList, showPopup: initialShowPopup  }) {
    const router = useRouter();
    const { name, slug } = router.query;
    const [settings, setSettings] = useState(initialSettings);
    const [showPopup, setShowPopup] = useState(initialShowPopup);

    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

    const formattedPhone = settings.phone && settings.phone.startsWith('0')
        ? '62' + settings.phone.slice(1)  
        : settings.phone;

    const closeModal = () => {
        setShowPopup(false);
    };

    const handleBack = () => {
        router.back();
    };

    if (!initialServiceDetail) {
        return (
            <div className="section_error">
                <p>Layanan tidak ditemukan.</p>
            </div>
        );
    }

  const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}`,
      description: `${initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} `,
      url: `${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`,
      publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
          "@type": "ImageObject",
          url: `${initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`}`
      }
      },
      mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`
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
                  item: `${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`
              }
          ]
      }
  };

  return (
    <>
        <Head>
          <title>{initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
          <meta name="description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content={initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}  />
          <meta property="og:description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`} />
          <meta property="og:image" content={initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`}  />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`} />
          <meta name="twitter:description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
          <meta name="twitter:image" content={initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`}  />

          <link rel="canonical" href={`${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
        <div className={banner.banner}>
            <img
                src={`${storageUrl}/${initialServiceDetail.image}`}
                alt={initialServiceDetail.name}
            />
        </div>

        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1 >
                    {initialServiceDetail.title.split(' ')[0]}{" "}
                    <font>{initialServiceDetail.title.split(' ').slice(1).join(' ')}</font>
                </h1>
            </div>
            <div className={styles.section_1_content}>
                <div
                    className={styles.service_description}
                    dangerouslySetInnerHTML={{
                        __html: initialServiceDetail.description || "Deskripsi tidak tersedia.",
                    }}
                />
                <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target='blank_' ><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
            </div>
        </div>

        {showPopup && (
            <div className={`${styles.modal} ${showPopup ? styles.active : ""}`}>
                <div className={styles.overlay_modal}></div>
                <div className={styles.modal_content}>
                    <h1>Verifikasi Usia</h1>
                    <p>
                        Situs web ini berisi materi yang dibatasi usia yang mengandung unsur dewasa. 
                        Dengan ini Anda menyatakan bahwa Anda setidaknya berusia 18 tahun atau lebih, 
                        untuk mengakses situs web dan Anda setuju untuk melihat konten ini.
                    </p>
                    <div className={styles.button_layout}>
                        <button onClick={closeModal}>Saya sudah diatas 18 Tahun</button>
                        <button onClick={handleBack}>Saya masih dibawah 18 Tahun</button>
                    </div>
                    <p>ⓒ PT.HUB 2024</p>
                </div>
            </div>
        )}

        {initialServiceDetailList.length > 0 && (
            <div className={styles.section_3}> 
                <div className={`${styles.box_service_layout} ${styles.box_service_layout_sc}`}>
                    {
                        initialServiceDetailList.map((serviceDetailListing) => (
                            <div className={styles.box_service} key={serviceDetailListing.id}>
                                <div className={styles.box_service_content}>
                                    <h1>{serviceDetailListing.title}</h1>
                                    <p>{serviceDetailListing.description}</p>
                                </div>
                                <div className={styles.box_service_btn}>
                                    <Link href={`/layanan/${name}/${slug}/${serviceDetailListing.slug}`}><button>Lihat Gambar</button></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )}


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
                    src="../../images/dokter_layanan.png"
                    alt="Dokter-dokter NMW Aesthetic Clinic"
                    className={styles.our_dokter}
                />
                <img
                    src="../../images/nmw_bg.png"
                    alt="Background Dokter"
                    className={styles.bg_our_dokter}
                />
                <div className={styles.section_4_content}>
                    <p>
                        Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara profesional,
                        dan terpercaya untuk melakukan bedah plastik, dermatologi, spesialis
                        kulit dan kelamin, serta perawatan kulit estetik.
                    </p>
                    <p>
                        Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian
                        untuk memberikan hasil luar biasa sekaligus memastikan keselamatan
                        pasien.
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
