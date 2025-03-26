import Head from "next/head";
import styles from "@/styles/Header.module.css"
import { HiOutlineMapPin } from "react-icons/hi2";
import { PiPhoneCall } from "react-icons/pi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from "next/link";
import 'animate.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from "next/router";
import { IoIosMenu } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import popup from "@/styles/Popup.module.css"

// components/Header.js
export default function Header() {
    const [dropdownActive, setDropdownActive] = useState(null); // Track active dropdown
    const router = useRouter();
    const [services, setServices] = useState([]);
    const [popupData, setPopupData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const headerRef = useRef(null); // Reference to header element
    const [menuActive, setMenuActive] = useState(false);

    const [isLoading, setIsLoading] = useState(true); // State to track loading state
    const [settings, setSettings] = useState([]);
    const [socials, setSocials] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

    const [isSticky, setIsSticky] = useState(true);

    useEffect(() => {
        if (router.pathname.startsWith("/article/")) {
            setIsSticky(false);
        } else {
            setIsSticky(true);
        }
    }, [router.pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/service`);
                const data = await response.json();
                const reversedData = Array.isArray(data.services) ? [...data.services].reverse() : [];

                setServices(reversedData);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }; 
 
        fetchData();
    }, [baseUrl]);

    // Function to handle click outside of dropdown
    const handleClickOutside = (event) => {
        if (headerRef.current && !headerRef.current.contains(event.target)) {
            setDropdownActive(null); // Close dropdown if clicked outside
        }
    };

    // Function to handle scroll event
    const handleScroll = () => {
        setDropdownActive(null); // Close dropdown on scroll
    };

    // Add and remove event listeners
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to toggle dropdown menu
    const toggleDropdown = (dropdownName) => {
        // Close the active dropdown if the user clicks on the same menu
        if (dropdownActive === dropdownName) {
            setDropdownActive(null); // Close it
        } else {
            setDropdownActive(dropdownName); // Open the clicked menu
        }
    };
    

    const handleHamburger = () => {
        setMenuActive(!menuActive);
    };

    const clickMenu = () => {
        closeDropdown();
        handleHamburger();
    };

    const closeDropdown = () => {
        setDropdownActive(null);
      };

    // Function to highlight active menu based on router path
    const isActive = (path) => {
        return router.asPath === path ? styles.active : '';
    };

    useEffect(() => {
        const fetchData = async () => {
            const cachedSetting = localStorage.getItem('settingCache');
            const cachedSettingExpired = localStorage.getItem('settingCacheExpired');
            const now = new Date().getTime();
    
            // Cek apakah cache valid
            if (cachedSetting && cachedSettingExpired && now < parseInt(cachedSettingExpired)) {
                setSettings(JSON.parse(cachedSetting));
                setIsLoading(false);
                
                // Lakukan pengecekan data API untuk pembaruan data
                try {
                    const response = await fetch(`${baseUrl}/settings`);
                    const data = await response.json();

                    const cachedData = JSON.parse(cachedSetting);
                    
                    // Bandingkan data baru dengan cache
                    if (JSON.stringify(data) !== JSON.stringify(cachedData)) {
                        setSettings(data);
                        localStorage.setItem('settingCache', JSON.stringify(data));
                        localStorage.setItem('settingCacheExpired', (now + 86400000).toString());
                    } 
                } catch (error) {
                    console.error('Error checking API for updates:', error);
                }
                return;
            }
    
            // Fetch data jika tidak ada cache atau cache sudah kadaluarsa
            try {
                const response = await fetch(`${baseUrl}/settings`);
                const data = await response.json();
    
                setSettings(data);
                localStorage.setItem('settingCache', JSON.stringify(data));
                localStorage.setItem('settingCacheExpired', (now + 86400000).toString());
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [baseUrl]);

    const fetchSocials = useCallback(async () => {
        if (typeof window === "undefined") return;

        const cachedSocials = localStorage.getItem("socialsCache");
        const cachedExpired = localStorage.getItem("socialsCacheExpired");
        const now = Date.now();

        // **Cek apakah cache masih berlaku**
        if (cachedSocials && cachedExpired && now < parseInt(cachedExpired)) {
            const cachedData = JSON.parse(cachedSocials);
            setSocials(cachedData);
            setIsLoading(false);

            // **Cek apakah ada update di API**
            try {
                const response = await fetch(`${baseUrl}/socials`);
                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

                const data = await response.json();
                if (data.length > 0 && data[0].updatedAt !== cachedData[0].updatedAt) {
                    setSocials(data);
                    localStorage.setItem("socialsCache", JSON.stringify(data));
                    localStorage.setItem("socialsCacheExpired", (now + 86400000).toString());
                }
            } catch (error) {
                console.error("Error checking API for updates:", error);
            }
            return;
        }

        // **Ambil data baru jika cache tidak ada atau sudah kadaluarsa**
        try {
            const response = await fetch(`${baseUrl}/socials`);
            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

            const data = await response.json();
            if (data.length > 0) {
                setSocials(data);
                localStorage.setItem("socialsCache", JSON.stringify(data));
                localStorage.setItem("socialsCacheExpired", (now + 86400000).toString());
            }
        } catch (error) {
            console.error("Error fetching socials:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSocials();
    }, [fetchSocials]);

    useEffect(() => {
        const fetchData = async () => {
            const cachedPopup = localStorage.getItem('popupCache');
            const popupTimestamp = localStorage.getItem('popupTimestamp');
            const popupShown = localStorage.getItem('popupShown');
            const now = Date.now();
    
            // Jika popup sudah ditampilkan kurang dari 1 jam, gunakan cache
            if (popupShown === 'true' && popupTimestamp && now - parseInt(popupTimestamp) < 60 * 60 * 1000) {
                if (cachedPopup) {
                    setPopupData(JSON.parse(cachedPopup));
                }
                setIsLoading(false);
                return;
            }
    
            try {
                const response = await fetch(`${baseUrl}/popup`);
                const data = await response.json();
    
                if (data?.popups?.length > 0) {
                    const popupItem = data.popups[0]; // Ambil popup pertama jika berbentuk array
                    setPopupData(popupItem);
                    localStorage.setItem('popupCache', JSON.stringify(popupItem));
                    localStorage.setItem('popupTimestamp', now.toString());
                    localStorage.setItem('popupShown', 'true');
                    setShowPopup(true);
                }
            } catch (error) {
                console.error("Error fetching popup data:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [baseUrl]);

    const socialMediaLinks = settings?.social_media ? JSON.parse(settings.social_media) : [];

    const iconMapping = {
        Facebook: <FaFacebook />,
        Instagram: <FaInstagram />,
        Tiktok: <FaTiktok />,
        Youtube: <FaYoutube />,
        Twitter: <FaTwitter />,
        Linkedin: <FaLinkedin/>,
        Whatsapp: <FaWhatsapp/>
    };

    const formattedPhone = settings.phone && settings.phone.startsWith('0')
    ? '62' + settings.phone.slice(1)  // Replace the first 0 with 62
    : settings.phone;


    // Handle closing the modal
    const closeModal = () => {
        setShowPopup(false);  // Close the modal
    };

    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "name": "NMW Aesthetic Clinic",
            "url": `${mainUrl}`,
            "logo": `${storageUrl}/${settings.logo}`,
            "description": "Klinik Aesthetic, Skincare, dan Dermatologi terpercaya di Jakarta.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Petogogan II No.29 RT.008 RW.006 Kel. Pulo, Kec. Kebayoran Baru Kota Jakarta Selatan Prov. DKI Jakarta 12160",
              "addressLocality": "Jakarta Selatan",
              "addressRegion": "DKI Jakarta",
              "postalCode": "12160",
              "addressCountry": "ID"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+62 812-8036-0370",
              "contactType": "customer service",
              "areaServed": "ID",
              "availableLanguage": "Indonesian"
            },
            "sameAs": socials.map(item => item.link) // Ambil hanya link dari API
          },
          {
            "@type": "WebSite",
            "name": "NMW Aesthetic Clinic",
            "url": `${mainUrl}`,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${mainUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }
        ]
      };      

    return (
        <>
        <Head>
            <meta name="google-site-verification" content="iYG_LhQQBgtnR0eh5LxjemSAR_8cAHBnM7WZ_Dqq_N8" />

            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="icon" href={`${storageUrl}/${settings.favicon}`} />

            <link rel="apple-touch-icon" href={`${storageUrl}/${settings.favicon}`} />

            <meta name="robots" content="index, follow" />
            <script type="application/ld+json">
            {JSON.stringify(schemaData)}
            </script>
        </Head>

        <div className={isSticky ? styles.header : styles.headerNoSticky}>
            {isLoading ? (
                <div className="skeleton-logo skeleton-logo-100" />
            ) : (
                <div className={styles.nav_top}>
                    <div className={styles.contact_nav}>
                        <div className={styles.contact_nav_box}>
                            <HiOutlineMapPin />
                            <p>Jl. Petogogan II No.29 RT.008 RW.006, Jakarta Selatan</p>
                        </div>
                        <div className={styles.contact_nav_box}>
                            <PiPhoneCall />
                            <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target="blank_"><p>{settings.phone}</p></Link>
                        </div>
                        <div className={styles.contact_nav_box}>
                            <HiOutlineEnvelope />
                            <Link href={`mailto:${settings.email}`} target="blank_"><p>{settings.email}</p></Link>
                        </div>
                    </div>
                    <div className={styles.sosmed_nav}>
                        <p>Ikuti Kami di </p>
                        <div className={styles.sosmed_nav_box}>
                            {socials.map((social, index) => (
                                <Link key={index} href={social.link} target="blank_" aria-label={social.title}>
                                    <div>{iconMapping[social.title]}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {showPopup && popupData?.link && (
                <div className={`${popup.modal} ${popup.active}`}>
                    <div className={popup.modal_overlay} onClick={closeModal}></div>
                    {isLoading || !popupData?.image ? (
                        <div className="skeleton-logo skeleton-logo-100 skeleton-logo-fit" />
                    ) : (
                        <div className={popup.modal_content}>
                            <span className={popup.close} onClick={closeModal}>
                                <IoMdClose />
                            </span>
                            <Link href={popupData.link} target="_blank">
                                <img src={`${storageUrl}/${popupData.image}`} loading="lazy" alt="Promo NMW Skincare" />
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.nav_bottom}>
                <div className={styles.logo}>
                    <Link href="/">
                        {isLoading || !settings.logo ? (
                            <div className="skeleton-logo" />
                        ) : (
                            <img
                                src={`${storageUrl}${settings.logo}`}
                                alt="NMW Clinic Logo | Logo NMW Clinic | Logo NMW Clinic png"
                                loading="lazy"
                            />
                        )}
                    </Link>
                </div>
                <button className={styles.hamburger} onClick={handleHamburger}>
                    <IoIosMenu />
                </button>
                <div className={`${styles.menu} ${menuActive ? styles.active : ''}`}>
                    <div className={styles.menu_layout}>
                        <img className={styles.logo_mobile} src={`${storageUrl}/${settings.logo}`} loading="lazy" alt="NMW Clinic Logo | Logo NMW Clinic | Logo NMW Clinic png" />
                        <ul ref={headerRef}>
                            <li className={isActive('/')} onClick={clickMenu}><Link href="/">Home</Link></li>
                            <li>
                                <span onClick={() => toggleDropdown('services')} className={isActive('/layanan')}>Layanan</span>
                                <div className={`${styles.dropdown_menu} ${dropdownActive === 'services' ? styles.active : ''}`}>
                                    <ul>
                                        {services.map(service => (
                                            <li onClick={clickMenu} key={service._id}>
                                                <Link href={`/layanan/${service.slug}`}>{service.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                            <li className={isActive('/artikel')} onClick={clickMenu}><Link href="/article">Artikel</Link></li>
                            <li className={isActive('/cabang')} onClick={clickMenu}><Link href="/branches">Cabang</Link></li>
                            <li className={isActive('/katalog')} onClick={clickMenu}><Link href="/katalog">Katalog</Link></li>
                        </ul>
                        <div className={styles.login_mobile}>
                            <Link href={`${settings.direct_link}`}><button>Masuk</button></Link>
                        </div>
                    </div>
                    <div className={styles.overlay_menu}></div>
                    <button className={styles.close_btn} onClick={handleHamburger}><CgClose/></button>
                </div>
                <div className={styles.login}>
                    <Link href={`${settings.direct_link}`} target="blank_">
                        <button>Masuk</button>
                    </Link>
                </div>
            </div>
        </div>

        <div className={`${styles.floating_whatsapp}`}>
            <div className={`${styles.text_whatsapp} ${styles.bounce_in_up}`}>
                <span><font>Butuh</font> Bantuan?</span>
            </div>
            <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target="blank_"><button>Customer Care NMW Aesthetic Clinic <IoLogoWhatsapp /></button></Link>
        </div>
      </>
    );
}