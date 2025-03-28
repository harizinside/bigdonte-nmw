import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import breadcrumb from "@/styles/Breadcrumb.module.css";
import loadingStyles from "@/styles/Loading.module.css";
import notFound from '@/public/images/data_empty.webp';

export async function getServerSideProps(context) {
  const { params } = context;
  const { slugServices } = params;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  const settingsRes = await fetch(`${baseUrl}/settings`);
  const settingsData = await settingsRes.json();
  const settings = settingsData.settings || [];

  const servicesRes = await fetch(`${baseUrl}/service_detail/${slugServices}`);
  const servicesData = await servicesRes.json();
  const services = servicesData;

  const patientRes = await fetch(`${baseUrl}/patient?services=${slugServices}`);
  const patientData = await patientRes.json();
  const patient = patientData.patients;

  const servicesListRes = await fetch(`${baseUrl}/serviceList?services=${slugServices}`);
  const servicesListData = await servicesListRes.json();
  const servicesList = servicesListData.servicesList;

  return {
    props: {
      services,
      patient,
      servicesList,
      settings,
    },
  };
}

export default function Layanan({ services, patient, servicesList, settings }) {
  const router = useRouter();
  const { slugServices, slug_sc } = router.query;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${services.name} - NMW Aesthetic Clinic`,
    description: `${services.description}`,
    url: `${mainUrl}/layanan/${services.slug}`,
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
      "@id": `${mainUrl}/layanan/${services.slug}`
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
          name: `${services.name}`,
          item: `${mainUrl}/layanan/${services.slug}`
        }
      ]
    }
  };

  if (!services || !patient || !servicesList) {
    return (
      <div className={styles.emptyPage}>
        <img src={notFound} alt="Data not found" />
        <h1>Layanan Tidak Ditemukan</h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{services.name ? `${services.name}` : `Layanan NMW Aesthetic Clinic`} | NMW Aesthetic Clinic</title>
        <meta name="description" content={services.name ? `${services.name}` : `Layanan NMW Aesthetic Clinic`} />
        <meta name="keywords" content="layanan medis, perawatan kulit, bedah plastik, konsultasi kesehatan, perawatan kecantikan, NMW Clinic, layanan kecantikan, perawatan wajah, estetika medis, klinik estetika, perawatan anti-aging, operasi plastik, perawatan rambut, perawatan tubuh, terapi kecantikan, klinik kecantikan NMW, dokter kecantikan, solusi kecantikan, layanan kecantikan medis, klinik bedah plastik, rejuvenasi kulit, konsultasi bedah plastik" />

        <meta property="og:title" content={services.name ? `${services.name}` : `Layanan NMW Aesthetic Clinic`} />
        <meta property="og:description" content={services.description ? `${services.description.replace(/<[^>]+>/g, '').slice(0, 100)}${services.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/layanan/${services.slug}`} />
        <meta property="og:image" content={services.imageCover ? `${storageUrl}/${services.imageCover}` : `${mainUrl}/images/logo.svg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={services.name ? `${services.name}` : `Layanan NMW Aesthetic Clinic`} />
        <meta name="twitter:description" content={services.description ? `${services.description.replace(/<[^>]+>/g, '').slice(0, 100)}${services.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
        <meta name="twitter:image" content={services.imageCover ? `${storageUrl}/${services.imageCover}` : `${mainUrl}/images/logo.svg`} />

        <link rel="canonical" href={`${mainUrl}/layanan/${services.slug}`} />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Head>
      <div className={banner.banner}>
        <Image priority width={500} height={500} src={`${storageUrl}/${services.imageBanner}`} alt={services.name} />
      </div>
      <div className={breadcrumb.breadcrumb}>
        <h5><Link href={'/'}>Home</Link> / <Link href={`${mainUrl}/layanan`}>Layanan</Link> / <span><Link href={`${mainUrl}/layanan/${services.slug}`}>{services.name}</Link></span></h5>
      </div>
      <div className={styles.section_1}>
        <div className={styles.section_1_heading}>
          <h1>
            <span>{services.name.split(' ')[0]} </span>
            {services.name.split(' ').slice(1).join(' ')}
          </h1>

          <Link href={`https://api.whatsapp.com/send?phone=${services.phone}`} target="blank_"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp /></button></Link>
        </div>
        <div className={styles.section_1_content}>
          <div className={styles.service_description} dangerouslySetInnerHTML={{ __html: services.description }} />
        </div>
      </div>

      {patient.length > 0 && (
        <div className={styles.section_2}>
          <div className={styles.heading_section}>
            <h2>
              <span>Galeri</span> {services.name}
            </h2>
          </div>
          <div className={styles.box_galeri_layout}>
            {patient.map((galeriPatient) => (
              <div className={styles.box_galeri} key={galeriPatient._id}>
                {/* Image Section */}
                <div className={styles.box_galeri_image}>
                  <Image
                    width={800}
                    height={800}
                    priority
                    src={`${storageUrl}/${galeriPatient.image}`}
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
                    <h3>{galeriPatient.name || "Judul Tidak Tersedia"}</h3>
                  </div>
                  <div className={styles.box_galeri_text}>
                    <p>{galeriPatient.description.replace(/<\/?p>/g, "") || "Deskripsi tidak tersedia"}</p>
                  </div>
                </div>
                <div className={styles.box_galeri_button}>
                  <Link href={`/layanan/${slugServices}/${galeriPatient.id_servicesList.slug}/${galeriPatient.id_servicesType.slug}/${galeriPatient.slug}`}>
                    <button type="button">
                      Lihat Gambar {galeriPatient.name || "Galeri"}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {services && services.template !== undefined && (
        <div className={styles.section_3}>
          <div className={styles.heading_section}>
            <h2>
              <span>Jenis</span> Layanan
            </h2>
          </div>

          {/* Jika template === false, tampilkan layout service */}
          {services.template === false && servicesList.length > 0 && (
            <div className={styles.box_service_layout}>
              {servicesList.map((typeService) => (
                <div className={styles.box_service} key={typeService._id}>
                  <div className={styles.box_service_image}>
                    <Image
                      width={800}
                      height={800}
                      priority
                      src={`${storageUrl}/${typeService.imageCover || typeService.imageCover}`}
                      alt={typeService.title}
                    />
                  </div>
                  <div className={styles.box_service_content}>
                    <h3>{typeService.name}</h3>
                    <p className={styles.service_description}>
                      {typeService.description.replace(/<\/?p>/g, "")}
                    </p>
                  </div>
                  <div className={styles.box_service_btn}>
                    <Link href={`/layanan/${services.slug}/${typeService.slug}`}>
                      <button>Lihat Detail</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Jika template === true, tampilkan layout galeri */}
          {services.template === true && servicesList.length > 0 && (
            <div className={styles.box_galeri_layout}>
              {servicesList.map((typeService) => (
                <Link href={`/layanan/${services.slug}/${typeService.slug}`} key={typeService._id}>
                  <div className={styles.box_galeri}>
                    <div className={styles.box_galeri_image}>
                      <div className={styles.box_galeri_overlay}></div>
                      <Image
                        priority
                        width={800}
                        height={800}
                        src={`${storageUrl}/${typeService.imageCover}`}
                        alt={typeService.name}
                      />
                      <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                        <button>{typeService.name}</button>
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
            <h2><span>Dokter</span> Kami</h2>
          </div>
        </div>
        <div className={styles.section_4_box}>
          <img src="../images/dokter_layanan.webp" alt="Dokter-dokter NMW Aesthetic Clinic" loading='lazy' className={styles.our_dokter} />
          <img src="../images/nmw_bg.webp" alt="Dokter-dokter NMW Aesthetic Clinic" loading='lazy' className={styles.bg_our_dokter} />
          <div className={styles.section_4_content}>
            <p>Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara profesional, dan terpercaya untuk melakukan bedah plastik, dermatologi, spesialis kulit dan kelamin dan perawatan kulit ekstetika.</p>
            <p>Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian untuk memberikan hasil luar biasa sekaligus memastikan keselamatan pasien.</p>
            <Link href={'/dokter-kami'}><button>Lihat Lebih Lanjut</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}