import banner from "@/styles/Banner.module.css"
import styles from "@/styles/Catalog.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Catalog(){
    const [catalogs, setCatalogs] = useState([]);
    const [settings, setSettings] = useState([]);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/setting`);
                const data = await response.json();
                console.log('Fetched data:', data);  // Log the entire response
  
                if (data && data.social_media) {
                    setSettings(data); // Set the entire response object to settings
                } else {
                    console.error('No social_media data found:', data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
  
        fetchData();
      }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/catalog`);
                const data = await response.json();
                if (data && data.data) { // Pastikan data dan data.data ada
                setCatalogs(data.data); // Setel data objek banner
                } else {
                console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };
 
        fetchData();
    }, []);

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Katalog - NMW Aesthetic Clinic`,
        description: `Lihat dan download katalog NMW Aesthetic Clinic`,
        url: `${mainUrl}catalog`,
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
          "@id": `${mainUrl}catalog`
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
                    name: "Katalog",
                    item: `${mainUrl}catalog`
                }
            ]
        }
    };

    return( 
        <>
            <Head>
                <title>Katalog | NMW Aesthetic Clinic</title>
                <meta name="description" content="Lihat dan download katalog NMW Aesthetic Clinic" />
                <meta name="keywords" content="katalog NMW Clinic, produk kecantikan, perawatan kulit, skincare terbaik, produk perawatan wajah, kosmetik profesional, perawatan tubuh, produk anti-aging, serum wajah, krim pelembab, tabir surya, masker wajah, produk perawatan rambut, suplemen kecantikan, kosmetik medis, krim malam, perawatan kulit sensitif, produk klinik kecantikan, skincare rekomendasi dokter, kosmetik terpercaya, produk kesehatan kulit, perawatan kecantikan lengkap, solusi kecantikan, katalog produk NMW" />

                <meta property="og:title" content="Cabang NMW Aesthetic Clinic"  />
                <meta property="og:description" content="Lihat dan download katalog NMW Aesthetic Clinic" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${mainUrl}catalog`} />
                <meta property="og:image" content={`${mainUrl}images/catalogue-banner.png`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Catalog NMW Aesthetic Clinic"  />
                <meta name="twitter:description" content="Lihat dan download katalog NMW Aesthetic Clinic" />
                <meta name="twitter:image" content={`${mainUrl}images/catalogue-banner.png`} />

                <link rel="canonical" href={`${mainUrl}catalog`} />

                <script type="application/ld+json">
                {JSON.stringify(schemaData)}
                </script>
            </Head>
            <div className={banner.banner}>
                <img src="images/catalogue-banner.png" alt="Layanan Nmw Aesthetic Clinic"/>
            </div>
            <div className={styles.container}>
                <div className={`${styles.heading_section}`}>
                    <h1><font>Katalog</font> Harga</h1>
                </div>
                <div className={styles.box_galeri_layout}>
                    {catalogs.map(catalog => (
                        <div className={styles.box_galeri} key={catalog.id}>
                            <div className={styles.box_galeri_image}>
                                <img src={`${storageUrl}/${catalog.image}`} alt={catalog.title}/>
                            </div>
                            <div className={styles.box_galeri_content}>
                                <div className={styles.box_galeri_heading}>
                                    <h1>{catalog.title}</h1>
                                </div>
                                <div className={styles.box_galeri_text}>
                                    <p>Terakhir Diperbaharui</p>
                                    <p>{new Date(catalog.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className={styles.box_galeri_button}>
                                <Link href={`${storageUrl}/${catalog.document}`} target="blank_"><button>Unduh</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.section_4}>
                <div className={styles.heading_section_4}>
                    <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                        <h1><font>Dokter </font>Kami</h1>
                    </div>
                </div>
                <div className={styles.section_4_box}>
                <img src="images/nmw_dokter.png" alt="Dokter-dokter NMW Aesthetic Clinic" className={styles.our_dokter} />
                <img src="images/blink_orange.svg" className={styles.section_icon_5} />
                <img src="images/blink_grey.svg" className={styles.section_icon_6} />
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