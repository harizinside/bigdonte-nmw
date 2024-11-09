import styles from "@/styles/Home.module.css";
import { FaWhatsapp } from "react-icons/fa";
import React, { useRef, useState } from 'react';
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

  return (
    <>
      <div className={styles.banner}>
          <div className={styles.banner_content}>
              <h1>Best Beauty <font>And Care</font></h1>
              <p>Overnight Beauty Repair For Every Budget + Skin Detox. Drink That Boost Metabolism. Improved Health.</p>
              <Link href="#"><button>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
          </div>
      </div>
      <div className={styles.section_1}>
        <div className={styles.heading_section}>
          <h1><font>Layanan</font> Kami</h1>
        </div>
        <div className={styles.slide_section_1}>
          {/* Second Swiper */}
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
                  <div className={styles.box_service_content}>
                    <h1>Plastic Surgery</h1>
                    <p>
                      NMW Plastic Surgery hadir sebagai bagian dari NMW Clinic dengan dokter-dokter spesialis bedah plastik terbaik untuk tindakan operasi dan tindakan non invasif lainnya
                    </p>
                    <Link href={'/'}><button>Lihat Detail</button></Link>
                  </div>
                  <div className={styles.box_service_image}>
                    <img src="images/service_1.png" alt="Layanan NMW" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.box_service_layout}>
                <div className={`${styles.box_service}`}>
                  <div className={styles.box_service_content}>
                    <h1>Plastic Surgery</h1>
                    <p>
                      NMW Plastic Surgery hadir sebagai bagian dari NMW Clinic dengan dokter-dokter spesialis bedah plastik terbaik untuk tindakan operasi dan tindakan non invasif lainnya
                    </p>
                    <Link href={'/'}><button>Lihat Detail</button></Link>
                  </div>
                  <div className={styles.box_service_image}>
                    <img src="images/service_1.png" alt="Layanan NMW" />
                  </div>
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
              <div className={`${styles.box_service_layout} ${styles.box_service_layout_second}`}>
                <div className={`${styles.box_service} ${styles.box_service_second}`}>
                  <div className={styles.box_service_content}>
                    <h1>Spa Treatment</h1>
                    <p>
                    NMW Clinic punya spa treatment dengan berbagai Facial, PDT, Face Therapy, Contouring, dan Advance Ageless untuk Anti-Aging
                    </p>
                    <Link href={'/'}><button>Lihat Detail</button></Link>
                  </div>
                  <div className={styles.box_service_image}>
                    <img src="images/spa_image.png" alt="Layanan NMW" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${styles.box_service_layout} ${styles.box_service_layout_second}`}>
                <div className={`${styles.box_service} ${styles.box_service_second}`}>
                  <div className={styles.box_service_content}>
                    <h1>Spa Treatment</h1>
                    <p>
                    NMW Clinic punya spa treatment dengan berbagai Facial, PDT, Face Therapy, Contouring, dan Advance Ageless untuk Anti-Aging
                    </p>
                    <Link href={'/'}><button>Lihat Detail</button></Link>
                  </div>
                  <div className={styles.box_service_image}>
                    <img src="images/spa_image.png" alt="Layanan NMW" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={styles.section_2}>
        <div className={styles.heading_section}>
          <h1><font>Tentang</font> Kami</h1>
        </div>
        <div className={styles.section_2_text}>
          <img src="images/about_image.png" alt="Tentang NMW Clinic"/>
          <p>Adalah merek Aesthetic, Skincare, Dermatology and Wellness Clinic yang berbasis di Jakarta, Indonesia. Nama NMW Skin Care berasal dari pendiri perusahaan dr. Nataliani Mawardi - dengan kata Mawar yang menandakan dan mewakili "Mawar" yang secara universal disamakan dengan keindahan dan keanggunan, dua nilai inti yang dengan bangga diperjuangkan NMW dan diwakili oleh pelanggan di Indonesia.</p>
          <Link href={"/"}><button>Lihat Cabang Kami</button></Link>
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
            <Link href={'/'}><button>Lihat Lebih Lanjut</button></Link>
          </div>
          <img src="images/dr_nataliani.png" alt="Dr. Nataliani Mawardi, dipl. CIBTAC" className={styles.section_3_image}/>
          <img src="images/bg_dokter.svg" className={styles.section_3_overlay}/>
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
          <img src="images/bg_nmw_dokter.svg" alt="Dokter-dokter NMW Clinic" className={styles.bg_our_dokter} />
          <div className={styles.section_4_content}>
            <p>Dokter NMW klinik adalah dokter terpilih, terlatih secara profesional, dan terpercaya untuk melakukanbedah plastik, dermatologi, spesialis kulit dan kelamin dan perawatan kulit ekstetika.</p>
            <p>Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian untuk memberikan hasil luar biasa sekaligus memastikan keselamatan pasien.</p>
            <Link href={'/'}><button>Lihat Lebih Lanjut</button></Link>
          </div>
        </div>
      </div>
      <div className={styles.article_section}>
          <div className={`${styles.heading_section}`}>
            <h1><font>Artikel</font></h1>
          </div>
          <div className={styles.article_layout}>
            <div className={styles.article_box}>
              <div className={styles.article_image}>
                <Link href={"/"}><button>#aging</button></Link>
                <Link href={"/"}>
                  <img src="images/article_1.png" alt="Artikel NMW Clinic"/>
                </Link>
              </div>
              <div className={styles.article_content}>
                <Link href={"/"}>
                  <div className={styles.article_heading}>
                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                  </div>
                </Link>
                <span>Admin, 14-10-2024</span>
              </div>
            </div>
            <div className={styles.article_box}>
              <div className={styles.article_image}>
                <Link href={"/"}><button>#skincare</button></Link>
                <Link href={"/"}>
                  <img src="images/article_2.png" alt="Artikel NMW Clinic"/>
                </Link>
              </div>
              <div className={styles.article_content}>
                <Link href={"/"}>
                  <div className={styles.article_heading}>
                    <h1>Menghilangkan lemak tubuh tanpa bedah</h1>
                  </div>
                </Link>
                <span>Admin, 14-10-2024</span>
              </div>
            </div>
            <div className={styles.article_box}>
              <div className={styles.article_image}>
                <Link href={"/"}><button>#skincare</button></Link>
                <Link href={"/"}>
                  <img src="images/article_3.png" alt="Artikel NMW Clinic"/>
                </Link>
              </div>
              <div className={styles.article_content}>
                <Link href={"/"}>
                  <div className={styles.article_heading}>
                    <h1>Memperbaiki tekstur kulit wajah dengan prosedur laser fractional</h1>
                  </div>
                </Link>
                <span>Admin, 14-10-2024</span>
              </div>
            </div>
          </div>
          <Link href={"/"}><button className={styles.btn_more}>Lihat Lebih Banyak</button></Link>
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
