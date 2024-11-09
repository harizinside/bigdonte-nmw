import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"

export default function HollywoodPeel(){
    return(
    <>
        <div className={banner.banner}>
            <img src="images/hollywood-peel.png" alt="Layanan Nmw Clinic"/>
        </div>
        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1><font></font>Hollywood Peel</h1>
            </div>
            <div className={styles.section_1_content}>
                <p>Hollywood laser peel merupakan perawatan kulit wajah yang menggabungkan teknologi laser spectra dan pengaplikasian lotion carbon. </p>
                <p>Hollywood Peel juga menawarkan perawatan yang membuat wajah Anda tampak lebih muda dan cantik layaknya selebriti Hollywood. Energi laser (spectra mode) akan menghangatkan lapisan karbon yang telah dioleskan di permukaan kulit.</p>
                <p>Selanjutnya, proses penembakan kembali pada lapisan carbon untuk pengelupasan sel kulit mati, pemecahan pigmen atau melanin, dan menstimulasi pembentukan kolagen. Hollywood laser peel direkomendasikan untuk pasien dengan kulit berminyak, pori-pori yang membesar, jerawat, dan kulit kusam. Laser carbon peel juga cocok untuk semua jenis kulit.</p>
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