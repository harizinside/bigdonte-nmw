import banner from "@/styles/Banner.module.css"
import styles from "@/styles/Award.module.css"
import { useState } from 'react';

export default function Achievment(){
    const [isOpen, setIsOpen] = useState(false);
    const [popupImage, setPopupImage] = useState("");

    const handleImageClick = (src) => {
        setPopupImage(src);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    return(
        <>
            <div className={banner.banner}>
                <img src="images/banner_award.png" alt="Layanan Nmw Clinic"/>
            </div>
            <div className={styles.container}>
                <div className={`${styles.heading_section}`}>
                    <h1><font>Penghargaan</font> Kami</h1>
                </div>
                <div className={styles.cabang_layout}>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image} onClick={() => handleImageClick("images/achievment_img.png")}>
                        <img src="images/achievment_img.png" alt="Cabang NMW Clinic" />
                        </div>
                        <div className={styles.cabang_box_content}>
                        <h1>Ibsa Derma Platinum Award 2023</h1>
                        <div className={styles.cabang_box_text}>
                            <p>
                            NMW Clinic mendapatkan penghargaan persembahan dari IBSA, Aliaxin, Neoasia, Profhilo dalam Gala Award Indonesia
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image} onClick={() => handleImageClick("images/service_1.png")}>
                        <img src="images/service_1.png" alt="Cabang NMW Clinic" />
                        </div>
                        <div className={styles.cabang_box_content}>
                        <h1>Ibsa Derma Platinum Award 2023</h1>
                        <div className={styles.cabang_box_text}>
                            <p>
                            NMW Clinic mendapatkan penghargaan persembahan dari IBSA, Aliaxin, Neoasia, Profhilo dalam Gala Award Indonesia
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image} onClick={() => handleImageClick("images/detail_artikel.png")}>
                        <img src="images/detail_artikel.png" alt="Cabang NMW Clinic" />
                        </div>
                        <div className={styles.cabang_box_content}>
                        <h1>Ibsa Derma Platinum Award 2023</h1>
                        <div className={styles.cabang_box_text}>
                            <p>
                            NMW Clinic mendapatkan penghargaan persembahan dari IBSA, Aliaxin, Neoasia, Profhilo dalam Gala Award Indonesia
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image} onClick={() => handleImageClick("images/achievment_img.png")}>
                        <img src="images/achievment_img.png" alt="Cabang NMW Clinic" />
                        </div>
                        <div className={styles.cabang_box_content}>
                        <h1>Ibsa Derma Platinum Award 2023</h1>
                        <div className={styles.cabang_box_text}>
                            <p>
                            NMW Clinic mendapatkan penghargaan persembahan dari IBSA, Aliaxin, Neoasia, Profhilo dalam Gala Award Indonesia
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image} onClick={() => handleImageClick("images/service_1.png")}>
                        <img src="images/service_1.png" alt="Cabang NMW Clinic" />
                        </div>
                        <div className={styles.cabang_box_content}>
                        <h1>Ibsa Derma Platinum Award 2023</h1>
                        <div className={styles.cabang_box_text}>
                            <p>
                            NMW Clinic mendapatkan penghargaan persembahan dari IBSA, Aliaxin, Neoasia, Profhilo dalam Gala Award Indonesia
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className={styles.cabang_box}>
                        <div className={styles.cabang_box_image} onClick={() => handleImageClick("images/detail_artikel.png")}>
                        <img src="images/detail_artikel.png" alt="Cabang NMW Clinic" />
                        </div>
                        <div className={styles.cabang_box_content}>
                        <h1>Ibsa Derma Platinum Award 2023</h1>
                        <div className={styles.cabang_box_text}>
                            <p>
                            NMW Clinic mendapatkan penghargaan persembahan dari IBSA, Aliaxin, Neoasia, Profhilo dalam Gala Award Indonesia
                            </p>
                        </div>
                        </div>
                    </div>

                    {/* Modal Popup */}
                    {isOpen && (
                        <div className={styles.modal}>
                            <div className={styles.overlay_modal} onClick={closeModal}></div>
                            <div className={styles.modal_content}>
                                <span className={styles.close} onClick={closeModal}>&times;</span>
                                <img src={popupImage} alt="Popup Image" className={styles.popup_image} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}