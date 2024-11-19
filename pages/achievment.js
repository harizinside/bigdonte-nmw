import banner from "@/styles/Banner.module.css"
import styles from "@/styles/Award.module.css"
import { useState, useEffect } from 'react';

export default function Achievment(){

    const [achievments, setAchievments] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/achievment`);
                const data = await response.json();
                if (data && data.data) { // Pastikan data dan data.data ada
                setAchievments(data.data); // Setel data objek banner
                } else {
                console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };
 
        fetchData();
    }, []);


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
                    {achievments.map(achievment => (
                    <div className={styles.cabang_box}>
                        <div 
                            className={styles.cabang_box_image} 
                            onClick={() => handleImageClick(`https://nmw.prahwa.net/storage/${achievment.image}`)}
                            >
                            <img src={`https://nmw.prahwa.net/storage/${achievment.image}`} alt={achievment.heading} />
                        </div>
                        <div className={styles.cabang_box_content}>
                            <h1>{achievment.heading}</h1>
                            <div className={styles.cabang_box_text}>
                            <div 
  dangerouslySetInnerHTML={{ __html: achievment.description }} 
/>
                            </div>
                        </div>
                    </div>
                    ))}

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