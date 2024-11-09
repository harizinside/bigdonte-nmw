import banner from "@/styles/Banner.module.css"
import styles from "@/styles/Detail.module.css"
import Link from "next/link";

export default function DetailArtikel(){
    return(
        <>
            <div className={banner.banner}>
                <img src="images/detail-artikel-banner.png" alt="Layanan Nmw Clinic"/>
            </div>
            <div className={styles.container}>
                <div className={styles.detail_tag}>
                    <Link href={""}><button>#Skincare</button></Link>
                </div>
                <div className={styles.container_layout}>
                    <div className={styles.container_content}>
                        <div className={styles.content_heading}>
                            <h1>Seni menjaga kecantikan: rutin anti-aging untuk setiap usia</h1>
                            <span>Admin, 14-10-2024</span>
                        </div>
                        <div className={styles.content_text}>
                            <p>Menghilangkan lemak tubuh tanpa bedah Memiliki tubuh ideal dalam waktu singkat pasti banyak diidamkan setiap orang, terutama bagi kaum hawa. Selain melakukan diet dan olahraga dengan benar, kalian dapat mencoba perawatan pelangsingan tubuh. Salah satu di antaranya adalah fat freezing. Fat freezing merupakan metode terapi pembekuan lemak yang biasa disebut dengan cryolipolysis. Dilakukan di beberapa bagian tubuh tertentu, seperti pada perut, paha, maupun lengan. Cara kerja Cryolipolisis Perawatan Cryolipolisis dilakukan menggunakan alat khusus yang dapat membekukan sel lemak di bawah</p>
                            <img src="images/detail_artikel.png" alt="Artikel NMW Clinic"/>
                            <h3>Penyebab Jerawat</h3>
                            <p>Sebelum mencari solusi, penting untuk memahami penyebab jerawat. Beberapa faktor utama yang dapat menyebabkan jerawat meliputi:</p>
                            <ol>
                                <li>Produksi Minyak Berlebih Kelenjar minyak yang terlalu aktif dapat menyumbat pori-pori.</li>
                                <li>Bakteri Propionibacterium acnes dapat berkembang biak di dalam pori yang tersumbat.</li>
                                <li>Perubahan Hormon yang tidak seimbang, terutama selama masa pubertas, dapat memicu jerawat.</li>
                                <li>Pola Makan Diet tinggi gula dan lemak dapat berkontribusi terhadap timbulnya jerawat.</li>
                                <li>Stres dapat memicu produksi hormon yang meningkatkan jerawat.</li>
                                <li>Faktor genetik atau keturunan.</li>
                                <li>Kurang istirahat.</li>
                                <li>Pergesekan rambut atau pergesekan dari handuk secara kasar.</li>
                                <li>Sering memegang atau memencet jerawat. Semakin sering dipegang atau dipencet, jerawat akan semakin membesar, memburuk, serta dapat meninggalkan cacat yang sangat buruk berupa bopeng atau keloid.</li>
                                <li>Kurang merawat kebersihan pada wajah.</li>
                            </ol>
                            <p>Semua faktor di atas tidak dapat dihilangkan secara langsung dengan waktu yang singkat. Perawatan untuk jerawat secara maksimal tentunya tidak dengan waktu singkat dan bersifat berkelanjutan untuk pengobatan jerawat.</p>
                        </div>
                    </div>
                    <div className={styles.container_sidebar}>
                        <div className={styles.sidebar_heading}>
                            <h4>Artikel Lain</h4>
                            <Link href={""}>Lihat lebih banyak</Link>
                        </div>
                        <div className={styles.sidebar_layout}>
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
                                            <h1>Menghilangkan lemak tubuh tanpa bedah</h1>
                                        </div>
                                    </Link>
                                    <span>Admin, 14-10-2024</span>
                                    <Link href={"/"}><button className={styles.btn_more}>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
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
                                            <h1>Menghilangkan lemak tubuh tanpa bedah</h1>
                                        </div>
                                    </Link>
                                    <span>Admin, 14-10-2024</span>
                                    <Link href={"/"}><button className={styles.btn_more}>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
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
                                            <h1>Menghilangkan lemak tubuh tanpa bedah</h1>
                                        </div>
                                    </Link>
                                    <span>Admin, 14-10-2024</span>
                                    <Link href={"/"}><button className={styles.btn_more}>Baca Selengkapnya</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}