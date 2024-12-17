import styles from "@/styles/Cabang.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import loadingStyles from "@/styles/Loading.module.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import { metadata as nextMetadata } from 'next/metadata';

const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

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
            url: `${mainUrl}/images/cabang-banner.png`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/cabang`
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
                    item: `${mainUrl}/cabang`
                }
            ]
        }
    };

// You can define your metadata object here
export const pageMetadata = {
  title: 'Cabang | NMW Aesthetic Clinic',
  description: 'Alamat Cabang NMW Aesthetic Clinic',
  keywords: 'cabang NMW Clinic, lokasi NMW Clinic, klinik kecantikan terdekat, klinik NMW, klinik estetika terbaik, layanan kecantikan profesional, dokter kecantikan terpercaya, konsultasi kecantikan, perawatan kulit, perawatan wajah, klinik kesehatan kulit, klinik bedah plastik, alamat NMW Clinic, klinik anti-aging, klinik perawatan rambut, layanan estetika medis, cabang klinik kecantikan, konsultasi medis estetika, perawatan tubuh, perawatan kecantikan terdekat, solusi kecantikan, dokter kecantikan terbaik, klinik kecantikan Indonesia',
  openGraph: {
    title: 'Cabang NMW Aesthetic Clinic',
    description: 'Alamat Cabang NMW Aesthetic Clinic',
    type: 'website',
    url: `${mainUrl}/cabang`, // Assuming mainUrl is set as an environment variable
    image: `${mainUrl}/images/cabang-banner.png`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabang NMW Aesthetic Clinic',
    description: 'Alamat Cabang NMW Aesthetic Clinic',
    image: `${mainUrl}/images/cabang-banner.png`
  },
  canonical: `${mainUrl}/cabang`,
  structuredData: JSON.stringify(schemaData) // Ensure schemaData is defined or imported
};

export default function Cabang(){
    const [branchs, setBranchs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState([]);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    

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

    


    return(
        <>
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
    )
}