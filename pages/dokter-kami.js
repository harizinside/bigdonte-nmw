import banner from "@/styles/Banner.module.css"
import styles from "@/styles/Dokter.module.css"
import { useState } from "react";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

export default function DokterKami(){
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return(
        <>
        <div className={banner.banner}>
            <img src="images/dokter_banner.png" alt="Layanan Nmw Clinic"/>
        </div>
        <div className={styles.container}>
            <div className={styles.dokter_heading}>
                <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                    <h1><font>Dokter</font> Kami</h1>
                </div>
                <div className={styles.tabs}>
                    <button
                    className={activeTab === 0 ? styles.activeTab : styles.tab}
                    onClick={() => handleTabClick(0)}
                    >
                    Semua Departemen
                    </button>
                    <button
                    className={activeTab === 1 ? styles.activeTab : styles.tab}
                    onClick={() => handleTabClick(1)}
                    >
                    Estetika
                    </button>
                    <button
                    className={activeTab === 2 ? styles.activeTab : styles.tab}
                    onClick={() => handleTabClick(2)}
                    >
                    Operasi Plastik
                    </button>
                    <button
                    className={activeTab === 3 ? styles.activeTab : styles.tab}
                    onClick={() => handleTabClick(3)}
                    >
                    Dermatologi
                    </button>
                </div>
            </div>
            <div className={styles.tabContent}>
                {activeTab === 0 && 
                <>
                    <div className={styles.cabang_layout}>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                        <div className={styles.cabang_box}>
                            <div className={styles.cabang_box_image}>
                                <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                            </div>
                            <div className={styles.cabang_box_content}>
                                <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                <span>Kepala Dokter</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.article_pagination}>
                        <Link href={""} className={styles.active_pagination}>1</Link>
                        <Link href={""}>2</Link>
                        <Link href={""}>3</Link>
                        <Link href={""}>4</Link>
                        <Link href={""}><HiArrowLongRight/></Link>
                    </div>
                </>
                }
                {activeTab === 1 && 
                    <>
                        <div className={styles.cabang_layout}>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.article_pagination}>
                            <Link href={""} className={styles.active_pagination}>1</Link>
                            <Link href={""}>2</Link>
                            <Link href={""}>3</Link>
                            <Link href={""}>4</Link>
                            <Link href={""}><HiArrowLongRight/></Link>
                        </div>
                    </>
                }
                {activeTab === 2 && 
                    <>
                        <div className={styles.cabang_layout}>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.article_pagination}>
                            <Link href={""} className={styles.active_pagination}>1</Link>
                            <Link href={""}>2</Link>
                            <Link href={""}>3</Link>
                            <Link href={""}>4</Link>
                            <Link href={""}><HiArrowLongRight/></Link>
                        </div>
                    </>
                }
                {activeTab === 3 && 
                    <>
                        <div className={styles.cabang_layout}>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                            <div className={styles.cabang_box}>
                                <div className={styles.cabang_box_image}>
                                    <img src="images/nataliani.png" alt="Cabang NMW Clinic"/>
                                </div>
                                <div className={styles.cabang_box_content}>
                                    <h1>dr. <font>Nataliani</font> Mawardi, dipl. CIBTAC</h1>
                                    <span>Kepala Dokter</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.article_pagination}>
                            <Link href={""} className={styles.active_pagination}>1</Link>
                            <Link href={""}>2</Link>
                            <Link href={""}>3</Link>
                            <Link href={""}>4</Link>
                            <Link href={""}><HiArrowLongRight/></Link>
                        </div>
                    </>
                }
            </div>
        </div>
        </>
    );
}