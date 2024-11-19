import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function CosmeticDermatology(){
    return(
        <>
            <div className={banner.banner}>
                <img src="images/medical-treatment.png" alt="Layanan Nmw Clinic"/>
            </div>
            <div className={styles.section_1}>
                <div className={styles.section_1_heading}>
                    <h1><font>Cosmetic</font> Dermatology</h1>
                    <Link href="#"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
                </div>
                <div className={styles.section_1_content}>
                    <p>NMW Clinic untuk Medical Treatment adanya Meso, Couter,PRP, Intravena Injection, Oxjet dan Trichology Package (untuk rambut)</p>
                </div>
            </div>
            <div className={styles.section_2}>
                <div className={`${styles.heading_section}`}>
                    <h1><font>Jenis</font> Layanan</h1>
                </div>
                <div className={styles.box_galeri_layout}>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <img src="images/layanan_spa_treatment.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>Essential Facial</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <img src="images/layanan_spa_treatment.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>Essential Facial</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <img src="images/layanan_spa_treatment.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>Essential Facial</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <img src="images/layanan_spa_treatment.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>Essential Facial</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <img src="images/layanan_spa_treatment.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>Essential Facial</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <img src="images/layanan_spa_treatment.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>Essential Facial</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <img src="images/layanan_spa_treatment.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>Essential Facial</button>
                            </div>
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
                <img src="images/blink_orange.svg" className={styles.section_icon_5} />
                <img src="images/blink_grey.svg" className={styles.section_icon_6} />
                <div className={styles.section_4_content}>
                    <p>Dokter NMW klinik adalah dokter terpilih, terlatih secara profesional, dan terpercaya untuk melakukanbedah plastik, dermatologi, spesialis kulit dan kelamin dan perawatan kulit ekstetika.</p>
                    <p>Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian untuk memberikan hasil luar biasa sekaligus memastikan keselamatan pasien.</p>
                    <Link href={'/'}><button>Lihat Lebih Lanjut</button></Link>
                </div>
                </div>
            </div>
        </>
    )
}