import Head from "next/head";
import styles from "@/styles/Header.module.css"
import { HiOutlineMapPin } from "react-icons/hi2";
import { PiPhoneCall } from "react-icons/pi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from "next/link";
import 'animate.css';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import { IoIosMenu } from "react-icons/io";
import { CgClose } from "react-icons/cg";


// components/Header.js
export default function Header() {
    const [dropdownActive, setDropdownActive] = useState(null); // Track active dropdown
    const router = useRouter();
    const headerRef = useRef(null); // Reference to header element
    const [menuActive, setMenuActive] = useState(false);

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

    const [settings, setSettings] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/setting`);
                const data = await response.json();
                console.log('Fetched data:', data);  // Log the entire response

                if (data && data.social_media) {
                    setSettings(data); // Set the entire response object to settings
                } else {
                    console.error('No social_media data found:', data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchData();
    }, []);

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

    return (
        <>
        <Head>
            <title>NMW Clinic</title>
            <meta name="description" content={settings.meta_description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href={`https://nmw.prahwa.net/storage/${settings.favicon}`} />
        </Head>
        <div className={styles.header}>
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
                        {socialMediaLinks.length > 0 ? (
                            socialMediaLinks.map((social, index) => (
                                <Link key={index} href={social.link} target="blank_">
                                    {/* Render the correct icon */}
                                    <div>{iconMapping[social.name]}</div>
                                </Link>
                            ))
                        ) : (
                            <p>No social media data available.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.nav_bottom}>
                <div className={styles.logo}>
                    <Link href="/">
                        <img src={`https://nmw.prahwa.net/storage/${settings.logo}`}/>
                    </Link>
                </div>
                <button className={styles.hamburger} onClick={handleHamburger}>
                    <IoIosMenu />
                </button>
                <div className={`${styles.menu} ${menuActive ? styles.active : ''}`}>
                    <div className={styles.menu_layout}>
                        <img className={styles.logo_mobile} src="images/logo.svg" />
                        <ul ref={headerRef}>
                            <li className={isActive('/')} onClick={clickMenu}><Link href="/">Home</Link></li>
                            <li>
                                <span onClick={() => toggleDropdown('services')} className={isActive('/layanan')}>Layanan</span>
                                <div className={`${styles.dropdown_menu} ${dropdownActive === 'services' ? styles.active : ''}`}>
                                    <ul>
                                        <li>
                                            <Link href="/plastic-surgery">Plastic Surgery</Link>
                                        </li>
                                        <li>
                                            <Link href="/spa-treatment">Spa Treatment</Link>
                                        </li>
                                        <li>
                                            <Link href="/aesthetic-medicine">Aesthetic Medicine</Link>
                                        </li>
                                        <li>
                                            <Link href="/medical-treatment">Medical Treatment</Link>
                                        </li>
                                        <li>
                                            <Link href="/cosmetic-dermatology">Cosmetic Dermatology</Link>
                                        </li>
                                        <li>
                                            <Link href="/slimming-treatment">Slimming Treatment</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={isActive('/artikel')} onClick={clickMenu}><Link href="/artikel">Artikel</Link></li>
                            <li className={isActive('/cabang')} onClick={clickMenu}><Link href="/cabang">Cabang</Link></li>
                            <li className={isActive('/katalog')} onClick={clickMenu}><Link href="/catalog">Katalog</Link></li>
                        </ul>
                        <div className={styles.login_mobile}>
                            <Link href={""}><button>Masuk</button></Link>
                        </div>
                    </div>
                    <div className={styles.overlay_menu}></div>
                    <button className={styles.close_btn} onClick={handleHamburger}><CgClose/></button>
                </div>
                <div className={styles.login}>
                    <Link href="">
                        <button>Masuk</button>
                    </Link>
                </div>
            </div>
        </div>

        <div className={`${styles.floating_whatsapp}`}>
            <div className={`${styles.text_whatsapp} ${styles.bounce_in_up}`}>
                <span><font>Butuh</font> Bantuan?</span>
            </div>
            <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target="blank_"><button>Customer Care NMW Clinic <IoLogoWhatsapp /></button></Link>
        </div>
      </>
    );
}