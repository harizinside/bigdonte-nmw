import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"

export default function Botulinum(){
    return(
    <>
        <div className={banner.banner}>
            <img src="images/botulinum.png" alt="Layanan Nmw Clinic"/>
        </div>
        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1><font></font> Botulinum Toxin Injection</h1>
            </div>
            <div className={styles.section_1_content}>
                <p>Botulinum toxin adalah tindakan injeksi yang digunakan dengan tujuan merelaksasikan otot (Muscle relaxant) pada bagian wajah untuk menghilangkan kerutan dan garis halus pada area wajah,</p>
                <p>mengurangi penebalan otot pada daerah rahang (Masetter) sehingga terlihat tirus serta dapat mengurangi keringat berlebih pada area tertentu seperti telapak tangan, ketiak (hyperhidrosis). Selain itu dengan teknik messobotox, dapat juga memberikan efek sebagai pengencangan kulit.</p>
                <p>Waktu yang dibutuhkan dari Botulinum toxin bekerja adalah 24-48 jam setelah injeksi. Kelemahan otot mulai dapat diamati pada hari ke-2 sampai hari ke-10, namun efek maksimal tercapai setelah 2 minggu.</p>
                <p>Efek botulinum toxin sangat bervariatif dapat bertahan selama kurang lebih 3-12 bulan, namun hal tersebut juga di pengaruhi oleh beberapa faktor, seperti pola aktivitas yang meningkatkan metabolisme, efek paparan panas matahari, efek resistensi dalam tubuh pasien, pemakaian antibiotic dsb.  Secara umum bagian yang biasa dilakukan penyuntikan filler adalah area bawah mata, dahi, pipi, rahang, bibir, serta dagu.</p>
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