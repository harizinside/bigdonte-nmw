import { useState, useEffect } from 'react';
import styles from "@/styles/Article.module.css";
import banner from "@/styles/Banner.module.css";
import Link from 'next/link';
import { HiArrowLongRight } from "react-icons/hi2";
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import loadingStyles from "@/styles/Loading.module.css";

export async function getServerSideProps(context) {
    const { tag } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    let articlesAll = [];
    let filteredArticles = [];
    let tags = [];
    let settings = {};

    try {
        // Fetch site settings
        const settingsRes = await fetch(`${baseUrl}/setting`);
        settings = await settingsRes.json();

        // Fetch articles
        const articlesRes = await fetch(`${baseUrl}/article-new`);
        const articlesData = await articlesRes.json();
        if (articlesData?.data) {
            articlesAll = articlesData.data;
            // Filter articles by tag if available
            if (tag) {
                filteredArticles = articlesAll.filter(article => article.tags && article.tags.includes(tag));
            } else {
                filteredArticles = articlesAll;
            }
        }

        // Fetch tags for filtering purposes
        const tagsRes = await fetch(`${baseUrl}/get-tag`);
        tags = await tagsRes.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return {
        props: {
            articlesAll,
            filteredArticles,
            tags,
            settings
        }
    };
}

export default function TagPage({ articlesAll, filteredArticles, tags, settings }) {
    const router = useRouter();
    const { tag } = router.query;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    // If the page was rendered without a tag, use all articles
    const displayedArticles = tag ? filteredArticles : articlesAll;

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
          <title>Tag {tags ? `${tags}` : `Tag NMW Aesthetic Clinic`} | NMW Aesthetic Clinic </title>
          <meta name="description" content="Artikel NMW Aesthetic Clinic" />
          <meta name="keywords" content="layanan medis, perawatan kulit, bedah plastik, konsultasi kesehatan, perawatan kecantikan, NMW Clinic, layanan kecantikan, perawatan wajah, estetika medis, klinik estetika, perawatan anti-aging, operasi plastik, perawatan rambut, perawatan tubuh, terapi kecantikan, klinik kecantikan NMW, dokter kecantikan, solusi kecantikan, layanan kecantikan medis, klinik bedah plastik, rejuvenasi kulit, konsultasi bedah plastik"/>

          <meta property="og:title" content="Kebijakan Privasi NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Artikel NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/artikel/tag/${tags ? tags : ''}`} />
          <meta property="og:image" content={article.image[0] ? `${storageUrl}/${article.image[0]}` : `${mainUrl}/images/kebijakan-privasi.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kebijakan Privasi NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Artikel NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={article.image[0] ? `${storageUrl}/${article.image[0]}` : `${mainUrl}/images/kebijakan-privasi.png`} />

          <meta property="og:url" content={`${mainUrl}/artikel/tag/${tags ? tags : ''}`} />

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
                        displayedArticles.length > 0 ? (
                            displayedArticles.map((article) => {
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
