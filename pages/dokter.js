import Head from "next/head";
import banner from "../styles/Banner.module.css";
import { useState } from "react";
import styles from "@/styles/Dokter.module.css";
import loadingStyles from "@/styles/Loading.module.css";

export async function getServerSideProps() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        // Fetch positions for tabs
        const positionsRes = await fetch(`${baseUrl}/position`);
        const positionsData = await positionsRes.json();

        // Initialize positions with their respective data counts
        const positionsWithCounts = await Promise.all(
            positionsData.map(async (item) => {
                const res = await fetch(`${baseUrl}/position?position=${encodeURIComponent(item.position)}`);
                const data = await res.json();
                return { position: item.position, count: data.length };
            })
        );

        // Filter positions with more than 1 data
        const filteredPositions = positionsWithCounts.filter((item) => item.count > 1).map((item) => item.position);

        // Fetch default content for "All" tab
        const page = 1;
        const perPage = 8;
        const response = await fetch(`${baseUrl}/doctor?page=${page}&per_page=${perPage}`);
        const doctorsData = await response.json();

        return {
            props: {
                initialPositions: ["Semua Departemen", ...filteredPositions],
                initialDoctors: doctorsData.data || [],
                pagination: doctorsData.meta || {},
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                initialPositions: [],
                initialDoctors: [],
                pagination: {},
            },
        };
    }
}

export default function Dokter({ initialPositions, initialDoctors, pagination }){
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    const [activeTab, setActiveTab] = useState("Semua Departemen");
    const [tabContent, setTabContent] = useState(initialDoctors);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(pagination.last_page || 1);

    const handleTabClick = async (tab) => {
        setActiveTab(tab);

        // Reset page to 1 when switching tabs
        setCurrentPage(1);

        if (tab === "Semua Departemen") {
            setTabContent(initialDoctors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/position?position=${encodeURIComponent(tab)}`);
            const data = await response.json();
            setTabContent(data || []);
        } catch (error) {
            console.error("Error fetching tab content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = async (page) => {
        setLoading(true);
        setCurrentPage(page);
        
        try {
            const response = await fetch(`/api/doctor?page=${page}&per_page=8`);
            
            // Periksa apakah response adalah JSON
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setTabContent(data.data || []);
                setTotalPages(data.meta.last_page || 1);
            } else {
                console.error("Expected JSON, but got:", contentType);
                // Tangani error jika bukan JSON
            }
        } catch (error) {
            console.error("Error fetching page:", error);
        } finally {
            setLoading(false);
        }
    };    

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Dokter Kami - NMW Aesthetic Clinic`,
        description: `Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda`,
        url: `${mainUrl}/dokter`,
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
          "@id": `${mainUrl}/dokter`
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
                    item: `${mainUrl}/dokter`
                }
            ]
        }
    };

    return(
        <>
            <Head>
                <title>Dokter Kami | NMW Aesthetic Clinic</title>
                <meta name="description" content="Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda" />
                <meta name="keywords" content="dokter kecantikan, dokter kulit, dokter spesialis estetika, ahli perawatan kulit, konsultasi kecantikan, dokter anti-aging, dokter bedah plastik, dokter perawatan wajah, dokter ahli dermatologi, spesialis kulit dan kecantikan, tim medis NMW Clinic, dokter profesional, layanan medis terbaik, konsultasi perawatan kulit, dokter klinik kecantikan, ahli kesehatan kulit, spesialis estetika medis, dokter terpercaya, dokter perawatan tubuh, konsultasi dokter estetika, dokter bedah estetika, dokter terbaik NMW Clinic" />

                <meta property="og:title" content="Dokter NMW Aesthetic Clinic"  />
                <meta property="og:description" content="Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${mainUrl}/dokter`} />
                <meta property="og:image" content={`${mainUrl}/images/dokter_banner.webp`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Dokter NMW Aesthetic Clinic"  />
                <meta name="twitter:description" content="Kenali tim dokter profesional di NMW Aesthetic Clinic yang siap memberikan perawatan terbaik untuk kesehatan Anda" />
                <meta name="twitter:image" content={`${mainUrl}/images/dokter_banner.webp`} />

                <link rel="canonical" href={`${mainUrl}/dokter`} />

                <script type="application/ld+json">
                {JSON.stringify(schemaData)}
                </script>
            </Head>
            <div className={banner.banner}>
                <img src="/images/dokter_banner.webp" loading="lazy" alt="Layanan NMW Aesthetic Clinic" />
            </div>
            <div className={styles.container}>
                <div className={styles.dokter_heading}>
                    <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                        <h1>
                            <font>Dokter</font> Kami
                        </h1>
                    </div>
                    <div className={styles.tabs}>
                        {initialPositions.map((position) => (
                            <button
                                key={position}
                                className={activeTab === position ? styles.activeTab : styles.tab}
                                onClick={() => handleTabClick(position)}
                            >
                                {position}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.tabContent}>
                    <div className={styles.cabang_layout}>
                        {tabContent.length > 0 ? (
                            tabContent.map((item, index) => (
                                <div key={index} className={styles.cabang_box}>
                                    <div className={styles.cabang_box_image}>
                                        <img src={`${storageUrl}/${item.image}`} alt={item.name} loading="lazy"/>
                                    </div>
                                    <div className={styles.cabang_box_content}>
                                        <h1>
                                            dr. 
                                            <font> {item.name.split(' ')[1]} </font>
                                            {item.name.split(' ').slice(2).join(' ')}
                                        </h1>
                                        <span>{item.position}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>Not found</h1>
                        )}
                    </div>
                    <div className={styles.article_pagination}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                        >
                            Sebelumnya
                        </button>
                        <button><font>{currentPage}</font> / {totalPages}</button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                        >
                            Selanjutnya
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}