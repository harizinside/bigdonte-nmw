// import { useRouter } from 'next/router';
// import React, { useRef, useState, useEffect } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import banner from "@/styles/Banner.module.css";
// import styles from "@/styles/Detail.module.css";
// import stylesAll from "@/styles/Article.module.css"
// import loadingStyles from "@/styles/Loading.module.css";
// import not from "@/styles/Not.module.css";
// import Link from 'next/link';
// import Head from 'next/head';
// import breadcrumb from "@/styles/Breadcrumb.module.css"
// import Image from 'next/image';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // export async function getServerSideProps(context) {
// //     const { slug } = context.query;
// //     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
// //     let articleDetail = null;
// //     let relatedArticles = null;
// //     let allArticles = [];
// //     let settings = {};
// //     let tos = null;
// //     let doctor = null;
// //     let products = [];
// //     let service = null;
// //     let currentPage = 1;
// //     let totalPages = 1;
  
// //     try {
// //         // Fetch artikel berdasarkan slug
// //         const articleRes = await fetch(`${baseUrl}/detail-artikel/${slug}`);
// //         const articleData = await articleRes.json();
// //         articleDetail = articleData || null;

// //         if (articleDetail) {
// //             // Fetch produk terkait berdasarkan objectId di products
// //             if (articleDetail.products && articleDetail.products.length > 0) {
// //                 const productRes = await fetch(`${baseUrl}/product`);
// //                 const productData = await productRes.json();
// //                 products = productData?.data?.filter(product => 
// //                     articleDetail.products.includes(product._id)
// //                 ) || [];
// //             }
  
// //             // Fetch doctor berdasarkan doctorId
// //             if (articleDetail.doctorId) {
// //                 const doctorRes = await fetch(`${baseUrl}/doctor/${articleDetail.doctorId}`);
// //                 const doctorData = await doctorRes.json();
// //                 doctor = doctorData || null;
// //             }
  
// //             // Fetch service berdasarkan serviceId
// //             if (articleDetail.serviceId) {
// //                 const serviceRes = await fetch(`${baseUrl}/service/${articleDetail.serviceId}`);
// //                 const serviceData = await serviceRes.json();
// //                 service = serviceData?.data || null;
// //             }

// //             // Fetch Terms of Service (TOS) berdasarkan serviceId
// //             if (service?.id) {
// //                 const tosRes = await fetch(`${baseUrl}/tos/${service.id}`);
// //                 const tosData = await tosRes.json();
// //                 tos = tosData?.data || null;
// //             }
// //         }
  
// //         // Fetch artikel terkait
// //         const articlesSide = await fetch(`${baseUrl}/article-new`);
// //         if (!articlesSide.ok) throw new Error(`HTTP error! Status: ${articlesSide.status}`);

// //         const articlesSideData = await articlesSide.json();
// //         relatedArticles = articlesSideData?.articles?.filter(article => article.slug !== slug) ?? [];
          
// //         // Fetch semua artikel untuk pagination
// //         const allArticlesRes = await fetch(`${baseUrl}/article?page=${currentPage}`);
// //         const allArticlesData = await allArticlesRes.json();
// //         allArticles = allArticlesData?.data || [];
// //         totalPages = allArticlesData?.meta?.last_page || 1;
  
// //         // Fetch settings
// //         const settingsRes = await fetch(`${baseUrl}/setting`);
// //         settings = await settingsRes.json();
  
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //     }
  
// //     return {
// //         props: {
// //             articleDetail: articleDetail || null,
// //             relatedArticles,  // Pastikan ini selalu berupa array
// //             allArticles: allArticles || [],
// //             settings: settings || {},
// //             tos: tos || null,
// //             doctor: doctor || null,
// //             service: service || null,
// //             products: products || [],
// //             currentPage,
// //             totalPages,
// //         }
// //     };
// // }


//   export default function DetailArtikel(){
//     const router = useRouter();
//     const { slug } = router.query;
//       const [articlesAll, setArticlesAll] = useState([]);
//       const [articles, setArticles] = useState(null);
  
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
//       const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

//       const [toc, setToc] = useState([]);

//       useEffect(() => {
//         if (!slug) return;
    
//         const fetchArticle = async () => {
//           try {
//             const response = await fetch(`/api/detail-artikel/${slug}`);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
//             const result = await response.json();
//             setArticles(result);
//           } catch (error) {
//             console.error(error);
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchArticle();
//       }, [slug]);

//       useEffect(() => {
//             const fetchData = async () => {
//                 try {
//                     const response = await fetch(`/api/article-new`);
//                     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    
//                     const data = await response.json();
        
//                     // Hilangkan 3 artikel terbaru
//                     setArticlesAll(data.articles.filter(article => article.slug !== slug).slice(0, 6));
//                 } catch (error) {
//                     console.error("❌ Error fetching articles:", error);
//                 }
//             };
        
//             fetchData();
//         }, []);    
        
  
//       const handleNextPage = () => {
//           if (page < totalPages) {
//           setPage(page + 1);
//           }
//       };
  
//       const handlePrevPage = () => {
//           if (page > 1) {
//           setPage(page - 1);
//           }
//       };

//     //   const tags = Array.isArray(articles.tags) ? articles.tags : [];

//       const plainText = articles.description.replace(/<\/?[^>]+(>|$)/g, "");
  
//       const [htmlContentSc, setHtmlContentSc] = useState("Klik lihat detail untuk mendapatkan informasi selengkapnya tentang layanan ini");
  
//       useEffect(() => {
//           if (tos && tos.description && tos.description !== "-") {
//               setHtmlContentSc(tos.description);
//           } else {
//               setHtmlContentSc("");
//           }
//       }, [tos]);
      
//       const contentRef = useRef(null);
  
//       useEffect(() => {
//           if (!contentRef.current) return;
      
//           // Buat parser untuk memodifikasi HTML sebelum render
//           const parser = new DOMParser();
//           const doc = parser.parseFromString(articles.description, "text/html");
      
//           const headings = doc.querySelectorAll("h2, h3");
//           const tocItems = [];
      
//           headings.forEach((heading, index) => {
//               const id = `section-${index}`;
//               heading.setAttribute("id", id);
//               tocItems.push({ id, text: heading.innerText, tag: heading.tagName });
//           });
      
//           setToc(tocItems);
      
//           // Set ulang description dengan ID yang sudah ditambahkan
//           const modifiedDescription = doc.body.innerHTML;
//           setModifiedContent(modifiedDescription);
//       }, [articles.description]);
      
//       const [modifiedContent, setModifiedContent] = useState("");
          
//       const handleScrollToSection = (e, sectionId) => {
//           e.preventDefault(); // Hindari navigasi default dari anchor
      
//           const section = document.getElementById(sectionId);
//           if (section) {
//               const offset = 80; // Sesuaikan dengan tinggi navbar jika ada
//               const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset;
//               window.scrollTo({ top: targetPosition, behavior: "smooth" });
//           } else {
//               console.warn(`Target not found: ${sectionId}, retrying...`);
      
//               // Coba lagi setelah 100ms jika elemen belum ditemukan
//               setTimeout(() => {
//                   const section = document.getElementById(sectionId);
//                   if (section) {
//                       window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
//                   } else {
//                       console.error(`Target still not found: ${sectionId}`);
//                   }
//               }, 100);
//           }
//       };
    
//         const formatDate = (dateString) => {
//             const date = new Date(dateString);
//             return new Intl.DateTimeFormat("id-ID", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//             }).format(date);
//           };

//           if (!articles) return <p>Artikel tidak ditemukan</p>;

//     const articleSchema = {
//         "@context": "https://schema.org",
//         "@type": "Article",
//         headline: `${articles.title ? `${articles.title}` : `Artikel NMW Aesthetic Clinic`} - NMW Aesthetic Clinic`,
//         description: `${plainText}`,
//         url: `${mainUrl}/article/${encodeURIComponent(articles.title.replace(/\s+/g, '-').toLowerCase())}`,
//         publisher: {
//           "@type": "Organization",
//           name: "NMW Aesthetic Clinic",
//           logo: {
//             "@type": "ImageObject",
//             url: `${articles.image ? `${articles.image}` : `${mainUrl}/images/kebijakan-privasi.png`}`
//           }
//         },
//         mainEntityOfPage: {
//           "@type": "WebPage",
//           "@id": `${mainUrl}/article/${encodeURIComponent(articles.title.replace(/\s+/g, '-').toLowerCase())}`
//         },
//         image: {
//           "@type": "ImageObject",
//           url: `${articles.image}`
//         },
//         author: {
//           "@type": "Person",
//           name: `${articles.author}`
//         },
//         "datePublished": `${articles.date}`,
//         "dateModified": `${articles.date}`
//       };
      
//       const breadcrumbSchema = {
//         "@context": "https://schema.org",
//         "@type": "BreadcrumbList",
//         itemListElement: [
//           {
//             "@type": "ListItem",
//             position: 1,
//             name: "Beranda",
//             item: `${mainUrl}`
//           },
//           {
//             "@type": "ListItem",
//             position: 2,
//             name: "Artikel",
//             item: `${mainUrl}/article`
//           },
//           {
//             "@type": "ListItem",
//             position: 3,
//             name: `${articles.title ? `${articles.title}` : `article NMW Aesthetic Clinic`}`,
//             item: `${mainUrl}/article/${encodeURIComponent(articles.title.replace(/\s+/g, '-').toLowerCase())}`
//           }
//         ]
//       };

//   return (
//     <>
//         <Head>
//           <title>{articles.title}</title>
//           <meta name="description" content={articles.description ? `${articles.description.replace(/<[^>]+>/g, '').slice(0, 100)}${articles.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'}/>
//           <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

//           <meta property="og:title" content={articles.title ? `${articles.title}` : `Artikel NMW Aesthetic Clinic`}  />
//           <meta property="og:description" content={articles.description ? `${articles.description.replace(/<[^>]+>/g, '').slice(0, 100)}${articles.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'}/>
//           <meta property="og:type" content="website" />
//           <meta property="og:url" content={`${mainUrl}/article/${encodeURIComponent(articles.title.replace(/\s+/g, '-').toLowerCase())}`} />
//           <meta property="og:image" content={articles.image ? `${articles.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

//           <meta name="twitter:card" content="summary_large_image" />
//           <meta name="twitter:title" content={articles.title} />
//           <meta name="twitter:description" content={articles.description ? `${articles.description.replace(/<[^>]+>/g, '').slice(0, 100)}${articles.description.length > 100 ? '...' : ''}` : 'article Deskripsi'}/>
//           <meta name="twitter:image" content={articles.image ? `${articles.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

//           <link rel="canonical" href={`${mainUrl}/article/${encodeURIComponent(articles.title.replace(/\s+/g, '-').toLowerCase())}`} />

//           <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
//           <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
//       </Head>
//       <div className={banner.banner}>
//             <Image priority width={900} height={900} src={`${storageUrl}/${articles.image}`}  alt={articles.title}/> 
//             {articles.image_source ? (
//                 <div className={banner.image_source}>
//                     <Link href={articles.image_source} target="_blank">{articles.image_source_name}</Link>
//                 </div>
//             ) : null }
//         </div>
//         <div className={breadcrumb.breadcrumb}>
//             <h5><Link href={'/'}>Home</Link> / <Link href={'/article'}>Artikel</Link> / <span><Link href={`${mainUrl}/article/${encodeURIComponent(articles.title.replace(/\s+/g, '-').toLowerCase())}`}>{articles.title}</Link></span></h5>
//         </div>
//         <div className={styles.container}>
//             <div className={styles.detail_tag}>
//                 {tags.map((tag, index) => (
//                     <Link href={`tag/${tag.trim()}`} key={index}>
//                         <button>
//                             #{tag.trim()}
//                         </button>
//                     </Link>
//                 ))}
//             </div>
//             <div className={styles.container_layout}>
//                 <div className={styles.container_content}>
//                     <div className={styles.content_heading}>
//                         <h1>{articles.title}</h1>
//                         <span>{articles.author}, {formatDate(articles.date)}</span>
//                     </div>
//                     <div className={styles.content_text}>
//                         {toc.length > 0 && (
//                             <div className={styles.table_of_content}>
//                                 <h2>Daftar Isi</h2>
//                                 <ul>
//                                     {toc.map((item, index) => (
//                                         <li key={index} className={item.tag === "H2" ? "h2-item" : "h3-item"}>
//                                             <a
//                                                 href={`#${item.id}`}
//                                                 className="toc-link"
//                                                 onClick={(e) => handleScrollToSection(e, item.id)}
//                                             >
//                                                 {item.text}
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}
//                         <div ref={contentRef}>
//                             <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />
//                         </div>
//                         <div className={styles.author_meta}>
//                             <p>Penulis : {articles.author}</p>
//                             <p>Editor : {articles.editor}</p>
//                             <p>Sumber : {articles.sourceLink}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={`${styles.container_sidebar} ${styles.dekstop_block}`}>
//                     <div className={styles.sidebar_heading}>
//                         <h4>Artikel Lain</h4>
//                         <Link href={"/article"}>Lihat lebih banyak</Link>
//                     </div>
//                     <div className={styles.sidebar_layout}>
//                         {articlesAll.map(article => {
//                             const firstTag = article.tags?.[0] || "";

//                                 return (
//                                     <div className={styles.article_box} key={article._id}>
//                                         <div className={styles.article_image}>
//                                             {firstTag && (
//                                                 <Link href={`/article/tag/${firstTag.trim()}`}>
//                                                     <button className={styles.tag_article_img}>#{firstTag.trim()}</button>
//                                                 </Link>
//                                             )}
//                                             <Link href={`/article/${article.slug}`}>
//                                                 <Image priority width={500} height={500} src={`${storageUrl}${article.image}`} alt={article.title}/>
//                                             </Link>
//                                         </div>
//                                         <div className={styles.article_content}>
//                                             <Link href={`/article/${article.slug}`}>
//                                                 <div className={styles.article_heading}>
//                                                     <h3>{article.title}</h3>
//                                                 </div>
//                                             </Link>
//                                             <span>{article.author}, {formatDate(article.date)}</span>
//                                             <Link href={`/article/${article.slug}`}>
//                                                 <button className={styles.btn_more}>Baca Selengkapnya</button>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         }

//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className={styles.container_sc}>
//             {/* {Array.isArray(articles.products) && articles.products.length > 0 ? (
//                 <div className={styles.product_detail}>
//                     <div className={styles.layanan_heading}>
//                         <h3>Produk <font>Artikel Ini</font></h3>
//                     </div>
//                     <div className={styles.product_detail_layout}>
//                         {articles.products.map((product, index) => (
//                             <div className={styles.article_box} key={index}>
//                                 <div className={`${styles.article_image} ${styles.article_image_product}`}>
//                                     <Link href={product.link} target="_blank">
//                                         <Image priority width={700} height={700}
//                                             src={`${storageUrl}/${product.image}`}
//                                             alt={product.name}
//                                         />
//                                     </Link>
//                                 </div>
//                                 <div className={`${styles.article_content} ${styles.article_product}`}>
//                                     <Link href={product.link} target="_blank">
//                                         <div className={styles.article_heading}>
//                                             <h3>{product.name}</h3>
//                                         </div>
//                                     </Link>
//                                     <p>{product.description}</p>
//                                     <Link href={product.link} target="_blank">
//                                         <button className={styles.btn_more}>Lihat Produk</button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : null } */}
//             <div className={styles.container_layout}>
//                 {/* {tos && tos.id ? (
//                     <div className={styles.layanan}>
//                         <div className={styles.layanan_heading}>
//                             <h3>Terkait <font>Artikel Ini</font></h3>
//                         </div>
//                         <div className={styles.box_service_layout}>
//                             <div className={styles.box_service} key={tos.id}>
//                                 <div className={styles.box_service_image}>
//                                     <Link href={`/jenis-layanan/${tos.slug}`} >
//                                         <Image priority width={800} height={800}
//                                             src={`${storageUrl}/${tos.image}`}
//                                             alt={tos.title}
//                                         />
//                                     </Link>
//                                 </div>
//                                 <div className={styles.box_service_content}>
//                                     <Link href={`/jenis-layanan/${tos.slug}`} ><h2>{tos.title}</h2></Link>
//                                     <p className={styles.service_description} dangerouslySetInnerHTML={{ __html: htmlContentSc }} />
//                                     <div className={styles.box_service_btn}>
//                                         <Link href={`/jenis-layanan/${tos.slug}`} >
//                                             <button>Lihat Detail</button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ) : null} */}
//                 {/* <div className={styles.container_sidebar}>
//                     <div className={styles.layanan_heading}>
//                         <h3> <font>Dokter</font> Terkait</h3>
//                     </div>
//                     <div className={`${styles.sidebar_layout} ${styles.sidebar_layout_sc}`}>
//                         <div className={`${styles.article_box} ${styles.doctor_box}`} key={doctor._id}>
//                             <div className={`${styles.article_image} ${styles.article_image_product} ${styles.article_image_doctor}`}>
//                                 <Image priority width={500} height={500}
//                                     src={`${storageUrl}/${doctor.image}`}
//                                     alt={doctor.name}
                                
//                                 />
//                             </div>
//                             <div className={styles.article_content}>
//                                 <div className={styles.article_heading}>
//                                     <h3>{doctor.name}</h3>
//                                 </div>
//                                 <p>{doctor.position}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div> */}
//             </div>
//             {/* <div className={`${styles.container_sidebar} ${styles.mobile_block}`}>
//                 <div className={styles.sidebar_heading}>
//                     <h4>Artikel Lain</h4>
//                     <Link href={"/article"}>Lihat lebih banyak</Link>
//                 </div>
//                 <div className={styles.sidebar_layout}>
//                     {articles.map(article => {
//                         const tagsList = article.tags ? article.tags.split(',') : [];

//                         return(
//                             <div className={styles.article_box} key={article.id}>
//                                 <div className={styles.article_image}>
//                                     {tagsList.length > 0 && (
//                                         <Link href={`tag/${tagsList[0].trim()}`}>
//                                             <button className={styles.tag_article_img}>#{tagsList[0].trim()}</button>
//                                         </Link>
//                                     )}
//                                     <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
//                                         <Image priority width={500} height={500} src={article.image} alt={article.title}/>
//                                     </Link>
//                                 </div>
//                                 <div className={styles.article_content}>
//                                     <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
//                                         <div className={styles.article_heading}>
//                                             <h3>{article.title}</h3>
//                                         </div>
//                                     </Link>
//                                     <span>Admin, {article.date}</span>
//                                     <Link href={`/article/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
//                                         <button className={styles.btn_more}>Baca Selengkapnya</button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div> */}
//         </div>
//     </>
//   );
// }


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



export default function DetailArtikel() {
    const router = useRouter();
    const { slug } = router.query; 

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toc, setToc] = useState([]);
    const [modifiedContent, setModifiedContent] = useState("");
    const [articlesAll, setArticlesAll] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [services, setServices] = useState([]);
    const [product, setProduct] = useState([]);
    const [htmlContentSc, setHtmlContentSc] = useState("Klik lihat detail untuk mendapatkan informasi selengkapnya tentang layanan ini");

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

    useEffect(() => {
        if (services && services.description && services.description !== "-") {
            setHtmlContentSc(services.description);
        } else {
            setHtmlContentSc("");
        }
    }, [services]);

    useEffect(() => {
        if (!slug) return; // Hindari fetch jika slug masih undefined

        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/detail-artikel/${slug}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setArticle(result);
            } catch (error) {
                console.error("Error fetching article:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/article-new`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const data = await response.json();
    
                // Hilangkan 3 artikel terbaru
                setArticlesAll(data.articles.filter(article => article.slug !== slug).slice(0, 6));
            } catch (error) {
                console.error("❌ Error fetching articles:", error);
            }
        };
    
        fetchData();
    }, [slug]);   

    useEffect(() => {
        if (!article?.doctorId) return;
    
        const fetchDoctor = async () => {
          try {
            const response = await fetch(`/api/doctor/${article?.doctorId}`, {
              method: "GET"
            });

            if (!response.ok) throw new Error("Gagal mengambil data article");
    
            const result = await response.json();
            setDoctor(result);
          } catch (error) {
            console.error(error);
            
          } finally {
            setLoading(false);
          }
        };
    
        fetchDoctor();
    }, [article?.doctorId]);

    useEffect(() => {
        if (!article?.serviceId) return;
    
        const fetchService = async () => {
          try {
            const response = await fetch(`/api/servicesId/${article?.serviceId}`, {
              method: "GET",
            });

            if (!response.ok) throw new Error("Gagal mengambil data service");
    
            const result = await response.json();
            setServices(result);
          } catch (error) {
            console.error(error);
            
          } finally {
            setLoading(false);
          }
        };
    
        fetchService();
    }, [article?.serviceId]);

    useEffect(() => {
        // Pastikan `articles.products` adalah array sebelum fetch
        if (!Array.isArray(article?.products) || article?.products.length === 0) {
          setLoading(false);
          return;
        }
    
        const fetchProducts = async () => {
          try {
            const response = await fetch(`/api/product?id=${article?.products.join(",")}`, {
              method: "GET",
            });
    
            if (!response.ok) throw new Error("Gagal mengambil data produk");
    
            const result = await response.json();
            setProduct(result.products);
          } catch (error) {
            console.error("❌ Error fetching products:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, [article?.products]);  

      const plainText = article?.description.replace(/<\/?[^>]+(>|$)/g, "");

      const tags = Array.isArray(article?.tags) ? article?.tags : [];

      const contentRef = useRef(null);

              const formatDate = (dateString) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(date);
          };

                useEffect(() => {
          if (!contentRef.current) return;
      
          // Buat parser untuk memodifikasi HTML sebelum render
          const parser = new DOMParser();
          const doc = parser.parseFromString(article.description, "text/html");
      
          const headings = doc.querySelectorAll("h2, h3");
          const tocItems = [];
      
          headings.forEach((heading, index) => {
              const id = `section-${index}`;
              heading.setAttribute("id", id);
              tocItems.push({ id, text: heading.innerText, tag: heading.tagName });
          });
      
          setToc(tocItems);
      
          // Set ulang description dengan ID yang sudah ditambahkan
          const modifiedDescription = doc.body.innerHTML;
          setModifiedContent(modifiedDescription);
      }, [article?.description]);

        const handleScrollToSection = (e, sectionId) => {
            e.preventDefault(); // Hindari navigasi default dari anchor
        
            const section = document.getElementById(sectionId);
            if (section) {
                const offset = 80; // Sesuaikan dengan tinggi navbar jika ada
                const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            } else {
                console.warn(`Target not found: ${sectionId}, retrying...`);
        
                // Coba lagi setelah 100ms jika elemen belum ditemukan
                setTimeout(() => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
                    } else {
                        console.error(`Target still not found: ${sectionId}`);
                    }
                }, 100);
            }
        };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!article) return <p>Article not found</p>;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${article.title ? `${article.title}` : `Artikel NMW Aesthetic Clinic`} - NMW Aesthetic Clinic`,
        description: `${plainText}`,
        url: `${mainUrl}/article/${article.slug}`,
        publisher: {
          "@type": "Organization",
          name: "NMW Aesthetic Clinic",
          logo: {
            "@type": "ImageObject",
            url: `${article.image ? `${article.image}` : `${mainUrl}/images/kebijakan-privasi.png`}`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/article/${article.slug}`
        },
        image: {
          "@type": "ImageObject",
          url: `${article.image}`
        },
        author: {
          "@type": "Person",
          name: `${article.author}`
        },
        "datePublished": `${article.date}`,
        "dateModified": `${article.date}`
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
            name: `${article.title ? `${article.title}` : `article NMW Aesthetic Clinic`}`,
            item: `${mainUrl}/article/${article.slug}`
          }
        ]
      };

    return (
        <>
        <Head>
           <title>{article.title}</title>
           <meta name="description" content={article.description ? `${article.description.replace(/<[^>]+>/g, '').slice(0, 100)}${article.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'}/>
           <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

           <meta property="og:title" content={article.title ? `${article.title}` : `Artikel NMW Aesthetic Clinic`}  />
           <meta property="og:description" content={article.description ? `${article.description.replace(/<[^>]+>/g, '').slice(0, 100)}${article.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'}/>
           <meta property="og:type" content="website" />
           <meta property="og:url" content={`${mainUrl}/article/${article.slug}`} />
           <meta property="og:image" content={article.image ? `${article.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

           <meta name="twitter:card" content="summary_large_image" />
           <meta name="twitter:title" content={article.title} />
           <meta name="twitter:description" content={article.description ? `${article.description.replace(/<[^>]+>/g, '').slice(0, 100)}${article.description.length > 100 ? '...' : ''}` : 'article Deskripsi'}/>
           <meta name="twitter:image" content={article.image ? `${article.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

           <link rel="canonical" href={`${mainUrl}/article/${article.slug}`} />

           <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
           <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
       </Head>
        <div className={banner.banner}>
             <Image priority width={900} height={900} src={`${storageUrl}/${article.image}`}  alt={article.title}/> 
             {article.image_source ? (
                <div className={banner.image_source}>
                    <Link href={article.image_source} target="_blank">{article.image_source_name}</Link>
                </div>
            ) : null }
        </div>
        <div className={breadcrumb.breadcrumb}>
            <h5><Link href={'/'}>Home</Link> / <Link href={'/article'}>Artikel</Link> / <span><Link href={`${mainUrl}/article/${article.slug}`}>{article.title}</Link></span></h5>
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
                        <h1>{article.title}</h1>
                        <span>{article.author}, {formatDate(article.date)}</span>
                    </div>
                    <div className={styles.content_text}>
                        {toc.length > 0 && (
                            <div className={styles.table_of_content}>
                                <h2>Daftar Isi</h2>
                                <ul>
                                    {toc.map((item, index) => (
                                        <li key={index} className={item.tag === "H2" ? "h2-item" : "h3-item"}>
                                            <a
                                                href={`#${item.id}`}
                                                className="toc-link"
                                                onClick={(e) => handleScrollToSection(e, item.id)}
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div ref={contentRef}>
                            <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />
                        </div>
                        <div className={styles.author_meta}>
                            <p>Penulis : {article.author}</p>
                            <p>Editor : {article.editor}</p>
                            <p>Sumber : {article.sourceLink}</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.container_sidebar} ${styles.dekstop_block}`}>
                    <div className={styles.sidebar_heading}>
                        <h4>Artikel Lain</h4>
                        <Link href={"/article"}>Lihat lebih banyak</Link>
                    </div>
                    <div className={styles.sidebar_layout}>
                        {articlesAll.map(article => {
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
                        }

                    </div>
                </div>
            </div>
        </div>
        <div className={styles.container_sc}>
             {/* {Array.isArray(articles.products) && articles.products.length > 0 ? ( */}
                <div className={styles.product_detail}>
                    <div className={styles.layanan_heading}>
                        <h3>Produk <font>Artikel Ini</font></h3>
                    </div>
                    <div className={styles.product_detail_layout}>
                        {product.map((product, index) => (
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
            {/* ) : null } */}
            <div className={styles.container_layout}>
                <div className={styles.layanan}>
                    <div className={styles.layanan_heading}>
                        <h3>Terkait <font>Artikel Ini</font></h3>
                    </div>
                    <div className={styles.box_service_layout}>
                        <div className={styles.box_service} key={services.id}>
                            <div className={styles.box_service_image}>
                                <Link href={`/jenis-layanan/${services.slug}`} >
                                    <Image priority width={800} height={800}
                                        src={`${storageUrl}/${services.imageCover}`}
                                        alt={services.title}
                                    />
                                </Link>
                            </div>
                            <div className={styles.box_service_content}>
                                <Link href={`/jenis-layanan/${services.slug}`} ><h2>{services.title}</h2></Link>
                                <p className={styles.service_description} dangerouslySetInnerHTML={{ __html: htmlContentSc }} />
                                <div className={styles.box_service_btn}>
                                    <Link href={`/jenis-layanan/${services.slug}`} >
                                        <button>Lihat Detail</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className={styles.container_sidebar}>
                    <div className={styles.layanan_heading}>
                        <h3> <font>Dokter</font> Terkait</h3>
                    </div>
                    <div className={`${styles.sidebar_layout} ${styles.sidebar_layout_sc}`}>
                        <div className={`${styles.article_box} ${styles.doctor_box}`} key={doctor._id}>
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
                </div>
             <div className={`${styles.container_sidebar} ${styles.mobile_block}`}>
                 <div className={styles.sidebar_heading}>
                     <h4>Artikel Lain</h4>
                     <Link href={"/article"}>Lihat lebih banyak</Link>
                 </div>
                 <div className={styles.sidebar_layout}>
                     {articlesAll.map(article => {
                        const firstTag = article.tags?.[0] || "";

                         return(
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
                         )
                     })}
                 </div>
             </div>
        </div>
        </>
    );
}
