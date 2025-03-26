import styles from "@/styles/Cabang.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import loadingStyles from "@/styles/Loading.module.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Image from "next/image";

export default function Branches() {
  const [branchs, setBranchs] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
        const cachedData = localStorage.getItem('promoCache');
        const cacheExpiry = localStorage.getItem('promoCacheExpiry');
        const now = new Date().getTime();

        try {
            const response = await fetch(`${baseUrl}/branch`);
            const data = await response.json();

            if (data && data.branches) {
                const reversedBranches = [...data.branches].reverse(); // Reverse tanpa modifikasi asli
                
                if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
                    const parsedCache = JSON.parse(cachedData);
                    
                    if (JSON.stringify(parsedCache) !== JSON.stringify(data.branches)) {
                        setBranchs(reversedBranches);
                        localStorage.setItem('promoCache', JSON.stringify(reversedBranches));
                        localStorage.setItem('promoCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                    } else {
                        setBranchs([...parsedCache].reverse()); // Reverse data dari cache
                    }
                } else {
                    setBranchs(reversedBranches);
                    localStorage.setItem('promoCache', JSON.stringify(reversedBranches));
                    localStorage.setItem('promoCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                }
            } else {
                console.error('Invalid response data format:', data);
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
            if (cachedData) {
                setBranchs([...JSON.parse(cachedData)].reverse()); // Reverse cache jika fetch gagal
            }
        } finally {
            setLoading(false);
        }
    };

    fetchData();
    }, [baseUrl]);

  const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Cabang - NMW Aesthetic Clinic`,
        description: `Alamat Cabang & Kantor NMW Aesthetic Clinic`,
        url: `${mainUrl}/cabang`,
        publisher: {
          "@type": "Organization",
          name: "NMW Aesthetic Clinic",
          logo: {
            "@type": "ImageObject",
            url: `${mainUrl}/images/cabang-banner.webp`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/branches`
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
                    name: "Cabang",
                    item: `${mainUrl}/branches`
                }
            ]
        }
    };

  return (
    <>
        <Head>
          <title>Cabang | NMW Aesthetic Clinic</title>
          <meta name="description" content="Berikut Alamat Cabang NMW Aesthetic Clinic" />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content="Cabang NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Berikut Alamat Cabang NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/kebijakan-privasi`} />
          <meta property="og:image" content={`${mainUrl}/images/cabang-banner.webp`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Cabang NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Berikut Alamat Cabang NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={`${mainUrl}/images/cabang-banner.webp`} />

          <link rel="canonical" href={`${mainUrl}/kebijakan-privasi`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
        </Head>
            <div className={banner.banner}>
                <img src="/images/cabang-banner.webp" loading="lazy" alt="Layanan Nmw Aesthetic Clinic"/>
            </div>
            <h1 className={styles.heading_hide}>Selamat Datang di Halaman Cabang Pada Website NMW Aesthetic Clinic</h1>
            <div className={breadcrumb.breadcrumb}>
                <h5><Link href={'/'}>Home</Link> / <span>Cabang Kami</span> </h5>
            </div>
            <div className={styles.container}>
                <div className={`${styles.heading_section}`}>
                    <h2><span>Cabang</span> Kami</h2>
                </div>
                <div className={styles.cabang_layout}>
                    {branchs.map(branch => (
                        <div className={styles.cabang_box} key={branch.id}>
                            <div className={styles.cabang_box_image}>
                                <Image
                                    width={500}
                                    height={500}
                                    src={`${storageUrl}${branch.image ||
                                        "Loading..."}`}
                                    alt={branch.name}
                                    priority
                                />
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h3>{branch.name}</h3>
                                <div className={styles.cabang_box_text}>
                                    <div className={styles.cabang_box_detail}>
                                        <h4>Alamat</h4>
                                        <p>{branch.address}</p>
                                    </div>
                                    <div className={styles.cabang_box_detail}>
                                        <h4>Operasional</h4>
                                        <p>{branch.operasional[0]}</p>
                                        <p>{branch.operasional[1]}</p>
                                    </div>
                                    <div className={styles.cabang_box_detail}>
                                        <h4>Telepon</h4>
                                        <p>{branch.phone}</p>
                                    </div>
                                </div>
                                <div className={styles.cabang_box_button}>
                                    <Link href={`https://api.whatsapp.com/send/?phone=${branch.phone}&text=Hallo+admin+NMW+${branch.name}%2C+saya+pasien+baru+ingin+mendaftarkan+dan+melakukan+pembelian+produk+di+E-Commerce+Web+NMW+Aesthetic+Clinic&type=phone_number&app_absent=0`} target="blank_"><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                    <Link href={branch.location} target="blank_"><button><SlLocationPin/></button></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {loading && (
                <div className={loadingStyles.box}>
                    <div className={loadingStyles.content}>
                        <img src="/images/logo.svg" loading="lazy" alt="Loading"/>
                        <span>LOADING</span>
                    </div>
                </div>
            )}
    </>
  );
}
