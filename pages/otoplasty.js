import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"

export default function Otoplasty(){
    return(
    <>
        <div className={banner.banner}>
            <img src="images/otoplasty.png" alt="Layanan Nmw Clinic"/>
        </div>
        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1><font></font> Otoplasty</h1>
            </div>
            <div className={styles.section_1_content}>
                <p>Otoplasty (operasi telinga kosmetik) memperbaiki kelainan telinga, termasuk telinga yang menonjol, telinga yang terlalu besar, atau telinga yang cacat. Operasi ini juga dapat memperbaiki telinga yang rusak akibat trauma (rekonstruksi). Telinga terlihat lebih simetris yang dapat memperbaiki penampilan telinga Anda dan meningkatkan rasa percaya diri Anda </p>
                <Link href="#"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
            </div>
        </div>
        <div className={styles.section_3}>
            <div className={`${styles.box_service_layout} ${styles.box_service_layout_sc}`}>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>GA</h1>
                        <p>Otoplasty (operasi telinga kosmetik) memperbaiki kelainan telinga, termasuk telinga yang menonjol, telinga yang terlalu besar, atau telinga yang cacat. Operasi ini juga dapat memperbaiki telinga yang rusak akibat trauma (rekonstruksi). Telinga terlihat lebih simetris yang dapat memperbaiki penampilan telinga Anda dan meningkatkan rasa percaya diri Anda.</p>
                    </div>
                    <div className={styles.box_service_btn}>
                        <Link href={""}><button>Lihat Gambar</button></Link>
                    </div>
                </div>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>LA</h1>
                        <p>Otoplasty (operasi telinga kosmetik) memperbaiki kelainan telinga, termasuk telinga yang menonjol, telinga yang terlalu besar, atau telinga yang cacat. Operasi ini juga dapat memperbaiki telinga yang rusak akibat trauma (rekonstruksi). Telinga terlihat lebih simetris yang dapat memperbaiki penampilan telinga Anda dan meningkatkan rasa percaya diri Anda.</p>
                    </div>
                    <div className={styles.box_service_btn}>
                        <Link href={""}><button>Lihat Gambar</button></Link>
                    </div>
                </div>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Lobuloplasty</h1>
                        <p>Lobuloplasty merupakan prosedur memperbaiki bentuk dan tampilan daun telinga, yang biasanya disebabkan tindik atau kondisi tertentu menjadi lebih indah dan normal, tidak melebar dan tidak kendur.</p>
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