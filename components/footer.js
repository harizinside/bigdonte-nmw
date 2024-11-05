import styles from '@/styles/Footer.module.css'
import Link from 'next/link'

export default function Footer(){
    return(
        <>
            <div className={styles.footer}>
                <div className={styles.footer_logo}>
                    <img src='images/logo.svg' alt='Logo NMW Clinic'/>
                    <div className={styles.footer_form}>
                        <h5>Berlangganan dengan berita terbaru kami</h5>
                        <p>Daftar untuk tips perawatan kulit, saran ahli acara eksklusif dari NMW Klinik</p>
                        <form>
                            <div className={styles.form_layout}>
                                <input type='email' placeholder='email@gmail.com'/><button>Berlangganan</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.contact_footer}>
                    <h4>Hubungi Kami</h4>
                    <div className={styles.contact_footer_layout}>
                        <div className={styles.contact_footer_box}>
                            <h5>Alamat</h5>
                            <p>Jl. Petogogan II No.29 RT.008 RW.006 Kel. Pulo, Kec. Kebayoran Baru Kota Jakarta Selatan <br/>Prov. DKI Jakarta 12160</p>
                        </div>
                        <div className={styles.contact_footer_box}>
                            <h5>Layanan Pelanggan</h5>
                            <p>081280360370</p>
                        </div>
                        <div className={styles.contact_footer_box}>
                            <h5>Email</h5>
                            <p>hello@nmwclinic.co.id</p>
                        </div>
                    </div>
                </div>
                <div className={styles.contact_footer}>
                    <h4>Lainnya</h4>
                    <ul>
                        <li><Link href="#">Karir</Link></li>
                        <li><Link href="#">Bantuan Kami</Link></li>
                        <li><Link href="#">FAQ</Link></li>
                    </ul>
                </div>
                <div className={styles.contact_footer}>
                    <h4>Legalitas</h4>
                    <ul>
                        <li><Link href="#">Kebijakan Privasi</Link></li>
                        <li><Link href="#">Syarat & Ketentuan</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}