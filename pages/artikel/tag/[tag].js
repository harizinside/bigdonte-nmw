import { useState, useEffect } from 'react';
import styles from "@/styles/Article.module.css";
import banner from "@/styles/Banner.module.css";
import Link from 'next/link';
import { HiArrowLongRight } from "react-icons/hi2";
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import loadingStyles from "@/styles/Loading.module.css";

export default function TagsPage() {
    const router = useRouter();
    const { tag } = router.query;
    const [articlesAll, setArticlesAll] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state to prevent hydration issues
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
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${baseUrl}/article-new`);
                const data = await response.json();
                if (data) {
                    setArticlesAll(data.data);

                    if (tag) {
                        const filtered = data.data.filter(article => article.tags && article.tags.includes(tag)); // Filter articles by tag
                        setFilteredArticles(filtered);
                    } else {
                        setFilteredArticles(data.data); // If no tag, show all articles
                    }
                } else {
                    console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false); // Stop loading after the data is fetched
            }
        };

        fetchArticles();
    }, [tag]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(`${baseUrl}/get-tag`);
                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);

    if (loading) {
        return (
            <>
                <div className={loadingStyles.box}>
                    <div className={loadingStyles.content}>
                        <img src="../../images/logo.svg"/>
                        <span>Loading</span>
                    </div>
                </div>
            </>
        );
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Tag ${tag}}`, // Pastikan nama halaman atau artikel yang relevan
        description: "Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic.", // Tambahkan deskripsi yang relevan untuk SEO
        url: `${mainUrl}/artikel/tag/${tag}`, // URL halaman saat ini
        publisher: {
          "@type": "Organization",
          name: "NMW Aesthetic Clinic",
          logo: {
            "@type": "ImageObject",
            url: `${storageUrl}/${settings.logo}` // Pastikan ini mengarah ke logo yang benar
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/artikel/tag/${tag}` // Mengidentifikasi URL halaman ini
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
                name: "Artikel",
                item: `${mainUrl}/artikel`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${tag}`,
                item: `${mainUrl}/artikel/${tag}`
              }
            ]
          }
      }; 

    return (
        <>
            <Head>
                <title>{`Tag ${tag}`} | NMW Aesthetic Clinic</title>
                <meta name="description" content="Artikel NMW Aesthetic Clinic" />
                <meta name="keywords" content="layanan medis, perawatan kulit, bedah plastik, konsultasi kesehatan, perawatan kecantikan, NMW Clinic, layanan kecantikan, perawatan wajah, estetika medis, klinik estetika, perawatan anti-aging, operasi plastik, perawatan rambut, perawatan tubuh, terapi kecantikan, klinik kecantikan NMW, dokter kecantikan, solusi kecantikan, layanan kecantikan medis, klinik bedah plastik, rejuvenasi kulit, konsultasi bedah plastik" />

                <meta property="og:title" content={`Tag ${tag}`} />
                <meta property="og:description" content="Artikel NMW Aesthetic Clinic" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${mainUrl}/artikel/tag/${tag}`} />
                <meta property="og:image" content={`${storageUrl}/${settings.favicon}`}/>

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Tag ${tag}`} />
                <meta name="twitter:description" content="Artikel NMW Aesthetic Clinic" />
                <meta name="twitter:image" content={`${storageUrl}/${settings.favicon}`}/>

                <link rel="canonical" href={`${mainUrl}/artikel/tag/${tag}`} />

                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Head>

            <div className={styles.article_section}>
                <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                    <h1>Artikel dengan tag <font className={styles.tag_heading}>{tag}</font></h1>
                </div>
                <div className={styles.article_container}>
                    <div className={styles.article_layout}>
                        {loading ? (
                            <p>Loading...</p> // Add loading state message or skeleton loader
                        ) : (
                            filteredArticles.length > 0 ? (
                                filteredArticles.map((article) => {
                                    const tagsList = article.tags ? article.tags.split(',') : [];
                                    return(
                                        <div className={styles.article_box} key={article.id}>
                                            <div className={styles.article_image}>
                                                {tagsList.length > 0 && (
                                                    <Link href={`${tagsList[0].trim()}`}>
                                                        <button className={styles.tag_article_img}>#{tagsList[0].trim()}</button>
                                                    </Link>
                                                )}
                                                <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                                    <img src={article.image} alt={article.title} />
                                                </Link>
                                            </div>
                                            <div className={styles.article_content}>
                                                <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                                    <div className={styles.article_heading}>
                                                        <h1>{article.title}</h1>
                                                    </div>
                                                </Link>
                                                <span>Admin, {article.date}</span>
                                                <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                                    <button className={styles.btn_more}>Baca Selengkapnya</button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                            })
                            ) : (
                                <p>No articles found for this tag.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
