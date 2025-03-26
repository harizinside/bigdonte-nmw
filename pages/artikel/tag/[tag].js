import { useState, useEffect } from 'react';
import styles from "@/styles/Article.module.css";
import banner from "@/styles/Banner.module.css";
import Link from 'next/link';
import { HiArrowLongRight } from "react-icons/hi2";
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import loadingStyles from "@/styles/Loading.module.css";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Image from 'next/image';

export async function getServerSideProps(context) {
    const { tag } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    let articlesAll = [];
    let filteredArticles = [];
    let tags = [];
    let dataTags = [];
    let settings = {};

    try {
        // Fetch site settings
        const settingsRes = await fetch(`${baseUrl}/settings`);
        settings = await settingsRes.json();

        // Fetch articles
        const articlesRes = await fetch(`${baseUrl}/article-new`);
        const articlesData = await articlesRes.json();
        if (articlesData?.articles) {
            articlesAll = articlesData?.articles;
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
        dataTags = tags?.tags
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return {
        props: {
            articlesAll,
            filteredArticles,
            dataTags,
            settings
        }
    };
}

export default function TagPage({ articlesAll, filteredArticles, tags, dataTags, settings }) {
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
            <div className={loadingStyles.box}>
                <div className={loadingStyles.content}>
                    <img src="../../images/logo.svg" alt="Loading" loading='lazy'/>
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Artikel dengan Tag ${tag || 'NMW Aesthetic Clinic'}`,
        description: `Temukan artikel-artikel terkait tag ${tag || 'NMW Aesthetic Clinic'}`,
        url: `${mainUrl}/article/tag/${tag || ''}`,
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
            "@id": `${mainUrl}/article/tag/${tag || ''}`
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
                    name: `Tag ${tag || 'NMW Aesthetic Clinic'}`,
                    item: `${mainUrl}/article/tag/${tag || ''}`
                }
            ]
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const metaImage = displayedArticles.length > 0 ? displayedArticles[0].image : `${mainUrl}/images/kebijakan-privasi.png`;

    return (
        <>
            <Head>
                <title>Tag {tag ? `${tag}` : 'NMW Aesthetic Clinic'} | NMW Aesthetic Clinic</title>
                <meta name="description" content={`Artikel dengan tag ${tag || 'NMW Aesthetic Clinic'}`} />
                <meta name="keywords" content="layanan medis, perawatan kulit, bedah plastik, konsultasi kesehatan, perawatan kecantikan, NMW Clinic, layanan kecantikan, perawatan wajah, estetika medis, klinik estetika, perawatan anti-aging, operasi plastik, perawatan rambut, perawatan tubuh, terapi kecantikan, klinik kecantikan NMW, dokter kecantikan, solusi kecantikan, layanan kecantikan medis, klinik bedah plastik, rejuvenasi kulit, konsultasi bedah plastik"/>

                <meta property="og:title" content={`Tag ${tag ? tag : 'NMW Aesthetic Clinic'} | NMW Aesthetic Clinic`} />
                <meta property="og:description" content={`Artikel dengan tag ${tag || 'NMW Aesthetic Clinic'}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${mainUrl}/article/tag/${tag || ''}`} />
                <meta property="og:image" content={metaImage} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Tag ${tag ? tag : 'NMW Aesthetic Clinic'} | NMW Aesthetic Clinic`} />
                <meta name="twitter:description" content={`article dengan tag ${tag || 'NMW Aesthetic Clinic'}`} />
                <meta name="twitter:image" content={metaImage} />

                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Head>
            <div className={breadcrumb.breadcrumb}>
                <h5><Link href={'/'}>Home</Link> / <Link href={'/article'}>Artikel</Link> / Tag / <span className={styles.tag_heading}><Link href={`${mainUrl}/article/tag/${tag || ''}`}>{tag}</Link></span></h5>
            </div>
            <div className={styles.article_section}>
                
                <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                    <h2>Artikel dengan tag <span className={styles.tag_heading}>{tag}</span></h2>
                </div>
                <div className={styles.article_container}>
                    <div className={styles.article_layout}>
                        {displayedArticles.length > 0 ? (
                            displayedArticles.map((article) => {
                                const firstTag = article.tags?.[0] || "";
                                return (
                                    <div className={styles.article_box} key={article._id}>
                                        <div className={styles.article_image}>
                                            {firstTag && (
                                                <Link href={`/article/tag/${firstTag.trim()}`}>
                                                    <button className={styles.tag_article_img}>#{firstTag.trim()}</button>
                                                </Link>
                                            )}
                                            <Link href={`/article/${article.slug}`}>
                                                <Image priority width={500} height={500} src={`${storageUrl}${article.image}`} alt={article.title}/>
                                            </Link>
                                        </div>
                                        <div className={styles.article_content}>
                                            <Link href={`/article/${article.slug}`}>
                                                <div className={styles.article_heading}>
                                                    <h3>{article.title}</h3>
                                                </div>
                                            </Link>
                                            <span>{article.author}, {formatDate(article.date)}</span>
                                            <Link href={`/article/${article.slug}`}>
                                                <button className={styles.btn_more}>Baca Selengkapnya</button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No articles found for this tag.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
