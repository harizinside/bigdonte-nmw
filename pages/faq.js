import banner from "@/styles/Banner.module.css"
import styles from "@/styles/faq.module.css"
import { IoChevronDown } from "react-icons/io5";
import { useEffect, useState } from "react";
import Head from "next/head";

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
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
                const response = await fetch(`${baseUrl}/faq`);
                const data = await response.json();
                if (data && data.data) { // Pastikan data dan data.data ada
                setFaqs(data.data); // Setel data objek banner
                } else {
                console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };
 
        fetchData();
    }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `FaQ - NMW Aesthetic Clinic`,
        description: `Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda.`,
        url: `${mainUrl}/faq`,
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
        "@id": `${mainUrl}/faq`
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
                    name: "FAQ",
                    item: `${mainUrl}/faq`
                }
            ]
        }
    };

  return (
    <>
    <Head>
        <title>Faq | NMW Aesthetic Clinic</title>
        <meta name="description" content="Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda." />
        <meta name="keywords" content="FAQ NMW Clinic, pertanyaan umum, layanan medis, perawatan kulit, konsultasi kesehatan, prosedur kecantikan, perawatan wajah, estetika medis, klinik kecantikan, operasi plastik, rejuvenasi kulit, konsultasi medis, perawatan anti-aging, informasi kesehatan, dokter kecantikan, solusi kecantikan, klinik estetika" />

        <meta property="og:title" content="FAQ NMW Aesthetic Clinic"  />
        <meta property="og:description" content="Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/faq`} />
        <meta property="og:image" content={`${mainUrl}/images/faq_banner.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ NMW Aesthetic Clinic" />
        <meta name="twitter:description" content="Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda." />
        <meta name="twitter:image" content={`${mainUrl}/images/faq_banner.png`} />

        <link rel="canonical" href={`${mainUrl}/faq`} />

        <script type="application/ld+json">
        {JSON.stringify(schemaData)}
        </script>
    </Head>

    <div className={banner.banner}>
        <img src="images/faq_banner.png" alt="Faq Nmw Aesthetic Clinic"/>
    </div>
    <div className={styles.faqPage}>
        <div className={`${styles.heading_section}`}>
            <h1><font>FAQ</font> (Pertanyaan Umum)</h1>
        </div>
        <div className={styles.faqList}>
            {faqs.map((faq, index) => (
            <div
                key={index}
                className={`${styles.faqItem} ${
                activeIndex === index ? styles.active : ""
                }`}
            >
                <button className={styles.question} onClick={() => toggleFAQ(index)}>
                    {faq.question}
                    <IoChevronDown/>
                </button>
                <div
                className={`${styles.answer} ${
                    activeIndex === index ? styles.show : ""
                }`}
                >
                <p>{faq.answer.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '')}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
    </>
  );
};

export default FAQPage;
