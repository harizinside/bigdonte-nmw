import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import loadingStyles from "@/styles/Loading.module.css";
import Head from 'next/head';

export async function getServerSideProps(context) {
    const { name } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    let serviceDetail = null;
    let services = [];
    let galeriPatients = [];
    let typeServices = [];
    let subServices = [];
    let subTwoServices = [];
    let settings = [];

    try {
        // Fetch site settings
        const settingsRes = await fetch(`${baseUrl}/setting`);
        const settingsData = await settingsRes.json();
        settings = settingsData || [];

        // Fetch all services
        const servicesRes = await fetch(`${baseUrl}/service`);
        const servicesData = await servicesRes.json();
        services = servicesData.data || [];

        // Fetch service detail for the matched service based on the 'name' in query
        let matchedService = null;
        if (name && services.length > 0) {
            matchedService = services.find(service =>
                service.name.replace(/\s+/g, '-').toLowerCase() === name
            );

            if (matchedService) {

                console.log(matchedService.id)
                // Fetch service details
                const serviceDetailRes = await fetch(`${baseUrl}/service_detail/${matchedService.id}`);
                const serviceDetailData = await serviceDetailRes.json();
                serviceDetail = serviceDetailData.data || {};

                // Fetch related services
                const typeServicesRes = await fetch(`${baseUrl}/service_one?id=${matchedService.id}`);
                const typeServicesData = await typeServicesRes.json();

                // Correct the assignment based on the actual API structure
                typeServices = {
                services: typeServicesData.data || [],
                template: typeServicesData.template || "1",
                };


                // Fetch sub-services
                const subServicesRes = await fetch(`${baseUrl}/sub_service_list/${matchedService.id}`);
                const subServicesData = await subServicesRes.json();
                subServices = subServicesData.data || [];

                // Fetch patient gallery
                const galeriPasienRes = await fetch(`${baseUrl}/patient_galeri?id=${matchedService.id}`);
                const galeriPasienData = await galeriPasienRes.json();
                galeriPatients = galeriPasienData.data || [];
            }
        }

        // Fetch additional subTwo services (if needed)
        const subTwoServicesRes = await fetch(`${baseUrl}/service_two_id`);
        const subTwoServicesData = await subTwoServicesRes.json();
        subTwoServices = subTwoServicesData.data || [];

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return {
        props: {
            settings,
            serviceDetail,
            services,
            galeriPatients,
            typeServices,
            subServices,
            subTwoServices,
        },
    };
}

export default function Layanan({
    settings,
    serviceDetail,
    services,
    galeriPatients,
    typeServices,
    subTwoServices,
    subServices,
}) {
    const router = useRouter();
    const { name } = router.query;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${serviceDetail.name} - NMW Aesthetic Clinic`,
        description: `${serviceDetail.description}`,
        url: `${mainUrl}/layanan/${encodeURIComponent(serviceDetail.name.replace(/\s+/g, '-').toLowerCase())}`,
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
          "@id": `${mainUrl}/layanan/${encodeURIComponent(serviceDetail.name.replace(/\s+/g, '-').toLowerCase())}`
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
                name: `${serviceDetail.name}`,
                item:  `${mainUrl}/layanan/${encodeURIComponent(serviceDetail.name.replace(/\s+/g, '-').toLowerCase())}`
              }
            ]
        }
    };

  return (
    <>
        <Head>
          <title>{serviceDetail.name ? `${serviceDetail.name}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
          <meta name="description" content={serviceDetail.name ? `${serviceDetail.name}` : `Layanan NMW Aesthetic Clinic`}  />
          <meta name="keywords" content="layanan medis, perawatan kulit, bedah plastik, konsultasi kesehatan, perawatan kecantikan, NMW Clinic, layanan kecantikan, perawatan wajah, estetika medis, klinik estetika, perawatan anti-aging, operasi plastik, perawatan rambut, perawatan tubuh, terapi kecantikan, klinik kecantikan NMW, dokter kecantikan, solusi kecantikan, layanan kecantikan medis, klinik bedah plastik, rejuvenasi kulit, konsultasi bedah plastik" />

          <meta property="og:title" content={serviceDetail.name ? `${serviceDetail.name}` : `Layanan NMW Aesthetic Clinic`}  />
          <meta property="og:description" content={serviceDetail.description ? `${serviceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${serviceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}  />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/layanan/${encodeURIComponent(serviceDetail.name.replace(/\s+/g, '-').toLowerCase())}`} />
          <meta property="og:image" content={serviceDetail.image_2 ? `${storageUrl}/${serviceDetail.image_2}` : `${mainUrl}/images/logo.svg`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={serviceDetail.name ? `${serviceDetail.name}` : `Layanan NMW Aesthetic Clinic`} />
          <meta name="twitter:description" content={serviceDetail.description ? `${serviceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${serviceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}  />
          <meta name="twitter:image" content={serviceDetail.image_2 ? `${storageUrl}/${serviceDetail.image_2}` : `${mainUrl}/images/logo.svg`} />

          <link rel="canonical" href={`${mainUrl}/layanan/${encodeURIComponent(serviceDetail.name.replace(/\s+/g, '-').toLowerCase())}`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
        <div className={banner.banner}>
            <img src={`${storageUrl}/${serviceDetail.image}`} alt={serviceDetail.name} />
        </div>
        <div className={styles.section_1}>
            <div className={styles.section_1_heading}>
                <h1>
                    <font>{serviceDetail.name.split(' ')[0]} </font> 
                    {serviceDetail.name.split(' ').slice(1).join(' ')}
                </h1>

                <Link href={`https://api.whatsapp.com/send?phone=${serviceDetail.phone}`} target="blank_"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
            </div>
            <div className={styles.section_1_content}>
                <div className={styles.service_description} dangerouslySetInnerHTML={{ __html: serviceDetail.description }} />
            </div>
        </div>

        {galeriPatients.length > 0 && (
            <div className={styles.section_2}>
                <div className={styles.heading_section}>
                    <h1>
                        <font>Galeri</font> Bedah Plastik
                    </h1>
                </div>
                <div className={styles.box_galeri_layout}>
                {galeriPatients.map((galeriPatient) => {
                        // Cari subService terkait menggunakan matchedService.id
                    const relatedSubService = subServices.find(
                        (service) => service.id
                    );

                    return (
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
                                    <h1>{relatedSubService?.title || "Judul Tidak Tersedia"}</h1>
                                    <h3>{galeriPatient.name || "Nama Tidak Tersedia"}</h3>
                                </div>
                                <div className={styles.box_galeri_text}>
                                    <p>{galeriPatient.description || "Deskripsi tidak tersedia"}</p>
                                </div>
                            </div>

                            {/* Button Section */}
                            <div className={styles.box_galeri_button}>
                                <Link href={`/layanan/plastic-surgery/${encodeURIComponent(subTwoServices.title.replace(/\s+/g, '-').toLowerCase())}/${encodeURIComponent(relatedSubService.title.replace(/\s+/g, '-').toLowerCase())}/${galeriPatient.id}`}>
                                    <button type="button">
                                        Lihat Gambar {galeriPatient.name || "Galeri"}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        )}


        {typeServices?.services?.length > 0 && (
        <div className={styles.section_3}>
            <div className={styles.heading_section}>
            <h1>
                <font>Jenis</font> Layanan
            </h1>
            </div>

            {typeServices.template === "2" && (
            <div className={styles.box_service_layout}>
                {typeServices.services.map((typeService) => (
                <div className={styles.box_service} key={typeService.id}>
                    <div className={styles.box_service_image}>
                    <img
                        src={`${storageUrl}/${typeService.image2 || typeService.image}`}
                        alt={typeService.title}
                    />
                    </div>
                    <div className={styles.box_service_content}>
                    <h1>{typeService.title}</h1>
                    <p className={styles.service_description}>
                        Klik lihat detail untuk mendapatkan informasi selengkapnya tentang layanan ini
                    </p>
                    </div>
                    <div className={styles.box_service_btn}>
                    <Link href={`/layanan/${name}/${typeService.slug}`}>
                        <button>Lihat Detail</button>
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            )}

            {typeServices.template === "1" && (
            <div className={styles.box_galeri_layout}>
                {typeServices.services.map((typeService) => (
                <Link href={`/layanan/${name}/${typeService.slug}`} key={typeService.id}>
                    <div className={styles.box_galeri}>
                    <div className={styles.box_galeri_image}>
                        <div className={styles.box_galeri_overlay}></div>
                        <img
                        src={`${storageUrl}/${typeService.image}`}
                        alt={typeService.title}
                        />
                        <div
                        className={`${styles.button_image} ${styles.button_image_sc}`}
                        >
                        <button>{typeService.title}</button>
                        </div>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
            )}
        </div>
        )}



        <div className={styles.section_4}>
            <div className={styles.heading_section_4}>
            <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                <h1><font>Dokter</font> Kami</h1>
            </div>
            </div>
            <div className={styles.section_4_box}>
                <img src="../images/dokter_layanan.png" alt="Dokter-dokter NMW Aesthetic Clinic" className={styles.our_dokter} />
                <img src="../images/nmw_bg.png" alt="Dokter-dokter NMW Aesthetic Clinic" className={styles.bg_our_dokter} />
                <div className={styles.section_4_content}>
                    <p>Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara profesional, dan terpercaya untuk melakukanbedah plastik, dermatologi, spesialis kulit dan kelamin dan perawatan kulit ekstetika.</p>
                    <p>Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian untuk memberikan hasil luar biasa sekaligus memastikan keselamatan pasien.</p>
                    <Link href={'/dokter-kami'}><button>Lihat Lebih Lanjut</button></Link>
                </div>
            </div>
        </div>
    </>
  );
}
