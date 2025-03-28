import styles from "@/styles/Home.module.css";
import { FaWhatsapp } from "react-icons/fa";
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller } from "swiper/modules";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Head from "next/head";
import { Pagination, Autoplay } from 'swiper/modules';
import Image from "next/image";

export default function Home() {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const [settings, setSettings] = useState([]);
  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [promos, setPromos] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

  const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await fetch(`${baseUrl}/article-new`);
//             const data = await response.json();
//             if (data && data.data) { // Pastikan data dan data.data ada
//                 // Ambil artikel dari data.data
//                 const articles = data.data;

//                 // Urutkan artikel berdasarkan 'date' dan 'created_at' yang paling baru
//                 const sortedArticles = articles.sort((a, b) => {
//                     const dateA = new Date(a.date);
//                     const dateB = new Date(b.date);
//                     const createdAtA = new Date(a.created_at);
//                     const createdAtB = new Date(b.created_at);

//                     // Urutkan berdasarkan 'date' jika ada, jika tidak, urutkan berdasarkan 'created_at'
//                     return (dateB - dateA) || (createdAtB - createdAtA);
//                 });

//                 // Ambil 3 artikel pertama setelah diurutkan
//                 setArticles(sortedArticles.slice(0, 3));
//             } else {
//                 console.error('Invalid response data format:', data);
//             }
//         } catch (error) {
//             console.error('Error fetching articles:', error);
//         }
//     };

//     fetchData();
// }, [baseUrl]);    

  useEffect(() => {
        const fetchData = async () => {
            if (typeof window === "undefined") return;

            const cachedSetting = localStorage.getItem("settingCache");
            const cachedSettingExpired = localStorage.getItem("settingCacheExpired");
            const now = Date.now();

            // **Cek apakah cache masih berlaku**
            if (cachedSetting && cachedSettingExpired && now < parseInt(cachedSettingExpired)) {
                const cachedData = JSON.parse(cachedSetting);
                setSettings(cachedData);
                setIsLoading(false);

                // **Periksa apakah data di API lebih baru**
                try {
                    const response = await fetch(`/api/settings`);
                    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

                    const data = await response.json();
                    if (data && data.updatedAt && cachedData.updatedAt !== data.updatedAt) {
                        setSettings(data);
                        localStorage.setItem("settingCache", JSON.stringify(data));
                        localStorage.setItem("settingCacheExpired", (now + 86400000).toString());
                    }
                } catch (error) {
                    console.error("Error checking API for updates:", error);
                }
                return;
            }

            // **Ambil data baru jika cache tidak ada atau expired**
            try {
                const response = await fetch(`/api/settings`);
                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

                const data = await response.json();
                if (data && data.updatedAt) {
                    setSettings(data);
                    localStorage.setItem("settingCache", JSON.stringify(data));
                    localStorage.setItem("settingCacheExpired", (now + 86400000).toString());
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchArticles = async () => {
        try {

          const response = await fetch(`/api/articles`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

            const result = await response.json();
            
            setArticles(result.articles.slice(0, 3));
          } catch (error) {
            console.error("Error fetching articles:", error);
          }
      };

      fetchArticles();
    }, []);

    useEffect(() => {
      const fetchServices = async () => {
        try {

          const response = await fetch(`/api/service`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

            const result = await response.json();
            
            setServices(result.services.slice(0, 6));
          } catch (error) {
            console.error("Error fetching services:", error);
          }
      };

      fetchServices();
    }, []);

    useEffect(() => {
      const fetchPromos = async () => {
        try {

          const response = await fetch(`/api/promo`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

            const result = await response.json();
            
            setPromos(result.promos);
          } catch (error) {
            console.error("Error fetching promos:", error);
          }
      };

      fetchPromos();
    }, []);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    };


  const midIndex = Math.ceil(services.length / 2);
  const firstHalf = services.slice(0, midIndex); // First half of the services
  const secondHalf = services.slice(midIndex); 

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home - NMW Aesthetic Clinic",
    description: "NMW Adalah merek Aesthetic, Skincare, Dermatology and Wellness Clinic yang berbasis di Jakarta, Indonesia. Jam Operasional Klinik 09:00 - 20:00",
    url: `${mainUrl}`,
    publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${storageUrl}${settings.logo}`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}`
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${mainUrl}`
      }]
    }
  };

  return (
    <>
      <Head>
          <title>Official NMW - Klinik Aesthetic & Dermatologi Jakarta</title>
          <meta name="description" content="NMW Adalah merek Aesthetic, Skincare, Dermatology and Wellness Clinic yang berbasis di Jakarta, Indonesia. Jam Operasional Klinik 09:00 - 20:00" />
          <meta name="keywords" content="klinik kesehatan, layanan medis, konsultasi kesehatan, NMW Clinic, perawatan medis, bedah plastik" />
          
          <meta property="og:title" content="NMW Aesthetic Clinic" />
          <meta property="og:image" content={`${mainUrl}/images/favicon.png`} />
          <meta property="og:url" content={mainUrl} />
          <meta property="og:type" content="website" />
          <link rel="icon" href={`${storageUrl}${settings.favicon}`} />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="NMW Aesthetic Clinic" />
          <meta name="twitter:description" content={settings.meta_description} />
          <meta name="twitter:image" content={`${storageUrl}${settings.favicon}`} />

          <link rel="icon" href={`${storageUrl}${settings.favicon}`} />

          <link rel="canonical" href={mainUrl} />

          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
      </Head>
      {isLoading ? (
            <div className="skeleton-logo skeleton-logo-100 skeleton-logo-banner" />
        ) : (
        <Swiper
          pagination={{
            clickable: true,
          }}
          cssMode={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Autoplay]}
          className="myBanner"
          
        >
          {promos.map(promo => (
            <SwiperSlide key={promo.id}>
              <Link href={promo.link ? promo.link : `/promo/${promo.slug}`} target="blank_">
                <div
                  className={styles.banner}
                  style={{ backgroundImage: `url(${storageUrl}/${promo.image})` }}
                >
                </div>
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className={styles.section_1}>
          <div className={styles.heading_section}>
              <h2><span>Layanan</span> Kami</h2>
          </div>
          {isLoading ? (
            
            <div className={styles.slide_section_1}>
                <Swiper
                    dir="rtl"
                    navigation={true}
                    modules={[Navigation, Controller]}
                    className="mySwiper"
                    loop={true}
                    onSwiper={setSecondSwiper}
                    controller={{ control: firstSwiper }}
                >
                        <SwiperSlide>
                          <div className={styles.box_service_layout}>
                            <div className={`${styles.box_service}`}>
                              <div className="skeleton-logo skeleton-logo-100 skeleton-logo-service" />
                            </div>
                          </div>
                        </SwiperSlide>
                </Swiper>

                <Swiper
                    navigation={true}
                    modules={[Navigation, Controller]}
                    className="mySwiper mySwiperSecond"
                    loop={true}
                    onSwiper={setFirstSwiper}
                    controller={{ control: secondSwiper }}
                >
                        <SwiperSlide>
                          <div
                              className={`${styles.box_service_layout} ${styles.box_service_layout_second}`}
                            >
                            <div className={`${styles.box_service} ${styles.box_service_second}`}>
                              <div className="skeleton-logo skeleton-logo-100 skeleton-logo-service" />
                            </div>
                          </div>
                        </SwiperSlide>
                </Swiper>
            </div>
            ) : (
            <div className={styles.slide_section_1}>
                <Swiper
                    dir="rtl"
                    navigation={true}
                    modules={[Navigation, Controller]}
                    className="mySwiper"
                    loop={true}
                    onSwiper={setSecondSwiper}
                    controller={{ control: firstSwiper }}
                >
                    {firstHalf.map((service) => (
                        <SwiperSlide key={service._id}>
                            <div className={styles.box_service_layout}>
                                <div className={`${styles.box_service}`}>
                                    <div className={styles.box_service_content}>
                                        <h3>{service.name}</h3>
                                        <p>
                                          {service.description.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '')}
                                        </p>

                                        <Link href={`/layanan/${service.slug}`}>
                                            <button>Lihat Detail</button>
                                        </Link>
                                    </div>
                                    <div className={styles.box_service_image}>
                                        <Image
                                            width={500}
                                            height={500}
                                            src={`${storageUrl}${service.imageCover ||
                                                "Loading..."}`}
                                            alt={service.name}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    navigation={true}
                    modules={[Navigation, Controller]}
                    className="mySwiper mySwiperSecond"
                    loop={true}
                    onSwiper={setFirstSwiper}
                    controller={{ control: secondSwiper }}
                >
                    {secondHalf.map((service) => (
                        <SwiperSlide key={service._id}>
                            <div
                                className={`${styles.box_service_layout} ${styles.box_service_layout_second}`}
                            >
                                <div className={`${styles.box_service} ${styles.box_service_second}`}>
                                    <div className={styles.box_service_content}>
                                        <h3>{service.name || service.name}</h3>
                                        <p>
                                          {service.description ? service.description.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '') : "Loading..."}
                                        </p>

                                        <Link href={`/layanan/${service.slug}`}>
                                            <button>Lihat Detail</button>
                                        </Link>
                                    </div>
                                    <div className={styles.box_service_image}>
                                        <Image
                                            width={500}
                                            height={500}
                                            src={`${storageUrl}${service.imageCover ||
                                                "Loading..."}`}
                                            alt={service.name}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            )}
      </div>
      <h1 className={styles.heading_hide}>Selamat Datang di Website NMW Aesthetic Clinic</h1>
      <div className={styles.section_2}>
        <div className={styles.heading_section}>
          <h2><span>Tentang</span> Kami</h2>
        </div>
        <div className={styles.section_2_text}>
          <div className={styles.section_2_img}>
            <Image width={700} height={700} src="/images/about_image.webp" priority alt="Tentang NMW Aesthetic Clinic"/>
          </div>
          <p>Adalah merek Aesthetic, Skincare, Dermatology and Wellness Clinic yang berbasis di Jakarta, Indonesia. Nama NMW Skin Care berasal dari pendiri perusahaan dr. Nataliani Mawardi - dengan kata Mawar yang menandakan dan mewakili Mawar yang secara universal disamakan dengan keindahan dan keanggunan, dua nilai inti yang dengan bangga diperjuangkan NMW dan diwakili oleh pelanggan di Indonesia.</p>
          <Link href={"/branches"}><button>Lihat Cabang Kami</button></Link>
        </div>
      </div>
      <div className={styles.section_3}>
        <div className={styles.heading_section_3}>
          <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
            <h2><span>Pendiri</span></h2>
            <p>dr. Nataliani Mawardi, dipl. CIBTAC</p>
          </div>
        </div>
        <div className={styles.section_3_box}>
          <div className={styles.section_3_content}>
            <p>Dr. Nataliani Mawardi adalah seorang pendiri dari klinik kecantikan NMW yang kini menjadi salah satu klinik kepercayaan artis top nasional dan masyarakat luas untuk perawatan wajah.</p>
            <p>Dr. Nataliani memiliki pendirian “give back to community”. Melihat kurangnya kepedulian ibu-ibu di pasar membuat Dr. Nataliani berinisiatif memberikan konsultasi untuk jaga kesehatan.</p>
            <Link href={'/penghargaan'}><button>Lihat Lebih Lanjut</button></Link>
          </div>
          <img src="images/dr_nataliani.webp" loading="lazy" alt="Dr. Nataliani Mawardi, dipl. CIBTAC" className={styles.section_3_image}/>
          <img src="images/blink_orange.svg" loading="lazy" className={styles.section_icon_1} alt="Blink Material"/>
          <img src="images/blink_orange.svg" loading="lazy" className={styles.section_icon_2} alt="Blink Material"/>
          <img src="images/blink_grey.svg" loading="lazy" className={styles.section_icon_3} alt="Blink Material"/>
          <img src="images/blink_grey.svg" loading="lazy" className={styles.section_icon_4} alt="Blink Material"/>
        </div>
      </div>
      <div className={styles.section_4}>
        <div className={styles.heading_section_4}>
          <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
            <h2><span>Dokter</span> Kami</h2>
          </div>
        </div>
        <div className={styles.section_4_box}>
          <img src="images/nmw_dokter.webp" loading="lazy" alt="Dokter-dokter NMW Aesthetic Clinic" className={styles.our_dokter} />
          <img src="images/blink_orange.svg" loading="lazy" className={styles.section_icon_5} alt="Blink Material" />
          <img src="images/blink_grey.svg" loading="lazy" className={styles.section_icon_6} alt="Blink Material"/>
          <div className={styles.section_4_content}>
            <p>Dokter NMW Aesthetic klinik adalah dokter terpilih, terlatih secara profesional, dan terpercaya untuk melakukanbedah plastik, dermatologi, spesialis kulit dan kelamin dan perawatan kulit ekstetika.</p>
            <p>Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian untuk memberikan hasil luar biasa sekaligus memastikan keselamatan pasien.</p>
            <Link href={'/dokter-kami'}><button>Lihat Lebih Lanjut</button></Link>
          </div>
        </div>
      </div>
      <div className={styles.article_section}>
          <div className={`${styles.heading_section}`}>
            <h2><span>Artikel</span></h2>
          </div>
          <div className={styles.article_layout}>
            {articles.map(article => {
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
                      <Image
                          width={500}
                          height={500}
                          src={`${storageUrl}${article.image}`}
                          alt={article.title}
                          priority
                      />
                    </Link>
                  </div>
                  <div className={styles.article_content}>
                    <Link href={`/article/${article.slug}`}>
                      <div className={styles.article_heading}>
                        <h3>{article.title}</h3>
                      </div>
                    </Link>
                    <span>{article.author}, {formatDate(article.date)}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <Link href={"/article"}><button className={styles.btn_more}>Lihat Lebih Banyak</button></Link>
      </div>
      <div className={styles.section_5}>
        <div className={styles.section_5_box}>
          <div className={styles.section_5_layout}>
            <h4>Metode Pembayaran</h4>
            <div className={styles.section_5_logo}>
              <Image width={700} height={700} style={{ height: "auto", width: "100%" }} src="/images/logo_payment.webp" priority alt="Metode Pembayaran NMW Aesthetic Clinic"/>
            </div>
          </div>
          <div div className={styles.section_5_layout}>
            <h4>Afiliasi Pembayaran</h4>
            <div className={`${styles.section_5_logo_very_small} ${styles.section_5_logo_very_small}`}>
              <img src="images/affiliasi_payment.webp" loading="lazy" alt="Metode Pembayaran Afiliasi NMW Aesthetic Clinic"/>
            </div>
          </div>
          <div className={styles.section_5_layout}>
            <h4>Bank Transfer</h4>
            <div className={styles.section_5_logo}>
              <Image width={700} height={700} style={{ height: "auto", width: "100%" }} src="/images/bank_transfer.webp" priority alt="Metode Pembayaran NMW Aesthetic Clinic"/>
            </div>
          </div>
          <div className={styles.section_5_layout}>
            <h4>Terdaftar dan diawasi oleh</h4>
            <div className={`${styles.section_5_logo} ${styles.section_5_logo_small}`}>
              <Image width={700} height={700} style={{ height: "auto", width: "32%" }} priority src="/images/legality.webp" alt="Legalitas NMW Aesthetic Clinic"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
