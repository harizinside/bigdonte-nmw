import banner from "@/styles/Banner.module.css"
import styles from "@/styles/Award.module.css"
import { useState, useEffect } from 'react';
import Head from "next/head";
import not from "@/styles/Not.module.css";

export default function Achievment(){

    const [achievments, setAchievments] = useState([]);
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
                const response = await fetch(`${baseUrl}/achievment`);
                const data = await response.json();
                if (data && data.data) { // Pastikan data dan data.data ada
                setAchievments(data.data); // Setel data objek banner
                } else {
                console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };
 
        fetchData();
    }, []);


    const [isOpen, setIsOpen] = useState(false);
    const [popupImage, setPopupImage] = useState("");

    const handleImageClick = (src) => {
        setPopupImage(src);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Penghargaan - NMW Aesthetic Clinic`,
        description: `Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional`,
        url: `${mainUrl}/achievment`,
        publisher: {
        "@type": "Organization",
        name: "NMW Aesthetic Clinic",
        logo: {
            "@type": "ImageObject",
            url: `${mainUrl}/images/banner_award.png`
        }
        },
        mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${mainUrl}/achievment`
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
                    name: "Achievment",
                    item: `${mainUrl}/achievment`
                }
            ]
        }
    };

    if (!achievments || achievments.length === 0) {
        return (
            <>
                <div className={not.box}>
                    <div className={not.content}>
                        <img src="../images/not-found.png" alt='Artikel Tidak Ditemukan' />
                        <span>Penghargaan Tidak Ditemukan</span>
                    </div>
                </div>
            </>
        );
    }

    return(
        <>
            <Head>
                <title>Penghargaan | NMW Aesthetic Clinic</title>
                <meta name="description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
                <meta name="keywords" content="pencapaian NMW Clinic, penghargaan klinik kecantikan, prestasi NMW Aesthetic Clinic, penghargaan layanan medis, pencapaian klinik estetika, inovasi medis, pengakuan industri kecantikan, sertifikasi kecantikan, penghargaan layanan terbaik, prestasi klinik kecantikan, penghargaan perawatan kulit, pencapaian layanan kesehatan, penghargaan dokter kecantikan, pengakuan klinik medis, pencapaian global NMW Clinic" />

                <meta property="og:title" content="Achievment NMW Aesthetic Clinic"  />
                <meta property="og:description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${mainUrl}/achievment`} />
                <meta property="og:image" content={`${mainUrl}/images/banner_award.png`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Achievment NMW Aesthetic Clinic" />
                <meta name="twitter:description" content="Lihat daftar penghargaan yang telah diraih oleh NMW Aesthetic Clinic sebagai bukti komitmen kami dalam memberikan layanan kesehatan terbaik dan profesional" />
                <meta name="twitter:image" content={`${mainUrl}/images/banner_award.png`} />

                <link rel="canonical" href={`${mainUrl}/achievment`} />

                <script type="application/ld+json">
                {JSON.stringify(schemaData)}
                </script>
            </Head>
            <div className={banner.banner}>
                <img src="images/banner_award.png" alt="Layanan Nmw Aesthetic Clinic"/>
            </div>
            <div className={styles.container}>
                <div className={`${styles.heading_section}`}>
                    <h1><font>Penghargaan</font> Kami</h1>
                </div>
                <div className={styles.cabang_layout}>
                    {achievments.map(achievment => (
                    <div className={styles.cabang_box} key={achievment.id}>
                        <div 
                            className={styles.cabang_box_image} 
                            onClick={() => handleImageClick(`${storageUrl}/${achievment.image}`)}
                            >
                            <img src={`${storageUrl}/${achievment.image}`} alt={achievment.heading} />
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>{achievment.heading}</h1>
                            <div className={styles.cabang_box_text}>
                            <div 
                                dangerouslySetInnerHTML={{ __html: achievment.description }} 
                                />
                            </div>
                        </div>
                    </div>
                    ))}

                    {/* Modal Popup */}
                    {isOpen && (
                        <div className={styles.modal}>
                            <div className={styles.overlay_modal} onClick={closeModal}></div>
                            <div className={styles.modal_content}>
                                <span className={styles.close} onClick={closeModal}>&times;</span>
                                <img src={popupImage} alt="Popup Image" className={styles.popup_image} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}