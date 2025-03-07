import { useState, useEffect } from "react";
import styles from "@/styles/Dokter.module.css";
import banner from "@/styles/Banner.module.css";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import loadingStyles from "@/styles/Loading.module.css";
import Head from "next/head";
import Image from "next/image";
import breadcrumb from "@/styles/Breadcrumb.module.css"

export default function DokterKami() {
    const [doctors, setDoctors] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true); // Tambahkan state loading
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
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
                setIsLoading(false);
            }
        };
    
        fetchData();
      }, [baseUrl]);

      useEffect(() => {
        const fetchData = async () => {
            const cachedDoctors = localStorage.getItem('doctorsCache');
            const cacheExpiry = localStorage.getItem('doctorsCacheExpiry');
            const now = new Date().getTime();
    
            try {
                // Check if the cache is still valid
                if (cachedDoctors && cacheExpiry && now < parseInt(cacheExpiry)) {
                    const parsedCache = JSON.parse(cachedDoctors);
                    console.log('Loaded doctors from cache');
    
                    // Compare the cache with the latest fetched data to see if it's the same
                    let allDoctors = [];
                    let currentPage = 1;
                    let lastPage = 1;
    
                    let dataChanged = false;
    
                    while (currentPage <= lastPage) {
                        const response = await fetch(`${baseUrl}/doctor?page=${currentPage}`);
                        const data = await response.json();
    
                        if (data && data.data && data.meta) {
                            // Filter out duplicate doctors and check for new data
                            const uniqueDoctors = data.data.filter(
                                (doctor) => !allDoctors.some((existingDoctor) => existingDoctor.id === doctor.id)
                            );
                            allDoctors = [...allDoctors, ...uniqueDoctors];
                            lastPage = data.meta.last_page;
                            currentPage++;
    
                            // Check if there is any new data
                            if (JSON.stringify(allDoctors) !== JSON.stringify(parsedCache)) {
                                dataChanged = true;
                            }
                        } else {
                            console.error("Invalid response data format:", data);
                            break;
                        }
                    }
    
                    // If data has changed, update cache and state
                    if (dataChanged) {
                        localStorage.setItem('doctorsCache', JSON.stringify(allDoctors));
                        localStorage.setItem('doctorsCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                        console.log('Doctors data fetched and cached');
                        setDoctors(allDoctors);
                    } else {
                        console.log('No new doctor data. Loaded from cache.');
                        setDoctors(parsedCache);
                    }
                } else {
                    console.log('Fetching doctors from API');
                    let allDoctors = [];
                    let currentPage = 1;
                    let lastPage = 1;
    
                    while (currentPage <= lastPage) {
                        const response = await fetch(`${baseUrl}/doctor?page=${currentPage}`);
                        const data = await response.json();
    
                        if (data && data.data && data.meta) {
                            // Filter out duplicate doctors
                            const uniqueDoctors = data.data.filter(
                                (doctor) => !allDoctors.some((existingDoctor) => existingDoctor.id === doctor.id)
                            );
                            allDoctors = [...allDoctors, ...uniqueDoctors];
                            lastPage = data.meta.last_page;
                            currentPage++;
                        } else {
                            console.error("Invalid response data format:", data);
                            break;
                        }
                    }
    
                    // Cache the fetched data
                    localStorage.setItem('doctorsCache', JSON.stringify(allDoctors));
                    localStorage.setItem('doctorsCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                    setDoctors(allDoctors); // Set the state with the fetched data
                    console.log('Doctors data fetched and cached');
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
                // Optionally load from cache in case of an error
                if (cachedDoctors) {
                    setDoctors(JSON.parse(cachedDoctors));
                    console.log('Loaded doctors from cache after API error');
                }
            }
        };
    
        fetchData();
    }, [baseUrl]);    
    

    const handleTabClick = (index) => {
        setActiveTab(index);
        setCurrentPage(1); // Reset to the first page when the tab changes
    };

    const filterDoctors = (tabIndex) => {
        switch (tabIndex) {
            case 0: // Semua Departemen
                return doctors;
            case 1: // Estetika
                return doctors.filter((doc) => doc.position === "Estetika");
            case 2: // Bedah Plastik
                return doctors.filter((doc) => doc.position === "Bedah Plastik");
            case 3: // Dermatologi
                return doctors.filter((doc) =>
                    ["Dermatologi", "Dermatologi & Spesialis Kulit dan Kelamin"].includes(doc.position)
                );
            default:
                return [];
        }
    };

    const filteredDoctors = filterDoctors(activeTab);

    const paginatedDoctors = filteredDoctors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Dokter Kami - NMW Aesthetic Clinic`,
        description: `Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda`,
        url: `${mainUrl}/dokter-kami`,
        publisher: {
          "@type": "Organization",
          name: "NMW Aesthetic Clinic",
          logo: {
            "@type": "ImageObject",
            url: `${mainUrl}/images/dokter_banner.webp`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/dokter-kami`
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
                    name: "Dokter Kami",
                    item: `${mainUrl}/dokter-kami`
                }
            ]
        }
    };

    return (
        <>
            <Head>
                <title>Dokter Kami | NMW Aesthetic Clinic</title>
                <meta name="description" content="Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda" />
                <meta name="keywords" content="dokter kecantikan, dokter kulit, dokter spesialis estetika, ahli perawatan kulit, konsultasi kecantikan, dokter anti-aging, dokter bedah plastik, dokter perawatan wajah, dokter ahli dermatologi, spesialis kulit dan kecantikan, tim medis NMW Clinic, dokter profesional, layanan medis terbaik, konsultasi perawatan kulit, dokter klinik kecantikan, ahli kesehatan kulit, spesialis estetika medis, dokter terpercaya, dokter perawatan tubuh, konsultasi dokter estetika, dokter bedah estetika, dokter terbaik NMW Clinic" />

                <meta property="og:title" content="Dokter NMW Aesthetic Clinic"  />
                <meta property="og:description" content="Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${mainUrl}/dokter-kami`} />
                <meta property="og:image" content={`${mainUrl}/images/dokter_banner.webp`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Dokter NMW Aesthetic Clinic"  />
                <meta name="twitter:description" content="Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda" />
                <meta name="twitter:image" content={`${mainUrl}/images/dokter_banner.webp`} />

                <link rel="canonical" href={`${mainUrl}/dokter-kami`} />

                <script type="application/ld+json">
                {JSON.stringify(schemaData)}
                </script>
            </Head>

            <div className={banner.banner}>
                <Image priority width={900} height={900} src="/images/dokter_banner.webp" alt="Layanan NMW Aesthetic Clinic" />
            </div>
            <div className={breadcrumb.breadcrumb}>
                <h5><Link href={'/'}>Home</Link> / <span><Link href={'/dokter-kami'}>Dokter Kami</Link></span></h5>
            </div>
            <h1 className={styles.heading_hide}>Selamat Datang di Halaman Dokter Pada Website NMW Aesthetic Clinic</h1>
            <div className={styles.container}>
                <div className={styles.dokter_heading}>
                    <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                        <h2>
                            <span>Dokter</span> Kami
                        </h2>
                    </div>
                    <div className={styles.tabs}>
                        <button
                            className={activeTab === 0 ? styles.activeTab : styles.tab}
                            onClick={() => handleTabClick(0)}
                        >
                            Semua Departemen
                        </button>
                        <button
                            className={activeTab === 1 ? styles.activeTab : styles.tab}
                            onClick={() => handleTabClick(1)}
                        >
                            Estetika
                        </button>
                        <button
                            className={activeTab === 2 ? styles.activeTab : styles.tab}
                            onClick={() => handleTabClick(2)}
                        >
                            Bedah Plastik
                        </button>
                        <button
                            className={activeTab === 3 ? styles.activeTab : styles.tab}
                            onClick={() => handleTabClick(3)}
                        >
                            Dermatologi
                        </button>
                    </div>
                </div>
                <div className={styles.tabContent}>
                    <div className={styles.cabang_layout}>
                        {paginatedDoctors.length > 0 ? (
                            paginatedDoctors.map((doctor) => (
                                <div key={doctor.id} className={styles.cabang_box}>
                                    <div className={styles.cabang_box_image}>
                                        <Image width={800} height={800} priority src={`${storageUrl}/${doctor.image}`} alt={doctor.name}/>
                                    </div>
                                    <div className={styles.cabang_box_content}>
                                        <h3>
                                            dr. 
                                            <span> {doctor.name.split(' ')[1]} </span>
                                            {doctor.name.split(' ').slice(2).join(' ')}
                                        </h3>
                                        <span>{doctor.position}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={loadingStyles.box}>
                                <div className={loadingStyles.content}>
                                    <img src="../images/logo.svg" loading="lazy"/>
                                    <span>Loading</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredDoctors.length > itemsPerPage && (
                        <div className={styles.article_pagination}>
                            {Array.from({ length: Math.ceil(filteredDoctors.length / itemsPerPage) }, (_, index) => (
                                <Link
                                    href="#"
                                    key={index + 1}
                                    className={currentPage === index + 1 ? styles.active_pagination : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1); // Ubah halaman aktif
                                    }}
                                >
                                    {index + 1}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
