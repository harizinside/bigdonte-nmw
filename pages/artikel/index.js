import { useState } from 'react';
import styles from "@/styles/Article.module.css"
import banner from "@/styles/Banner.module.css"
import Link from 'next/link';
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect } from 'react';
import Head from 'next/head';
import loadingStyles from "@/styles/Loading.module.css";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Image from 'next/image';

export default function Article() {
    const [articles, setArticles] = useState([]);
    const [articlesAll, setArticlesAll] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman yang aktif
    const [totalPages, setTotalPages] = useState(1); 
    const [loading, setLoading] = useState(true); // Tambahkan state loading

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`api/article-new`);
                const data = await response.json();
                if (data && data.articles) { // Pastikan data dan data.data ada
                    // Ambil artikel dari data.data
                    const articles = data.articles;
    
                    // Urutkan artikel berdasarkan 'date' dan 'created_at' yang paling baru
                    const sortedArticles = articles.sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        const createdAtA = new Date(a.created_at);
                        const createdAtB = new Date(b.created_at);
    
                        // Urutkan berdasarkan 'date' jika ada, jika tidak, urutkan berdasarkan 'created_at'
                        return (dateB - dateA) || (createdAtB - createdAtA);
                    });
    
                    // Ambil 3 artikel pertama setelah diurutkan
                    setArticles(sortedArticles.slice(0, 3));
                } else {
                    console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [baseUrl]);    
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Aktifkan loading saat fetch mulai
            try {
                const response = await fetch(`/api/article-new`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const data = await response.json();
    
                // Hilangkan 3 artikel terbaru
                setArticlesAll(data.articles.slice(3));
            } catch (error) {
                console.error("❌ Error fetching articles:", error);
            } finally {
                setLoading(false); // Matikan loading setelah fetch selesai
            }
        };
    
        fetchData();
    }, []);    

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/get-tag`);
                const data = await response.json();
                setTags(data?.tags); // Langsung mengatur data JSON yang diterima
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchData();
      }, [baseUrl]);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(date);
      };

      if (loading) {
            return (
                <>
                    <div className={loadingStyles.box}>
                        <div className={loadingStyles.content}>
                            <img src="../images/logo.svg" loading='lazy'/>
                            <span>Loading</span>
                        </div>
                    </div>
                </>
            );
        }

  const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Artikel - NMW Aesthetic Clinic`,
      description: `Temukan jawaban atas pertanyaan umum tentang layanan, perawatan, konsultasi, dan prosedur medis di NMW Aesthetic Clinic. Dapatkan informasi lengkap untuk perawatan kecantikan dan kesehatan kulit Anda.`,
      url: `${mainUrl}/article`,
      publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
          "@type": "ImageObject",
          url: `${mainUrl}/images/slimming-treatment.webp`
        }
      },
      mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}/article`
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
                  name: "Artikel",
                  item: `${mainUrl}/article`
              }
          ]
      }
  };

  return (
    <>
        <Head>
          <title>Artikel | NMW Aesthetic Clinic</title>
          <meta name="description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
          <meta name="keywords" content="Artikel NMW Aesthetic Clinic, Perawatan Estetika, Layanan Kecantikan, Artikel Kesehatan Kulit, Tips Kecantikan, NMW Aesthetic Clinic Blog, Artikel Terbaru Kecantikan, Perawatan Kulit Wajah, Perawatan Tubuh, Kecantikan Wanita, Artikel Kecantikan Terpercaya, NMW Estetika, Artikel Perawatan Kulit, Klinik Kecantikan, Tips Perawatan Kulit" />

          <meta property="og:title" content="Artikel | NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/article`} />
          <meta property="og:image" content={`${mainUrl}/images/logo.svg`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Artikel | NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
          <meta name="twitter:image" content={`${mainUrl}/images/logo.svg`} />

          <link rel="canonical" href={`${mainUrl}/article`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
      <div className={banner.banner}>
        <img src="images/slimming-treatment.webp" loading='lazy' alt="Layanan Nmw Aesthetic Clinic"/>
    </div>
    <div className={breadcrumb.breadcrumb}>
        <h5><Link href={'/'}>Home</Link> / <span>Artikel</span></h5>
    </div>
    <h1 className={styles.heading_hide}>Selamat Datang di Page Artikel Website NMW Aesthetic Clinic</h1>
    <div className={styles.container}>
        <div className={styles.tabsContainer}>
            <div className={styles.tabContent_container}>
                <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                    <h2><span>Artikel</span> Terbaru</h2>
                </div>
                <div className={styles.heading_sidebar}>
                    <h2>Tag Artikel</h2>
                </div>
            </div>
            <div className={styles.tabContent}>
                <div className={styles.tabcontent_layout}>
                    <div className={styles.tabcontent_section}>
                    {articles.map((article) => {
                        const firstTag = article.tags?.[0] || "";

                        return (
                            <div className={styles.tabcontent_box} key={article._id}>
                                <div className={styles.tabcontent_box_img}>
                                    <Link href={`/artikel/${article.slug}`}>
                                        <Image priority width={500} height={500}  src={`${storageUrl}/${article.image}`}  alt={article.title}/>
                                    </Link>
                                    {firstTag && (
                                    <Link href={`/artikel/tag/${firstTag.trim()}`}>
                                        <button className={styles.tag_article_img}>#{firstTag.trim()}</button>
                                    </Link>
                                    )}
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <Link href={`/artikel/${article.slug}`}>
                                        <h3>{article.title}</h3>
                                    </Link>
                                    <span>{article.author}, {formatDate(article.date)}</span>
                                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: article.description }} />
                                    <Link href={`/artikel/${article.slug}`}>
                                        <button>Baca Selengkapnya</button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}

                    </div>
                    <div className={styles.article_sidebar_layout}>
                        <h3 className={styles.heading_sidebar_mobile}>Tag Artikel</h3>
                        <div className={styles.article_sidebar_button}>
                        {tags.length > 0 ? (
                            tags.map((tag, index) => {
                                // Buat URL dengan format artikel/[tag]
                                const tagUrl = `/artikel/tag/${tag.trim()}`;
                                return (
                                    <Link href={tagUrl} key={index}>
                                        <button>{tag.trim()}</button>
                                    </Link>
                                );
                            })
                        ) : (
                            <p>No tags available</p>
                        )}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    <div className={styles.article_section}>
        <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
            <h2><span>Artikel</span> Lain</h2>
        </div>
        <div className={styles.article_container}>
            <div className={styles.article_layout}>
                {articlesAll.map((article, index) => {
                    const firstTag = article.tags?.[0] || "";

                    return (
                        <div className={styles.article_box} key={article._id || index}>
                            <div className={styles.article_image}>
                                {firstTag && (
                                    <Link href={`/artikel/tag/${firstTag.trim()}`}>
                                        <button className={styles.tag_article_img}>#{firstTag.trim()}</button>
                                    </Link>
                                )}
                                <Link href={`/artikel/${article.slug}`}>
                                    <Image priority width={500} height={500} src={`${storageUrl}${article.image}`} alt={article.title}/>
                                </Link>
                            </div>
                            <div className={styles.article_content}>
                                <Link href={`/artikel/${article.slug}`}>
                                    <div className={styles.article_heading}>
                                        <h3>{article.title}</h3>
                                    </div>
                                </Link>
                                <span>{article.author}, {formatDate(article.date)}</span>
                                <Link href={`/artikel/${article.slug}`}>
                                    <button className={styles.btn_more}>Baca Selengkapnya</button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>



            
        </div>
    </div>
    </>
  );
}
