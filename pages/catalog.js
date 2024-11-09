import banner from "@/styles/Banner.module.css"
import styles from "@/styles/Catalog.module.css"
import Link from "next/link";

export default function Catalog(){
    return(
        <>
            <div className={banner.banner}>
                <img src="images/catalogue-banner.png" alt="Layanan Nmw Clinic"/>
            </div>
            <div className={styles.container}>
                <div className={`${styles.heading_section}`}>
                    <h1><font>Katalog</font> Harga</h1>
                </div>
                <div className={styles.box_galeri_layout}>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <img src="images/catalogue_img_1.png" alt="Katalog Harga NMW Clinic"/>
                        </div>
                        <div className={styles.box_galeri_content}>
                            <div className={styles.box_galeri_heading}>
                                <h1>Katalog Treatment & Packs 2024</h1>
                            </div>
                            <div className={styles.box_galeri_text}>
                                <p>Terakhir Diperbaharui</p>
                                <p>07 October 2024</p>
                            </div>
                        </div>
                        <div className={styles.box_galeri_button}>
                            <Link href={""}><button>Unduh</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <img src="images/catalogue_img_2.png" alt="Katalog Harga NMW Clinic"/>
                        </div>
                        <div className={styles.box_galeri_content}>
                            <div className={styles.box_galeri_heading}>
                                <h1>Katalog Plastic Surgery 2024</h1>
                            </div>
                            <div className={styles.box_galeri_text}>
                                <p>Terakhir Diperbaharui</p>
                                <p>07 October 2024</p>
                            </div>
                        </div>
                        <div className={styles.box_galeri_button}>
                            <Link href={""}><button>Unduh</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <img src="images/catalogue_img_2.png" alt="Katalog Harga NMW Clinic"/>
                        </div>
                        <div className={styles.box_galeri_content}>
                            <div className={styles.box_galeri_heading}>
                                <h1>Brosur Produk Terbaru 2024</h1>
                            </div>
                            <div className={styles.box_galeri_text}>
                                <p>Terakhir Diperbaharui</p>
                                <p>07 October 2024</p>
                            </div>
                        </div>
                        <div className={styles.box_galeri_button}>
                            <Link href={""}><button>Unduh</button></Link>
                        </div>
                    </div>
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
        </>
    );
}