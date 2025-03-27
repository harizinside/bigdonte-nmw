import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import loadingStyles from "@/styles/Loading.module.css";
import Head from 'next/head';
import Image from 'next/image';
import notFound from '@/public/images/data_empty.webp';

export default function Layanan({ services, patient, servicesList, settings }) {
  const router = useRouter();
  const { slugServices, slug_sc } = router.query;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [template, setTemplate] = useState(true);
  const [servicesListState, setServicesList] = useState(null);
  const [patientState, setPatient] = useState(null);
  const [slug, setSlug] = useState(null);
  const [slugSc, setSlugSc] = useState(null);

  useEffect(() => {
    if (!slugServices) return; // Hindari fetch jika slugServices masih undefined

    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/service_detail/${slugServices}`);
        const result = await response.json();
        setTemplate(result.template)
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [slugServices]);

  useEffect(() => {
    if (!slugServices) return; // Hindari fetch jika slugServices masih undefined

    const fetchServicesList = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/serviceList?services=${slugServices}`);
        const result = await response.json();
        const reversedData = Array.isArray(result.servicesList) ? [...result.servicesList].reverse() : [];
        setServicesList(reversedData);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesList();
  }, [slugServices]);

  useEffect(() => {
    if (!slugServices) return; // Hindari fetch jika slugServices masih undefined

    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/patient?services=${slugServices}`);
        const result = await response.json();
        if (result?.patients?.length > 0) {
          setPatient(result.patients.slice(0, 3));
          setSlug(result.patients[0]?.id_servicesList?.slug || "default-slug");
          setSlugSc(result.patients[0]?.id_servicesType?.slug || "default-slug-sc");
        } else {
          console.warn("❌ Tidak ada pasien yang ditemukan");
          setSlug("default-slug");
          setSlugSc("default-slug-sc");
        }
      } catch (error) {
        console.error("❌ Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [slugServices]);

  if (loading) {
    return (
      <div className={loadingStyles.box}>
        <div className={loadingStyles.content}>
          <img src="/images/logo.svg" loading="lazy" />
          <span>LOADING</span>
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  if (!services || !patientState || !servicesListState) {
    return (
      <div className={styles.emptyPage}>
        <img src="../../images/data_empty.webp" loading="lazy" alt="Data not found" />
        <h1>Layanan Tidak Ditemukan</h1>
      </div>
    );
  }

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

      {patientState?.length > 0 && (
        <div className={styles.section_2}>
          <div className={styles.heading_section}>
            <h2>
              <span>Galeri</span> {services.name}
            </h2>
          </div>
          <div className={styles.box_galeri_layout}>
            {patientState.map((galeriPatient) => (
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
          {services.template === false && Array.isArray(servicesListState) && servicesListState.length > 0 && (
            <div className={styles.box_service_layout}>
              {servicesListState.map((typeService) => (
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
          {services.template === true && Array.isArray(servicesListState) && servicesListState.length > 0 && (
            <div className={styles.box_galeri_layout}>
              {servicesListState.map((typeService) => (
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