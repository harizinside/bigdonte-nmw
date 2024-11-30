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

export default function Home() {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const [settings, setSettings] = useState([]);
  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/article-new`);
            const data = await response.json();
            if (data && data.data) { // Pastikan data dan data.data ada
                // Ambil artikel dari data.data
                const articles = data.data;

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
        }
    };

    fetchData();
}, []);    

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
    const fetchServices = async () => {
        try {
            const response = await fetch(`${baseUrl}/service`);
            const data = await response.json();
            if (data && data.data) {
                setServices(data.data);

                // Ambil detail untuk semua layanan
                const serviceDetailsPromises = data.data.map(async (service) => {
                    const responseDetail = await fetch(`${baseUrl}/service_detail/${service.id}`);
                    const detailData = await responseDetail.json();
                    return { id: service.id, detail: detailData?.data };
                });

                const resolvedDetails = await Promise.all(serviceDetailsPromises);
                const detailsMap = resolvedDetails.reduce((acc, { id, detail }) => {
                    if (detail) acc[id] = detail;
                    return acc;
                }, {});

                setServiceDetails(detailsMap); // Simpan semua detail di state
            }
        } catch (error) {
            console.error('Error fetching services or details:', error);
        }
    };

    fetchServices();
  }, [baseUrl]);


  const midIndex = Math.ceil(services.length / 2);
  const firstHalf = services.slice(0, midIndex); // First half of the services
  const secondHalf = services.slice(midIndex); 

  const formattedPhone = settings.phone && settings.phone.startsWith('0')
    ? '62' + settings.phone.slice(1)  // Replace the first 0 with 62
    : settings.phone;

  return (
    <>
      <div className={styles.banner}>
          <div className={styles.banner_content}>
              <h1>Best Beauty <font>And Care</font></h1>
              <p>Overnight Beauty Repair For Every Budget + Skin Detox. Drink That Boost Metabolism. Improved Health.</p>
              <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`}  target="blank_"><button>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
          </div>
      </div>
      <div className={styles.section_1}>
          <div className={styles.heading_section}>
              <h1><font>Layanan</font> Kami</h1>
          </div>
          <div className={styles.slide_section_1}>
          {firstHalf.length > 0 &&
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
                      <SwiperSlide key={service.id}>
                          <div className={styles.box_service_layout}>
                              <div className={`${styles.box_service}`}>
                                  <div className={styles.box_service_content}>
                                      <h1>{service.name}</h1>
                                      <p>
                                          {serviceDetails[service.id]?.description || "Loading..."}
                                      </p>
                                      <Link href={`/layanan/${encodeURIComponent(service.name.replace(/\s+/g, '-').toLowerCase())}`}>
                                          <button>Lihat Detail</button>
                                      </Link>
                                  </div>
                                  <div className={styles.box_service_image}>
                                      <img
                                          src={`https://nmw.prahwa.net/storage/${serviceDetails[service.id]?.image || "placeholder.png"}`}
                                          alt={service.name}
                                      />
                                  </div>
                              </div>
                          </div>
                      </SwiperSlide>
                  ))}
              </Swiper>
              
          }

              <Swiper
                  navigation={true}
                  modules={[Navigation, Controller]}
                  className="mySwiper mySwiperSecond"
                  loop={true}
                  onSwiper={setFirstSwiper}
                  controller={{ control: secondSwiper }}
              >
                  {secondHalf.map((service) => (
                      <SwiperSlide key={service.id}>
                          <div
                              className={`${styles.box_service_layout} ${styles.box_service_layout_second}`}
                          >
                              <div className={`${styles.box_service} ${styles.box_service_second}`}>
                                  <div className={styles.box_service_content}>
                                      <h1>{serviceDetails[service.id]?.name || service.name}</h1>
                                      <p>
                                          {serviceDetails[service.id]?.description ||
                                              "Loading..."}
                                      </p>
                                      <Link href={`/layanan/${encodeURIComponent(service.name.replace(/\s+/g, '-').toLowerCase())}`}>
                                          <button>Lihat Detail</button>
                                      </Link>
                                  </div>
                                  <div className={styles.box_service_image}>
                                      <img
                                          src={`https://nmw.prahwa.net/storage/${serviceDetails[service.id]?.image ||
                                              "Loading..."}`}
                                          alt={service.name}
                                      />
                                  </div>
                              </div>
                          </div>
                      </SwiperSlide>
                  ))}
              </Swiper>
          </div>
      </div>
      <div className={styles.section_2}>
        <div className={styles.heading_section}>
          <h1><font>Tentang</font> Kami</h1>
        </div>
        <div className={styles.section_2_text}>
          <img src="images/about_image.png" alt="Tentang NMW Clinic"/>
          <p>Adalah merek Aesthetic, Skincare, Dermatology and Wellness Clinic yang berbasis di Jakarta, Indonesia. Nama NMW Skin Care berasal dari pendiri perusahaan dr. Nataliani Mawardi - dengan kata Mawar yang menandakan dan mewakili Mawar yang secara universal disamakan dengan keindahan dan keanggunan, dua nilai inti yang dengan bangga diperjuangkan NMW dan diwakili oleh pelanggan di Indonesia.</p>
          <Link href={"/cabang"}><button>Lihat Cabang Kami</button></Link>
        </div>
      </div>
      <div className={styles.section_3}>
        <div className={styles.heading_section_3}>
          <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
            <h1><font>Pendiri</font></h1>
            <p>dr. Nataliani Mawardi, dipl. CIBTAC</p>
          </div>
        </div>
        <div className={styles.section_3_box}>
          <div className={styles.section_3_content}>
            <p>Dr. Nataliani Mawardi adalah seorang pendiri dari klinik kecantikan NMW yang kini menjadi salah satu klinik kepercayaan artis top nasional dan masyarakat luas untuk perawatan wajah.</p>
            <p>Dr. Nataliani memiliki pendirian “give back to community”. Melihat kurangnya kepedulian ibu-ibu di pasar membuat Dr. Nataliani berinisiatif memberikan konsultasi untuk jaga kesehatan.</p>
            <Link href={'/achievment'}><button>Lihat Lebih Lanjut</button></Link>
          </div>
          <img src="images/dr_nataliani.png" alt="Dr. Nataliani Mawardi, dipl. CIBTAC" className={styles.section_3_image}/>
          <img src="images/blink_orange.svg" className={styles.section_icon_1} />
          <img src="images/blink_orange.svg" className={styles.section_icon_2} />
          <img src="images/blink_grey.svg" className={styles.section_icon_3} />
          <img src="images/blink_grey.svg" className={styles.section_icon_4} />
        </div>
      </div>
      <div className={styles.section_4}>
        <div className={styles.heading_section_4}>
          <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
            <h1><font>Dokter Kami</font></h1>
            <p>dr. Nataliani Mawardi, dipl. CIBTAC</p>
          </div>
        </div>
        <div className={styles.section_4_box}>
          <img src="images/nmw_dokter.png" alt="Dokter-dokter NMW Clinic" className={styles.our_dokter} />
          <img src="images/blink_orange.svg" className={styles.section_icon_5} />
          <img src="images/blink_grey.svg" className={styles.section_icon_6} />
          <div className={styles.section_4_content}>
            <p>Dokter NMW klinik adalah dokter terpilih, terlatih secara profesional, dan terpercaya untuk melakukanbedah plastik, dermatologi, spesialis kulit dan kelamin dan perawatan kulit ekstetika.</p>
            <p>Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian untuk memberikan hasil luar biasa sekaligus memastikan keselamatan pasien.</p>
            <Link href={'/dokter-kami'}><button>Lihat Lebih Lanjut</button></Link>
          </div>
        </div>
      </div>
      <div className={styles.article_section}>
          <div className={`${styles.heading_section}`}>
            <h1><font>Artikel</font></h1>
          </div>
          <div className={styles.article_layout}>
            {articles.map(article => (
              <div className={styles.article_box} key={article.id}> 
                <div className={styles.article_image}>
                  <Link href={""}><button>#aging</button></Link>
                  <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                    <img src={article.image} alt={article.title}/>
                  </Link>
                </div>
                <div className={styles.article_content}>
                  <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                    <div className={styles.article_heading}>
                      <h1>{article.title}</h1>
                    </div>
                  </Link>
                  <span>Admin, {article.date}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href={"/artikel"}><button className={styles.btn_more}>Lihat Lebih Banyak</button></Link>
      </div>
      <div className={styles.section_5}>
        <div className={styles.section_5_box}>
          <div className={styles.section_5_layout}>
            <h4>Metode Pembayaran</h4>
            <div className={styles.section_5_logo}>
              <img src="images/logo_payment.png" alt="Metode Pembayaran NMW Clinic"/>
            </div>
          </div>
          <div className={styles.section_5_layout}>
            <h4>Bank Transfer</h4>
            <div className={styles.section_5_logo}>
              <img src="images/bank_transfer.png" alt="Metode Pembayaran NMW Clinic"/>
            </div>
          </div>
          <div className={styles.section_5_layout}>
            <h4>Terdaftar dan diawasi oleh</h4>
            <div className={`${styles.section_5_logo} ${styles.section_5_logo_small}`}>
              <img src="images/legality.png" alt="Legalitas NMW Clinic"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
