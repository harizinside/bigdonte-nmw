import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"

export default function EssentialFacialSpa(){
    return(
    <>
        <div className={banner.banner}>
            <img src="images/essential-facial-spa.png" alt="Layanan Nmw Clinic"/>
        </div>
        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1><font></font> Essential Facial Spa</h1>
            </div>
            <div className={styles.section_1_content}>
                <p>Rangkaian treatment tradisional totok wajah dan pemijatan yang meliputi daerah wajah, leher, Pundak, bahu serta pengolesan serum di akhir treatment sesuai kebutuhan kulit dengan tujuan merelaksasikan wajah, memperlancar aliran darah serta limfatik. Dengan pilihan serum yang disesuaikan dengan kondisi kulit.</p>
                <Link href="#"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
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
                <img src="images/dokter_layanan.png" alt="Dokter-dokter NMW Clinic" className={styles.our_dokter} />
                <img src="images/bg_nmw_dokter.svg" alt="Dokter-dokter NMW Clinic" className={styles.bg_our_dokter} />
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