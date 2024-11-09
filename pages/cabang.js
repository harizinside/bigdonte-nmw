import styles from "@/styles/Cabang.module.css"
import banner from "@/styles/Banner.module.css"
import { FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";

export default function Cabang(){
    return(
        <>
            <div className={banner.banner}>
                <img src="images/cabang-banner.png" alt="Layanan Nmw Clinic"/>
            </div>
            <div className={styles.container}>
                <div className={`${styles.heading_section}`}>
                    <h1><font>Cabang</font> Kami</h1>
                </div>
                <div className={styles.cabang_layout}>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Sabtu - Minggu : 00.09-17.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image}>
                            <img src="images/cabang_image.png" alt="Cabang NMW Clinic"/>
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>Petogogan</h1>
                            <div className={styles.cabang_box_text}>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Alamat</h3>
                                    <p>Jl. Petogogan II No. 29</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Operasional</h3>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                    <p>Senin - Jumat : 10.00-20.00</p>
                                </div>
                                <div className={styles.cabang_box_detail}>
                                    <h3>Telepon</h3>
                                    <p>62217221258</p>
                                </div>
                            </div>
                            <div className={styles.cabang_box_button}>
                                <Link href={""}><button>Pesan Sekarang <FaWhatsapp/></button></Link>
                                <Link href={""}><button><SlLocationPin/></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}