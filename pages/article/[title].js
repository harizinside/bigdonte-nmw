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
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export async function getServerSideProps(context) {
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

      const [toc, setToc] = useState([]);
      const contentRef = useRef(null);
  
      useEffect(() => {
        if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll("h2, h3");
            const tocItems = Array.from(headings).map((heading, index) => {
                const id = `section-${index}`;
                heading.setAttribute("id", id);
                return { id, text: heading.innerText, tag: heading.tagName };
            });

            setToc(tocItems);
        }
    }, [articleDetail.description]);
  
      // Sisipkan Daftar Isi setelah paragraf pertama
      let modifiedDescription = articleDetail.description;
      if (toc.length > 0) {
        const tocHTML = `
            <div class=${styles.table_of_content}>
                <h2>Daftar Isi</h2>
                <ul>
                    ${toc.map(item => `
                        <li class="${item.tag === "H2" ? "h2-item" : "h3-item"}">
                            <a href="#${item.id}" class="toc-link" data-target="${item.id}">${item.text}</a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `;
        modifiedDescription = modifiedDescription.replace(/(<p[^>]*>.*?<\/p>)/, `$1${tocHTML}`);
    }
  
      useEffect(() => {
        const links = document.querySelectorAll(".toc-link");
        const handleClick = (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute("data-target");
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        links.forEach(link => link.addEventListener("click", handleClick));

        return () => {
            links.forEach(link => link.removeEventListener("click", handleClick));
        };
    }, [toc]);

  
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

      const tags = articleDetail.tags ? articleDetail.tags.split(',') : [];

    const cleanDescription = articleDetail.description.replace(/<[^>]*>/g, ''); // Menghapus semua tag HTML

    const shortDescription = cleanDescription.length > 100 
    ? cleanDescription.substring(0, 100) + "..." 
    : cleanDescription;

    const plainText = articleDetail.description.replace(/<\/?[^>]+(>|$)/g, "");

    const [htmlContent, setHtmlContent] = useState("");

    const [htmlContentSc, setHtmlContentSc] = useState("Klik lihat detail untuk mendapatkan informasi selengkapnya tentang layanan ini");

    useEffect(() => {
        setHtmlContentSc(tos?.description && tos.description !== "-" ? tos.description : "");
    }, [tos]);
    

    useEffect(() => {
        setHtmlContent(articleDetail.description);
    }, [articleDetail.description]);

      if (!articleDetail) {
            return (
                <>
                    <div className={not.box}>
                        <div className={not.content}>
                            <img src="../images/not-found.webp" alt='Artikel Tidak Ditemukan'/>
                            <span>Artikel Tidak Ditemukan</span>
                        </div>
                    </div>
                    <div className={stylesAll.article_section}>
                        <div className={`${stylesAll.heading_section} ${stylesAll.heading_section_start}`}>
                            <h2><span>Artikel</span> Lain</h2>
                        </div>
                        <div className={stylesAll.article_container}>
                            <div className={stylesAll.article_layout}>
                                {articlesAll.map(article => {
                                    const tagsList = article.tags ? article.tags.split(',') : [];

                                    return(
                                    <div className={stylesAll.article_box} key={article.id}>
                                        <div className={stylesAll.article_image}>
                                            {tagsList.length > 0 && (
                                                <Link href={`tag/${tagsList[0].trim()}`}>
                                                    <button className={styles.tag_article_img}>#{tagsList[0].trim()}</button>
                                                </Link>
                                            )}
                                            <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                                <Image priority width={500} height={500} src={article.image} alt={article.title}/>
                                            </Link>
                                        </div>
                                        <div className={stylesAll.article_content}>
                                            <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                                <div className={stylesAll.article_heading}>
                                                    <h3>{article.title}</h3>
                                                </div>
                                            </Link>
                                            <span>Admin, {article.date}</span>
                                            <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}><button className={stylesAll.btn_more}>Baca Selengkapnya</button></Link>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                            <div className={stylesAll.article_pagination}>
                                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                Sebelumnya
                                </button>
                                {/* Menampilkan nomor halaman */}
                                {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={currentPage === index + 1 ? stylesAll.active_pagination : ''}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                                ))}
                                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Selanjutnya
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

      

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${articleDetail.title ? `${articleDetail.title}` : `Artikel NMW Aesthetic Clinic`} - NMW Aesthetic Clinic`,
        description: `${plainText}`,
        url: `${mainUrl}/article/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`,
        publisher: {
          "@type": "Organization",
          name: "NMW Aesthetic Clinic",
          logo: {
            "@type": "ImageObject",
            url: `${articleDetail.image ? `${articleDetail.image}` : `${mainUrl}/images/kebijakan-privasi.png`}`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/article/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`
        },
        image: {
          "@type": "ImageObject",
          url: `${articleDetail.image}`
        },
        author: {
          "@type": "Person",
          name: `${articleDetail.author}`
        },
        "datePublished": `${articleDetail.date}`,
        "dateModified": `${articleDetail.date}`
      };
      
      const breadcrumbSchema = {
        "@context": "https://schema.org",
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
            item: `${mainUrl}/article`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${articleDetail.title ? `${articleDetail.title}` : `article NMW Aesthetic Clinic`}`,
            item: `${mainUrl}/article/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`
          }
        ]
      };

  return (
    <>
        <Head>
          <title>{articleDetail.title}</title>
          <meta name="description" content={articleDetail.description ? `${articleDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${articleDetail.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'}/>
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content={articleDetail.title ? `${articleDetail.title}` : `Artikel NMW Aesthetic Clinic`}  />
          <meta property="og:description" content={articleDetail.description ? `${articleDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${articleDetail.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'}/>
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/article/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`} />
          <meta property="og:image" content={articleDetail.image ? `${articleDetail.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={articleDetail.title} />
          <meta name="twitter:description" content={articleDetail.description ? `${articleDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${articleDetail.description.length > 100 ? '...' : ''}` : 'article Deskripsi'}/>
          <meta name="twitter:image" content={articleDetail.image ? `${articleDetail.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

          <link rel="canonical" href={`${mainUrl}/article/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`} />

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>
      <div className={banner.banner}>
            <Image priority width={900} height={900} src={articleDetail.image} alt={articleDetail.title}/> 
            {articleDetail.image_source ? (
                <div className={banner.image_source}>
                    <Link href={articleDetail.image_source} target="_blank">{articleDetail.image_source_name}</Link>
                </div>
            ) : null }
        </div>
        <div className={breadcrumb.breadcrumb}>
            <h5><Link href={'/'}>Home</Link> / <Link href={'/artikel'}>Artikel</Link> / <span><Link href={`${mainUrl}/article/${encodeURIComponent(articleDetail.title.replace(/\s+/g, '-').toLowerCase())}`}>{articleDetail.title}</Link></span></h5>
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
                        {/* {toc.length > 0 && (
                            <div className={styles.table_of_content}>
                                <h2>Daftar Isi</h2>
                                <ul>
                                    {toc.map((item, index) => (
                                        <li key={index} className={item.tag === "H2" ? "h2-item" : "h3-item"}>
                                            <a
                                                href={`#${item.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const target = document.getElementById(item.id);
                                                    if (target) {
                                                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                                                    }
                                                }}
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )} */}
                         <div key={modifiedDescription} ref={contentRef} dangerouslySetInnerHTML={{ __html: modifiedDescription }} />
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
                        <Link href={"/article"}>Lihat lebih banyak</Link>
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
                                        <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <Image priority width={500} height={500} src={article.image} alt={article.title}/>
                                        </Link>
                                    </div>
                                    <div className={styles.article_content}>
                                        <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <div className={styles.article_heading}>
                                                <h3>{article.title}</h3>
                                            </div>
                                        </Link>
                                        <span>Admin, {article.date}</span>
                                        <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
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
                                        <Image priority width={700} height={700}
                                            src={`${storageUrl}/${product.image}`}
                                            alt={product.name}
                                        />
                                    </Link>
                                </div>
                                <div className={`${styles.article_content} ${styles.article_product}`}>
                                    <Link href={product.link} target="_blank">
                                        <div className={styles.article_heading}>
                                            <h3>{product.name}</h3>
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
                                        <Image priority width={800} height={800}
                                            src={`${storageUrl}/${tos.image}`}
                                            alt={tos.title}
                                        />
                                    </Link>
                                </div>
                                <div className={styles.box_service_content}>
                                    <Link href={`/jenis-layanan/${tos.slug}`} ><h2>{tos.title}</h2></Link>
                                    <p className={styles.service_description} dangerouslySetInnerHTML={{ __html: htmlContentSc }} />
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
                                <Image priority width={500} height={500}
                                    src={`${storageUrl}/${doctor.image}`}
                                    alt={doctor.name}
                                
                                />
                            </div>
                            <div className={styles.article_content}>
                                <div className={styles.article_heading}>
                                    <h3>{doctor.name}</h3>
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
                    <Link href={"/article"}>Lihat lebih banyak</Link>
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
                                    <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                        <Image priority width={500} height={500} src={article.image} alt={article.title}/>
                                    </Link>
                                </div>
                                <div className={styles.article_content}>
                                    <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                        <div className={styles.article_heading}>
                                            <h3>{article.title}</h3>
                                        </div>
                                    </Link>
                                    <span>Admin, {article.date}</span>
                                    <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
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
