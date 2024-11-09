import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"

export default function Blepharoplasty(){
    return(
    <>
        <div className={banner.banner}>
            <img src="images/Blepharoplasty.png" alt="Layanan Nmw Clinic"/>
        </div>
        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1><font></font> Blepharoplasty</h1>
            </div>
            <div className={styles.section_1_content}>
                <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopak mata lebih tipis dari area wajah lainnya, sehingga kulit mata cenderung menunjukkan tanda-tanda awal penuaan.  Kelopak mata yang melorot/kendur dapat mempengaruhi penglihatan tepi dan membuat aktivitas sehari-hari menjadi lebih sulit. Blepharoplasty akan menghilangkan kelebihan kulit dan lemak serta mengencangkan otot dan jaringan kelopak mata.</p>
                <Link href="#"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
            </div>
        </div>
        <div className={styles.section_3}>
            <div className={`${styles.box_service_layout} ${styles.box_service_layout_sc}`}>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Upper Blepharoplasty</h1>
                        <p>Upper Blepharoplasty/ Koreksi kelopak mata atas meliputi pembentukan kelopak mata, memperlebar sudut mata, mengurangi kulit dan lemak berlebih.</p>
                    </div>
                    <div className={styles.box_service_btn}>
                        <Link href={""}><button>Lihat Gambar</button></Link>
                    </div>
                </div>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Lower Blepharoplasty</h1>
                        <p>Upper Blepharoplasty/ Koreksi kelopak mata atas meliputi pembentukan kelopak mata, memperlebar sudut mata, mengurangi kulit dan lemak berlebih.</p>
                    </div>
                    <div className={styles.box_service_btn}>
                        <Link href={""}><button>Lihat Gambar</button></Link>
                    </div>
                </div>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Upper And Lower Blepharoplasty</h1>
                        <p>Upper Blepharoplasty/ Koreksi kelopak mata atas meliputi pembentukan kelopak mata, memperlebar sudut mata, mengurangi kulit dan lemak berlebih.</p>
                    </div>
                    <div className={styles.box_service_btn}>
                        <Link href={""}><button>Lihat Gambar</button></Link>
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