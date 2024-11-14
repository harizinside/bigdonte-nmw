import styles from "@/styles/Layanan.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function Layanan(){
    return(
        <>
            <div className={banner.banner}>
                <img src="images/banner_plastic.png" alt="Layanan Nmw Clinic"/>
            </div>
            <div className={styles.section_1}>
                <div className={styles.section_1_heading}>
                    <h1><font>Plastic</font> Surgery</h1>
                    <Link href="#"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
                </div>
                <div className={styles.section_1_content}>
                    <p>NMW Plastic Surgery hadir sebagai bagian dari NMW Klinik guna menjawab kebutuhan masyarakat untuk berkonsultasi dengan dokter-dokter spesialis bedah plastik terbaik seputar layanan bedah plastik baik melalui tindakan operasi maupun tindakan non invasif lainnya.</p>
                    <p>NMW Plastic Surgery dilengkapi dengan peralatan terunggul di kelasnya untuk menunjang perawatan pasien-pasien kami. Fasilitas yang lengkap, tempat yang nyaman, serta lokasi yang strategis menjadikan kami pilihan terbaik bagi Anda. Tidak perlu ragu untuk berkonsultasi dengan dokter-dokter kami di masa pandemi, karena kami menyediakan layanan telemedicine serta protokol kesehatan yang dijaga ketat.</p>
                    <p>NMW Klinik yang telah berpengalaman sejak tahun 2007 dalam bidang estetika, kini memperluas layanan yang diberikan dengan harapan bahwa perawatan di bidang bedah plastik semakin dekat dan mudah diakses oleh masyarakat, karena kami memahami bahwa menjalani prosedur bedah plastik bukanlah keputusan yang mudah. Enhancing Beauty, Preserving Identity menjadi tagline NMW Plastic Surgery.</p>
                    <p>NMW Plastic Surgery hadir sebagai bagian dari NMW Klinik guna menjawab kebutuhan masyarakat untuk berkonsultasi dengan dokter-dokter spesialis bedah plastik terbaik seputar layanan bedah plastik baik melalui tindakan operasi maupun tindakan non invasif lainnya.</p>
                </div>
            </div> 
            <div className={styles.section_2}>
                <div className={`${styles.heading_section}`}> 
                    <h1><font>Galeri</font> Bedah Plastik</h1>
                </div>
                <div className={styles.box_galeri_layout}>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <img src="images/before_after.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={styles.button_image}>
                                <button>Sebelum</button>
                                <button>Sesudah</button>
                            </div>
                        </div>
                        <div className={styles.box_galeri_content}>
                            <div className={styles.box_galeri_heading}>
                                <h1>Lower Blepharoplasty</h1>
                                <h3>Pasien Case #79</h3>
                            </div>
                            <div className={styles.box_galeri_text}>
                                <p>Pasien berikut melakukan tindakan Blepharoplasty koreksi kelopak mata bagian bawah agar penampakan mata menjadi lebih fresh dan youthful</p>
                            </div>
                        </div>
                        <div className={styles.box_galeri_button}>
                            <Link href={""}><button>Lihat Gambar Pasien #79</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <img src="images/before_after.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={styles.button_image}>
                                <button>Sebelum</button>
                                <button>Sesudah</button>
                            </div>
                        </div>
                        <div className={styles.box_galeri_content}>
                            <div className={styles.box_galeri_heading}>
                                <h1>Lower Blepharoplasty</h1>
                                <h3>Pasien Case #79</h3>
                            </div>
                            <div className={styles.box_galeri_text}>
                                <p>Pasien berikut melakukan tindakan Blepharoplasty koreksi kelopak mata bagian bawah agar penampakan mata menjadi lebih fresh dan youthful</p>
                            </div>
                        </div>
                        <div className={styles.box_galeri_button}>
                            <Link href={""}><button>Lihat Gambar Pasien #79</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <img src="images/before_after.png" alt="Galeri Bedah Plastik NMW Clinic"/>
                            <div className={styles.button_image}>
                                <button>Sebelum</button>
                                <button>Sesudah</button>
                            </div>
                        </div>
                        <div className={styles.box_galeri_content}>
                            <div className={styles.box_galeri_heading}>
                                <h1>Lower Blepharoplasty</h1>
                                <h3>Pasien Case #79</h3>
                            </div>
                            <div className={styles.box_galeri_text}>
                                <p>Pasien berikut melakukan tindakan Blepharoplasty koreksi kelopak mata bagian bawah agar penampakan mata menjadi lebih fresh dan youthful</p>
                            </div>
                        </div>
                        <div className={styles.box_galeri_button}>
                            <Link href={""}><button>Lihat Gambar Pasien #79</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.section_3}>
                <div className={`${styles.heading_section}`}>
                    <h1><font>Jenis</font> Layanan</h1>
                </div>
                <div className={styles.box_service_layout}>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
                        </div>
                    </div>
                    <div className={styles.box_service}>
                        <div className={styles.box_service_image}>
                            <img src="images/layanan.svg" alt="Layanan NMW Clinic"/>
                        </div>
                        <div className={styles.box_service_content}>
                            <h1>Blepharoplasty</h1>
                            <p>Blepharoplasty adalah prosedur bedah untuk memperbaiki kelopak mata yang kendur. Karena kulit kelopa</p>
                        </div>
                        <div className={styles.box_service_btn}>
                            <Link href={""}><button>Lihat Detail</button></Link>
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
                    {/* <img src="images/bg_nmw_dokter.svg" alt="Dokter-dokter NMW Clinic" className={styles.bg_our_dokter} /> */}
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