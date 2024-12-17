import { useState } from 'react';
import styles from "@/styles/Article.module.css"
import banner from "@/styles/Banner.module.css"
import Link from 'next/link';
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect } from 'react';
import Head from 'next/head';
import loadingStyles from "@/styles/Loading.module.css";

export async function getServerSideProps(context) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const currentPage = context.query.page || 2; // Menambahkan logika untuk halaman dinamis
  
    try {
      const [settingsRes, articlesRes, articlesAllRes, tagsRes] = await Promise.all([
        fetch(`${baseUrl}/setting`),
        fetch(`${baseUrl}/article-new`),
        fetch(`${baseUrl}/article?page=${currentPage}`),
        fetch(`${baseUrl}/get-tag`),
      ]);

      const [settingsData, articlesData, articlesAllData, tagsData] = await Promise.all([
        settingsRes.json(),
        articlesRes.json(),
        articlesAllRes.json(),
        tagsRes.json(),
      ]);

      const sortedArticles = articlesData.data?.sort((a, b) => {
        const dateA = new Date(a.date || a.created_at);
        const dateB = new Date(b.date || b.created_at);
        return dateB - dateA;
      }) || [];

      return {
        props: {
          settings: settingsData || {},
          articles: sortedArticles.slice(0, 3),
          articlesAll: articlesAllData.data || [],
          tags: tagsData || [],
          totalPages: articlesAllData.meta?.last_page || 1,
          currentPage: Number(currentPage),
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          settings: {},
          articles: [],
          articlesAll: [],
          tags: [],
          totalPages: 1,
          currentPage: 2,
        },
      };
    }
}


export default function Artikel({ settings, articles, articlesAll, tags, totalPages, currentPage }) {
    const [currentPagination, setCurrentPage] = useState(currentPage); // Menyimpan halaman yang sedang aktif

    const handleNextPage = () => {
        if (currentPagination < totalPages) {
            setCurrentPage(currentPagination + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPagination > 2) { // Mulai dari halaman 2
            setCurrentPage(currentPagination - 1);
        }
    };

    useEffect(() => {
        // Fetch data berdasarkan halaman yang aktif
        const fetchData = async () => {
            const response = await fetch(`/api/article?page=${currentPagination}`);
            const data = await response.json();
            // Proses data yang diambil (seperti menyet state baru jika perlu)
        };

        fetchData();
    }, [currentPagination]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Artikel - NMW Aesthetic Clinic`,
    description: `Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic`,
    url: `${mainUrl}/artikel`,
    publisher: {
    "@type": "Organization",
    name: "NMW Aesthetic Clinic",
    logo: {
        "@type": "ImageObject",
        url: `${settings.logo ? `${storageUrl}/${settings.logo}` : `${mainUrl}/images/kebijakan-privasi.png`}`
    }
    },
    mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${mainUrl}/artikel`
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
                name: "Promo",
                item: `${mainUrl}/artikel`
            }
        ]
    }
};

  return (
    <>
      <Head>
        <title>Artikel | NMW Aesthetic Clinic</title>
        <meta name="description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
        <meta property="og:title" content="Artikel | NMW Aesthetic Clinic" />
        <meta property="og:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/artikel`} />
        <meta property="og:image" content={settings.logo ? `${storageUrl}/${settings.logo}` : `${mainUrl}/images/kebijakan-privasi.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Artikel | NMW Aesthetic Clinic" />
        <meta name="twitter:description" content="Artikel terkait layanan estetika dan perawatan kulit dari NMW Aesthetic Clinic." />
        <meta name="twitter:image" content={settings.logo ? `${storageUrl}/${settings.logo}` : `${mainUrl}/images/kebijakan-privasi.png`} />
        <link rel="canonical" href={`${mainUrl}/artikel`} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Head>

      <div className={banner.banner}>
        <img src="images/slimming-treatment.png" alt="Layanan Nmw Aesthetic Clinic"/>
      </div>

        <div className={styles.container}>
            <div className={styles.tabsContainer}>
                <div className={styles.tabContent_container}>
                    <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                        <h1><font>Artikel</font> Terbaru</h1>
                    </div>
                    <div className={styles.heading_sidebar}>
                        <h1>Tag Artikel</h1>
                    </div>
                </div>
                <div className={styles.tabContent}>
                    <div className={styles.tabcontent_layout}>
                        <div className={styles.tabcontent_section}>
                        {articles.map((article) => {
                            const tagsList = article.tags ? article.tags.split(',') : [];

                            return (
                                <div className={styles.tabcontent_box} key={article.id}>
                                    <div className={styles.tabcontent_box_img}>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <img src={article.image} alt={article.title} />
                                        </Link>
                                        {tagsList.length > 0 && (
                                            <Link href={`/artikel/tag/${tagsList[0].trim()}`}>
                                                <button className={styles.tag_article_img}>#{tagsList[0].trim()}</button>
                                            </Link>
                                        )}
                                    </div>
                                    <div className={styles.tabcontent_box_text}>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <h1>{article.title}</h1>
                                        </Link>
                                        <span>Admin, {article.date}</span>
                                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: article.description }} />
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
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
            <h1><font>Artikel</font> Lain</h1>
        </div>
        <div className={styles.article_container}>
            <div className={styles.article_layout}>
                {articlesAll.map((article) => {
                    const tagsList = article.tags ? article.tags.split(',') : [];

                    return (
                        <div className={styles.article_box} key={article.id}>
                            <div className={styles.article_image}>
                                {tagsList.length > 0 && (
                                    <Link href={`/artikel/tag/${tagsList[0].trim()}`}>
                                        <button>#{tagsList[0].trim()}</button>
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
                    );
                })}
            </div>

            {/* Pagination Section */}
            <div className={styles.article_pagination}>
                {/* Tombol "Sebelumnya" */}
                <button onClick={handlePrevPage} disabled={currentPagination <= 2}>
                    Sebelumnya
                </button>

                {/* Menampilkan nomor halaman */}
                {[...Array(totalPages - 1)].map((_, index) => {
                    const pageNumber = index + 2; // Menampilkan halaman mulai dari 2

                    return (
                        <button
                            key={index}
                            className={currentPagination === pageNumber ? styles.active_pagination : ''}
                            onClick={() => setCurrentPage(pageNumber)} // Navigasi ke halaman yang benar
                        >
                            {pageNumber} {/* Menampilkan halaman mulai dari 2 */}
                        </button>
                    );
                })}

                {/* Tombol "Selanjutnya" */}
                <button onClick={handleNextPage} disabled={currentPagination >= totalPages}>
                    Selanjutnya
                </button>
            </div>
                    
        </div>
    </div>
    </>
  );
}
