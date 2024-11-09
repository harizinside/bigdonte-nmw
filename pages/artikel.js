import { useState } from 'react';
import styles from "@/styles/Article.module.css"
import banner from "@/styles/Banner.module.css"
import Link from 'next/link';
import { HiArrowLongRight } from "react-icons/hi2";

export default function Artikel() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
    <div className={banner.banner}>
        <img src="images/slimming-treatment.png" alt="Layanan Nmw Clinic"/>
    </div>
    <div className={styles.container}>
        <div className={`${styles.heading_section}`}>
            <h1><font>NMW</font> Article</h1>
        </div>
        <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
                <button
                className={activeTab === 0 ? styles.activeTab : styles.tab}
                onClick={() => handleTabClick(0)}
                >
                Semua
                </button>
                <button
                className={activeTab === 1 ? styles.activeTab : styles.tab}
                onClick={() => handleTabClick(1)}
                >
                Slimming
                </button>
                <button
                className={activeTab === 2 ? styles.activeTab : styles.tab}
                onClick={() => handleTabClick(2)}
                >
                Skincare
                </button>
                <button
                className={activeTab === 3 ? styles.activeTab : styles.tab}
                onClick={() => handleTabClick(3)}
                >
                Hair Solution
                </button>
            </div>

            <div className={styles.tabContent_container}>
                <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                    <h1><font>Artikel</font> Terbaru</h1>
                </div>
                <div className={styles.heading_sidebar}>
                    <h1>Tag Artikel</h1>
                </div>
            </div>
            <div className={styles.tabContent}>
                {activeTab === 0 && 
                    <div className={styles.tabcontent_layout}>
                        <div className={styles.tabcontent_section}>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.article_sidebar_layout}>
                            <div className={styles.article_sidebar_button}>
                                <Link href={""}><button>#aging</button></Link>
                                <Link href={""}><button>#Skincare</button></Link>
                                <Link href={""}><button>#Aging</button></Link>
                            </div>
                        </div>
                    </div>
                }
                {activeTab === 1 && 
                    <div className={styles.tabcontent_layout}>
                        <div className={styles.tabcontent_section}>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.article_sidebar_layout}>
                            <div className={styles.article_sidebar_button}>
                                <Link href={""}><button>#aging</button></Link>
                                <Link href={""}><button>#Skincare</button></Link>
                                <Link href={""}><button>#Aging</button></Link>
                            </div>
                        </div>
                    </div>
                }
                {activeTab === 2 && 
                    <div className={styles.tabcontent_layout}>
                        <div className={styles.tabcontent_section}>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                            <div className={styles.tabcontent_box}>
                                <div className={styles.tabcontent_box_img}>
                                    <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                    <span>Admin, 14-10-2024</span>
                                    <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                    <Link href={""}><button>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.article_sidebar_layout}>
                            <div className={styles.article_sidebar_button}>
                                <Link href={""}><button>#aging</button></Link>
                                <Link href={""}><button>#Skincare</button></Link>
                                <Link href={""}><button>#Aging</button></Link>
                            </div>
                        </div>
                    </div>
                }
                {activeTab === 3 && 
                <div className={styles.tabcontent_layout}>
                    <div className={styles.tabcontent_section}>
                        <div className={styles.tabcontent_box}>
                            <div className={styles.tabcontent_box_img}>
                                <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                            </div>
                            <div className={styles.tabcontent_box_text}>
                                <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                <span>Admin, 14-10-2024</span>
                                <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                <Link href={""}><button>Baca Selengkapnya</button></Link>
                            </div>
                        </div>
                        <div className={styles.tabcontent_box}>
                            <div className={styles.tabcontent_box_img}>
                                <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                            </div>
                            <div className={styles.tabcontent_box_text}>
                                <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                <span>Admin, 14-10-2024</span>
                                <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                <Link href={""}><button>Baca Selengkapnya</button></Link>
                            </div>
                        </div>
                        <div className={styles.tabcontent_box}>
                            <div className={styles.tabcontent_box_img}>
                                <img src='images/article_image_page.png' alt='Seni menjaga kecantikan: rutin anti-aging untuk setiap usia'/>
                                <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                            </div>
                            <div className={styles.tabcontent_box_text}>
                                <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                                <span>Admin, 14-10-2024</span>
                                <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                                <Link href={""}><button>Baca Selengkapnya</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.article_sidebar_layout}>
                        <div className={styles.article_sidebar_button}>
                            <Link href={""}><button>#aging</button></Link>
                            <Link href={""}><button>#Skincare</button></Link>
                            <Link href={""}><button>#Aging</button></Link>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    </div>
    <div className={styles.article_section}>
        <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
            <h1><font>Artikel</font> Lain</h1>
        </div>
        <div className={styles.article_container}>
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
                        <Link href={"/"}><button className={styles.btn_more}>Baca Selengkapnya</button></Link>
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
                        <Link href={"/"}><button className={styles.btn_more}>Baca Selengkapnya</button></Link>
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
                        <Link href={"/"}><button className={styles.btn_more}>Baca Selengkapnya</button></Link>
                    </div>
                </div>
            </div>
            <div className={styles.article_pagination}>
                <Link href={""} className={styles.active_pagination}>1</Link>
                <Link href={""}>2</Link>
                <Link href={""}>3</Link>
                <Link href={""}>4</Link>
                <Link href={""}><HiArrowLongRight/></Link>
            </div>
        </div>
    </div>
    </>
  );
}
