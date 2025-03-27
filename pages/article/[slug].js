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

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

  const response = await fetch(`${baseUrl}/detail-artikel/${slug}`);
  const article = await response.json();

  const responseArticles = await fetch(`${baseUrl}/article-new`);
  const data = await responseArticles.json();
  const articlesAll = data.articles.filter(article => article.slug !== slug).slice(0, 6);

  const responseDoctor = await fetch(`${baseUrl}/doctor/${article.doctorId}`);
  const doctor = await responseDoctor.json();

  const responseService = await fetch(`${baseUrl}/servicesId/${article.serviceId}`);
  const services = await responseService.json();

  const responseProduct = await fetch(`${baseUrl}/product?id=${article.products.join(",")}`);
  const product = await responseProduct.json();
  const productAll = product.products || [];

  return {
    props: {
      article,
      articlesAll,
      doctor,
      services,
      productAll,
    },
  };
};

const DetailArtikel = ({ article, articlesAll, doctor, services, productAll }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [modifiedContent, setModifiedContent] = useState("");
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

  const plainText = article.description.replace(/<\/?[^>]+(>|$)/g, "");

  const tags = Array.isArray(article.tags) ? article.tags : [];

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
  }, [article.description]);

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

  if (loading) {
    return (
      <div>
        {loading && (
          <div className={loadingStyles.box}>
            <div className={loadingStyles.content}>
              <img src="/images/logo.svg" loading="lazy" />
              <span>LOADING</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  if (error) return <p>Error: {error}</p>;

  if (!article) {
    if (loading) return null; // Jangan tampilkan apa pun saat masih loading

    return (
      <div className={styles.emptyPage}>
      </div>
    );
  }

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
        url: `${article.image ? `${storageUrl}/${article.image}` : `${mainUrl}/images/kebijakan-privasi.png`}`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}/article/${article.slug}`
    },
    image: {
      "@type": "ImageObject",
      url: `${storageUrl}/${article.image}`
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
    <div>
      <Head>
        <title>{article?.title}</title>
        <meta name="description" content={article?.description ? `${article?.description.replace(/<[^>]+>/g, '').slice(0, 100)}${article?.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'} />
        <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

        <meta property="og:title" content={article?.title ? `${article?.title}` : `Artikel NMW Aesthetic Clinic`} />
        <meta property="og:description" content={article.description ? `${article.description.replace(/<[^>]+>/g, '').slice(0, 100)}${article?.description.length > 100 ? '...' : ''}` : 'Artikel Deskripsi'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/article/${article.slug}`} />
        <meta property="og:image" content={article.image ? `${storageUrl}/${article.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description ? `${article.description.replace(/<[^>]+>/g, '').slice(0, 100)}${article.description.length > 100 ? '...' : ''}` : 'article Deskripsi'} />
        <meta name="twitter:image" content={article.image ? `${storageUrl}/${article.image}` : `${mainUrl}/images/kebijakan-privasi.png`} />

        <link rel="canonical" href={`${mainUrl}/article/${article.slug}`} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>
      <div className={banner.banner}>
        <Image priority width={900} height={900} src={`${storageUrl}/${article.image}`} alt={article.title} />
        {article.image_source ? (
          <div className={banner.image_source}>
            <Link href={article.image_source} target="_blank">{article.image_source_name}</Link>
          </div>
        ) : null}
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
                        <Image priority width={500} height={500} src={`${storageUrl}${article.image}`} alt={article.title} />
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
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_sc}>
        {productAll.length > 0 ? (
        <div className={styles.product_detail}>
            <div className={styles.layanan_heading}>
            <h3>Produk <font>Artikel Ini</font></h3>
            </div>
            <div className={styles.product_detail_layout}>
            {productAll.map((product, index) => (
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
        ) : null}
        <div className={styles.container_layout}>
        {services && services._id ? (
          <div className={styles.layanan}>
            <div className={styles.layanan_heading}>
              <h3>Terkait <font>Artikel Ini</font></h3>
            </div>
            <div className={styles.box_service_layout}>
              <div className={styles.box_service} key={services.id}>
                <div className={styles.box_service_image}>
                  <Link href={`/jenis-layanan/${services.slug}`}>
                    <Image priority width={800} height={800}
                      src={`${storageUrl}/${services.imageCover}`}
                      alt={services.title}
                    />
                  </Link>
                </div>
                <div className={styles.box_service_content}>
                  <Link href={`/jenis-layanan/${services.slug}`}>
                    <h2>{services.title}</h2>
                  </Link>
                  <p className={styles.service_description} dangerouslySetInnerHTML={{ __html: htmlContentSc }} />
                  <div className={styles.box_service_btn}>
                    <Link href={`/jenis-layanan/${services.slug}`}>
                      <button>Lihat Detail</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
            ) : null}
          {doctor && doctor._id ? (
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
            ) : null}
        </div>
        <div className={`${styles.container_sidebar} ${styles.mobile_block}`}>
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
                      <Image priority width={500} height={500} src={`${storageUrl}${article.image}`} alt={article.title} />
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailArtikel;