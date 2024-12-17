import styles from "@/styles/Cabang.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import loadingStyles from "@/styles/Loading.module.css";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Branches() {
    const [branchs, setBranchs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState([]);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    

    useEffect(() => {
        const fetchData = async () => {
            const cachedSetting = localStorage.getItem('settingCache');
            const cachedSettingExpired = localStorage.getItem('settingCacheExpired');
            const now = new Date().getTime();
    
            // Cek apakah cache valid
            if (cachedSetting && cachedSettingExpired && now < parseInt(cachedSettingExpired)) {
                setSettings(JSON.parse(cachedSetting));
                
                // Lakukan pengecekan data API untuk pembaruan data
                try {
                    const response = await fetch(`${baseUrl}/setting`);
                    const data = await response.json();
    
                    if (data && data.social_media) {
                        const cachedData = JSON.parse(cachedSetting);
                        
                        // Bandingkan data baru dengan cache
                        if (JSON.stringify(data) !== JSON.stringify(cachedData)) {
                            setSettings(data);
                            localStorage.setItem('settingCache', JSON.stringify(data));
                            localStorage.setItem('settingCacheExpired', (now + 86400000).toString());
                            console.log('Cache updated after API check');
                        } else {
                            console.log('No changes detected in API data');
                        }
                    } else {
                        console.error('Invalid API response:', data);
                    }
                } catch (error) {
                    console.error('Error checking API for updates:', error);
                }
                return;
            }
    
            // Fetch data jika tidak ada cache atau cache sudah kadaluarsa
            try {
                const response = await fetch(`${baseUrl}/setting`);
                const data = await response.json();
    
                if (data && data.social_media) {
                    setSettings(data);
                    localStorage.setItem('settingCache', JSON.stringify(data));
                    localStorage.setItem('settingCacheExpired', (now + 86400000).toString());
                    console.log('Fetched and cached from API');
                } else {
                    console.error('Invalid API response:', data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
      }, [baseUrl]);

    useEffect(() => {
        const fetchData = async () => {
            const cachedData = localStorage.getItem('promoCache');
            const cacheExpiry = localStorage.getItem('promoCacheExpiry');
            const now = new Date().getTime();
    
            try {
                const response = await fetch(`${baseUrl}/branch`);
                const data = await response.json();
    
                if (data && data.data) {
                    if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
                        const parsedCache = JSON.parse(cachedData);
                        
                        if (JSON.stringify(parsedCache) !== JSON.stringify(data.data)) {
                            console.log('Data updated from API');
                            setBranchs(data.data);
                            localStorage.setItem('promoCache', JSON.stringify(data.data));
                            localStorage.setItem('promoCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                        } else {
                            console.log('Loaded from cache');
                            setBranchs(parsedCache);
                        }
                    } else {
                        console.log('Fetched from API');
                        setBranchs(data.data);
                        localStorage.setItem('promoCache', JSON.stringify(data.data));
                        localStorage.setItem('promoCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                    }
                } else {
                    console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                if (cachedData) {
                    setBranchs(JSON.parse(cachedData));
                    console.log('Loaded from cache after API error');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
      }, [baseUrl]);

    if (loading) {
        return (
            <>
                <div className={loadingStyles.box}>
                    <div className={loadingStyles.content}>
                        <img src="../images/logo.svg"/>
                        <span>Loading</span>
                    </div>
                </div>
            </>
        );
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Kebijakan Privasi - NMW Aesthetic Clinic`,
        description: `Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda.`,
        url: `${mainUrl}/kebijakan-privasi`,
        publisher: {
        "@type": "Organization",
        name: "NMW Aesthetic Clinic",
        logo: {
            "@type": "ImageObject",
            url: `${mainUrl}/images/kebijakan-privasi.png`
        }
        },
        mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${mainUrl}/kebijakan-privasi`
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
                    item: `${mainUrl}/kebijakan-privasi`
                }
            ]
        }
    };

  return (
    <>
        <Head>
          <title>Kebijakan & Privasi | NMW Aesthetic Clinic</title>
          <meta name="description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content="Kebijakan Privasi NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/kebijakan-privasi`} />
          <meta property="og:image" content={`${mainUrl}/images/kebijakan-privasi.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kebijakan Privasi NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={`${mainUrl}/images/kebijakan-privasi.png`} />

          <link rel="canonical" href={`${mainUrl}/kebijakan-privasi`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
        <div className={banner.banner}>
            <img src="images/cabang-banner.png" alt="Layanan Nmw Aesthetic Clinic"/>
        </div>
        <div className={styles.container}>
            <div className={`${styles.heading_section}`}>
                <h1><font>Cabang</font> Kami</h1>
            </div>
            <div className={styles.cabang_layout}>
                {branchs.map(branch => (
                    <div className={styles.cabang_box} key={branch.id}>
                        <div className={styles.cabang_box_image}>
                            <img src={branch.image} alt={branch.name}/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>{branch.name}</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>{branch.address.replace(/<\/?p>/g, '')}</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>{branch.operasional[0]}</p>
                                    <p>{branch.operasional[1]}</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
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
    </>
  );
}
