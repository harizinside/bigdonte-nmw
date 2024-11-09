import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"

export default function FaceLift(){
    return(
    <>
        <div className={banner.banner}>
            <img src="images/face_lift.png" alt="Layanan Nmw Clinic"/>
        </div>
        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1><font></font> Face Lift</h1>
            </div>
            <div className={styles.section_1_content}>
                <Link href="#"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
            </div>
        </div>
        <div className={styles.section_3}>
            <div className={`${styles.box_service_layout} ${styles.box_service_layout_sc}`}>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Face Lift</h1>
                        <p>Face Lift dilakukan dengan menarik dan mengencangkan wajah dengan memotong sebagian kulit antara pipi dan telinga jadi jahitan tidak terlihat dan prosesnya cukup cepat untuk prosedur ini.</p>
                    </div>
                    <div className={styles.box_service_btn}>
                        <Link href={""}><button>Lihat Gambar</button></Link>
                    </div>
                </div>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Face & Neck Lift</h1>
                        <p>Seiring bertambahnya usia, kulit dan jaringan secara alami kehilangan elastisitasnya. Hal ini menyebabkan kulit kendur dan keriput. Face & neck lifting adalah prosedur bedah yang dapat mengangkat dan mengencangkan jaringan pada area wajah serta leher yang mengendur, sehingga penampilan menjadi lebih muda dan menarik.</p>
                    </div>
                    <div className={styles.box_service_btn}>
                        <Link href={""}><button>Lihat Gambar</button></Link>
                    </div>
                </div>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Forehead Reduction</h1>
                        <p>Operasi pengecilan dahi adalah prosedur kosmetik yang digunakan untuk memperpendek panjang dahi. Prosedur ini memperbaiki letak garis rambut, alis, atau fitur lainnya sehingga dapat meningkatkan proporsi wajah.
<br/><br/>
Penurunan garis rambut akan bermanfaat bagi mereka yang memiliki garis rambut tinggi dan ingin menurunkannya, atau mereka yang memiliki dahi besar. Hal ini sering kali mengalihkan perhatian dari fitur wajah dan simetri wajah atau pada umumnya orang cendenrung menutupinya dengan model rambut tertentu.
<br/><br/>
Kandidat yang pas untuk prosedur ini adalah mereka yang memiliki kelemahan kulit kepala yang baik dan tidak memiliki riwayat keluarga yang mengalami kerontokan rambut atau pola kebotakan.</p>
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