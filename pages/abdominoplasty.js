import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Abdominoplasty(){
    const [isOpen, setIsOpen] = useState(true);

    const handleImageClick = (src) => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const router = useRouter();

    const handleBack = () => {
        router.back(); // Fungsi ini akan kembali ke halaman sebelumnya
    };

    return(
    <>
        <div className={banner.banner}>
            <img src="images/abdominoplasty.png" alt="Layanan Nmw Clinic"/>
        </div>
        {isOpen && (
            <div className={`${styles.modal} ${isOpen ? styles.active : ""}`}>
                <div className={styles.overlay_modal}></div>
                <div className={styles.modal_content}>
                    <h1>Verifikasi Usia</h1>
                    <p>Situs web ini berisi materi yang dibatasi usia yang mengandung unsur dewasa. Dengan ini Anda menyatakan bahwa Anda setidaknya berusia 18 tahun atau lebih, untuk mengakses situs web dan Anda setuju untuk melihat konten ini.</p>
                    <div className={styles.button_layout}>
                        <button onClick={closeModal}>Saya sudah diatas 18 Tahun</button>
                        <button onClick={handleBack}>Saya masih dibawah 18 Tahun</button>
                    </div>
                    <p>ⓒ PT.HUB 2024</p>
                </div>
            </div>
        )}
        <div className={`${styles.section_1} ${styles.section_1_sc}`}>
            <div className={styles.section_1_heading}>
                <h1><font></font> Abdominoplasty</h1>
            </div>
            <div className={styles.section_1_content}>
                <p>Pengencangan perut, juga dikenal sebagai Abdominoplasty atau Tummy Tuck adalah prosedur bedah kosmetik untuk memperbaiki bentuk dan tampilan perut, Jika Anda memiliki terlalu banyak timbunan lemak atau kulit berlebih di perut Anda yang tidak merespons dengan diet atau olahraga, Anda dapat mempertimbangkan tummy tuck, yang oleh dokter disebut Abdominoplasty. </p>
                <p>Hal yang dapat mempengaruhi harga dalam prosedur abdominoplasty adalah luas area pengerjaan, harga paket total sudah termasuk biaya dokter bedah dan biaya lainnya seperti biaya fasilitas pembedahan dan biaya yang dibutuhkan untuk prosedur operasi.</p>
                <Link href="#"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
            </div>
        </div>
        <div className={styles.section_3}>
            <div className={`${styles.box_service_layout} ${styles.box_service_layout_sc}`}>
                <div className={styles.box_service}>
                    <div className={styles.box_service_content}>
                        <h1>Abdominoplasty</h1>
                        <p>Abdominoplasty atau Tummy Tuck, adalah tindakan memperindah bentuk perut, meliputi mengurangi lemak berlebih, mengurangi kulit perut yang kendur, dan mengencangkan otot perut , serta memperindah bentuk pusar. Prosedur ini disarankan untuk kondisi perut bergelambir pasca melahirkan atau pasca obesitas.</p>
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