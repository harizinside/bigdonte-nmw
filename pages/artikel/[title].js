import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Detail.module.css";
import stylesAll from "@/styles/Article.module.css"
import loadingStyles from "@/styles/Loading.module.css";
import not from "@/styles/Not.module.css";
import Link from 'next/link';
import Head from 'next/head';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export async function getServerSideProps() {
    context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    const { title } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    let articleDetail = null;
    let articles = [];
    let articlesAll = [];
    let settings = {};
    let tos = null;
    let doctor = null;
    let currentPage = 1;
    let totalPages = 1;
  
    try {
      const articlesRes = await fetch(`${baseUrl}/article-new`);
      const articlesData = await articlesRes.json();
      articles = articlesData?.data || [];
  
      if (title && articles.length > 0) {
        const matchedArticle = articles.find(article =>
          article.title.replace(/\s+/g, '-').toLowerCase() === title
        );
  
        if (matchedArticle) {
          const detailRes = await fetch(`${baseUrl}/detail-artikel?id=${matchedArticle.id}`);
          const detailData = await detailRes.json();
          const data = detailData?.data || {};
  
          articleDetail = {
            ...data,
            products: typeof data.products === 'string' ? JSON.parse(data.products) : data.products || [],
            service: typeof data.service === 'string' ? JSON.parse(data.service) : data.service,
            doctor: typeof data.doctor === 'string' ? JSON.parse(data.doctor) : data.doctor
          };
  
          const filteredArticles = articles.filter(article => article.id !== matchedArticle.id);
          articles = filteredArticles.slice(0, 3);
        }
      }
  
      if (articleDetail?.service?.id) {
        const tosRes = await fetch(`${baseUrl}/tos/${articleDetail.service.id}`);
        const tosData = await tosRes.json();
        tos = tosData?.data || null;
      }
  
      if (articleDetail?.doctor?.id) {
        const doctorRes = await fetch(`${baseUrl}/doctor_single/${articleDetail.doctor.id}`);
        const doctorData = await doctorRes.json();
        doctor = doctorData?.data || null;
      }
  
      const settingsRes = await fetch(`${baseUrl}/setting`);
      settings = await settingsRes.json();
  
      const articlesAllRes = await fetch(`${baseUrl}/article?page=${currentPage}`);
      const articlesAllData = await articlesAllRes.json();
      articlesAll = articlesAllData?.data || [];
      totalPages = articlesAllData?.meta?.last_page || 1;
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    return {
      props: {
        articleDetail,
        articles,
        articlesAll,
        settings,
        tos,
        doctor,
        currentPage,
        totalPages
      }
    };
  }

  export default function DetailArtikel({ articleDetail, articles, articlesAll, settings, tos, doctor, currentPage, totalPages }){
      const router = useRouter();
      const [page, setPage] = useState(currentPage);
  
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
      const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  
      useEffect(() => {
          if (articleDetail) {
            setLoading(false);
          }
        }, [articleDetail]);
  
      const handleNextPage = () => {
          if (page < totalPages) {
          setPage(page + 1);
          }
      };
  
      const handlePrevPage = () => {
          if (page > 1) {
          setPage(page - 1);
          }
      };

  return (
    <>
        <Head>
          <title>{articleDetail.title} | NMW Aesthetic Clinic</title>
          <meta name="description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content="Kebijakan Privasi NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/artikel/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`} />
          <meta property="og:image" content={`${mainUrl}/images/kebijakan-privasi.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kebijakan Privasi NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={`${mainUrl}/images/kebijakan-privasi.png`} />

          <link rel="canonical" href={`${mainUrl}/artikel/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
      <div className={banner.banner}>
            <img src={articleDetail.image} alt={articleDetail.title} /> 
            {articleDetail.image_source ? (
                <div className={banner.image_source}>
                    <Link href={articleDetail.image_source} target="_blank">{articleDetail.image_source_name}</Link>
                </div>
            ) : null }
        </div>
        <div className={styles.container}>
            <div className={styles.detail_tag}>
                {tags.map((tag, index) => (
                    <Link href={`tag/${tag.trim()}`} key={index}>
                        <button>
                            #{tag.trim()}
                        </button>
                    </Link>
                ))}
            </div>
            <div className={styles.container_layout}>
                <div className={styles.container_content}>
                    <div className={styles.content_heading}>
                        <h1>{articleDetail.title}</h1>
                        <span>{articleDetail.author}, {articleDetail.date}</span>
                    </div>
                    <div className={styles.content_text}>
                        <div dangerouslySetInnerHTML={{ __html: articleDetail.description }} />
                        <div className={styles.author_meta}>
                            <p>Penulis : {articleDetail.author}</p>
                            <p>Editor : {articleDetail.editor}</p>
                            <p>Sumber : {articleDetail.source_link}</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.container_sidebar} ${styles.dekstop_block}`}>
                    <div className={styles.sidebar_heading}>
                        <h4>Artikel Lain</h4>
                        <Link href={"/artikel"}>Lihat lebih banyak</Link>
                    </div>
                    <div className={styles.sidebar_layout}>
                        {articles.map(article => {
                            const tagsList = article.tags ? article.tags.split(',') : [];

                            return(
                                <div className={styles.article_box} key={article.id}>
                                    <div className={styles.article_image}>
                                        {tagsList.length > 0 && (
                                            <Link href={`tag/${tagsList[0].trim()}`}>
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
                                        <span>Admin, {article.date}</span>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <button className={styles.btn_more}>Baca Selengkapnya</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.container_sc}>
            {Array.isArray(articleDetail.products) && articleDetail.products.length > 0 ? (
                <div className={styles.product_detail}>
                    <div className={styles.layanan_heading}>
                        <h3>Produk <font>Artikel Ini</font></h3>
                    </div>
                    <div className={styles.product_detail_layout}>
                        {articleDetail.products.map((product, index) => (
                            <div className={styles.article_box} key={index}>
                                <div className={`${styles.article_image} ${styles.article_image_product}`}>
                                    <Link href={product.link} target="_blank">
                                        <img
                                            src={`${storageUrl}/${product.image}`}
                                            alt={product.name}
                                        />
                                    </Link>
                                </div>
                                <div className={`${styles.article_content} ${styles.article_product}`}>
                                    <Link href={product.link} target="_blank">
                                        <div className={styles.article_heading}>
                                            <h1>{product.name}</h1>
                                        </div>
                                    </Link>
                                    <p>{product.description}</p>
                                    <Link href={product.link} target="_blank">
                                        <button className={styles.btn_more}>Lihat Produk</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null }
            <div className={styles.container_layout}>
                {tos && tos.id ? (
                    <div className={styles.layanan}>
                        <div className={styles.layanan_heading}>
                            <h3>Terkait <font>Artikel Ini</font></h3>
                        </div>
                        <div className={styles.box_service_layout}>
                            <div className={styles.box_service} key={tos.id}>
                                <div className={styles.box_service_image}>
                                    <Link href={`/jenis-layanan/${tos.slug}`} >
                                        <img
                                            src={`${storageUrl}/${tos.image}`}
                                            alt={tos.title}
                                        />
                                    </Link>
                                </div>
                                <div className={styles.box_service_content}>
                                    <Link href={`/jenis-layanan/${tos.slug}`} ><h1>{tos.title}</h1></Link>
                                    <p
                                        className={styles.service_description}
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                tos.description === "-"
                                                    ? "Klik lihat detail untuk mendapatkan informasi selengkapnya tentang layanan ini"
                                                    : tos.description,
                                        }}
                                    />
                                    <div className={styles.box_service_btn}>
                                        <Link href={`/jenis-layanan/${tos.slug}`} >
                                            <button>Lihat Detail</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {doctor && doctor.id ? (
                <div className={styles.container_sidebar}>
                    <div className={styles.layanan_heading}>
                        <h3> <font>Dokter</font> Terkait</h3>
                    </div>
                    <div className={`${styles.sidebar_layout} ${styles.sidebar_layout_sc}`}>
                        <div className={`${styles.article_box} ${styles.doctor_box}`} key={doctor.id}>
                            <div className={`${styles.article_image} ${styles.article_image_product} ${styles.article_image_doctor}`}>
                                <img
                                    src={`${doctor.image}`}
                                    alt={doctor.name}
                                />
                            </div>
                            <div className={styles.article_content}>
                                <div className={styles.article_heading}>
                                    <h1>{doctor.name}</h1>
                                </div>
                                <p>{doctor.position}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null}
            </div>
            <div className={`${styles.container_sidebar} ${styles.mobile_block}`}>
                <div className={styles.sidebar_heading}>
                    <h4>Artikel Lain</h4>
                    <Link href={"/artikel"}>Lihat lebih banyak</Link>
                </div>
                <div className={styles.sidebar_layout}>
                    {articles.map(article => {
                        const tagsList = article.tags ? article.tags.split(',') : [];

                        return(
                            <div className={styles.article_box} key={article.id}>
                                <div className={styles.article_image}>
                                    {tagsList.length > 0 && (
                                        <Link href={`tag/${tagsList[0].trim()}`}>
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
                                    <span>Admin, {article.date}</span>
                                    <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                        <button className={styles.btn_more}>Baca Selengkapnya</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
  );
}
