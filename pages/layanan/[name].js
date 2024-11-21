import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import loadingStyles from "@/styles/Loading.module.css";
import not from "@/styles/Not.module.css";

export default function Layanan() {
    const router = useRouter();
    const { name } = router.query;
    const [serviceDetail, setServiceDetail] = useState(null);
    const [services, setServices] = useState([]);
    const [galeriPatients, setGaleriPatients] = useState([]);
    const [typeServices, setTypeServices] = useState([]);
    const [loading, setLoading] = useState(true); // Tambahkan state loading

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Fetch data layanan lainnya
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${baseUrl}/service`);
                const data = await response.json();
                if (data && data.data) {
                    setServices(data.data); // Simpan layanan di state services
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, [baseUrl]);

    // Fetch detail layanan berdasarkan nama
    useEffect(() => {
        if (name && services.length > 0) {
            const matchedService = services.find(service =>
                service.name.replace(/\s+/g, '-').toLowerCase() === name
            );

            if (matchedService) {
                // Fetching service detail
                const fetchServiceDetail = async () => {
                    try {
                        const response = await fetch(`${baseUrl}/service-detail?id=${matchedService.id}`);
                        if (!response.ok) {
                            throw new Error(`API error: ${response.status} ${response.statusText}`);
                        }
                        const data = await response.json();
                        if (data && data.data) {
                            setServiceDetail(data.data);
                        } else {
                            console.error('Data format is incorrect:', data);
                        }
                    } catch (error) {
                        console.error('Error fetching service detail:', error);
                    }
                };

                // Fetching related services
                const fetchTypeServices = async () => {
                    try {
                        const response = await fetch(`${baseUrl}/service_one?id=${matchedService.id}`);
                        if (!response.ok) {
                            throw new Error(`API error: ${response.status} ${response.statusText}`);
                        }
                        const data = await response.json();
                        if (data && data.data) {
                            setTypeServices(data.data);
                        } else {
                            console.error('Data format is incorrect:', data);
                        }
                    } catch (error) {
                        console.error('Error fetching related services:', error);
                    }
                };

                // Fetching patient gallery
                const fetchGaleriPasien = async () => {
                    try {
                        const response = await fetch(`${baseUrl}/patient_galeri?id=${matchedService.id}`);
                        if (!response.ok) {
                            throw new Error(`API error: ${response.status} ${response.statusText}`);
                        }
                        const data = await response.json();
                        if (data && data.data) {
                            setGaleriPatients(data.data);
                        } else {
                            console.error('Data format is incorrect:', data);
                        }
                    } catch (error) {
                        console.error('Error fetching patient gallery:', error);
                    }
                };

                // Run all the fetch functions sequentially
                const fetchAllData = async () => { 
                    await fetchServiceDetail();
                    await fetchTypeServices();
                    await fetchGaleriPasien();
                    setLoading(false); // All data fetched, stop loading
                };

                fetchAllData();
            } else {
                setLoading(false); // If service is not found
            }
        }
    }, [name, services, baseUrl]);

    if (loading) {
        return (
            <>
                <div className={loadingStyles.box}>
                    <div className={loadingStyles.content}>
                        <img src="../images/logo.svg"/>
                        <span>Loading</span>
                    </div>
                </div>
            </>
        );
    }

    if (!serviceDetail) {
        return <p>Layanan tidak ditemukan.</p>; // Pesan error jika layanan tidak ditemukan
    }

    return (
        <>
            <div className={banner.banner}>
                <img src={`https://nmw.prahwa.net/storage/${serviceDetail.image}`} alt={serviceDetail.name} />
            </div>
            <div className={styles.section_1}>
                <div className={styles.section_1_heading}>
                    <h1>
                        <font>{serviceDetail.name.split(' ')[0]} </font> 
                        {serviceDetail.name.split(' ').slice(1).join(' ')}
                    </h1>

                    <Link href={`https://api.whatsapp.com/send?phone=${serviceDetail.phone}`}  target="blank_"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
                </div>
                <div className={styles.section_1_content}>
                    <div className={styles.service_description} dangerouslySetInnerHTML={{ __html: serviceDetail.description }} />
                </div>
            </div>
            {typeServices.length > 0 && ( 
                <div className={styles.section_2}> 
                    <div className={`${styles.heading_section}`}> 
                        <h1><font>Galeri</font> Bedah Plastik</h1>
                    </div>
                    <div className={styles.box_galeri_layout}>
                        {galeriPatients.map(galeriPatient => (
                            <div className={styles.box_galeri} key={galeriPatient.id}>
                                <div className={styles.box_galeri_image}>
                                    <img src={`https://nmw.prahwa.net/storage/${galeriPatient.image}`} alt={galeriPatient.name}/>
                                    <div className={styles.button_image}>
                                        <button>Sebelum</button>
                                        <button>Sesudah</button>
                                    </div>
                                </div>
                                <div className={styles.box_galeri_content}>
                                    <div className={styles.box_galeri_heading}>
                                        <h1>Lower Blepharoplasty</h1>
                                        <h3>{galeriPatient.name}</h3>
                                    </div>
                                    <div className={styles.box_galeri_text}>
                                        <p>{galeriPatient.description}</p>
                                    </div>
                                </div>
                                <div className={styles.box_galeri_button}>
                                    <Link href={""}><button>Lihat Gambar {galeriPatient.name}</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {typeServices.length > 0 && (
                <div className={styles.section_3}>
                    <div className={`${styles.heading_section}`}>
                        <h1><font>Jenis</font> Layanan</h1>
                    </div>
                    <div className={styles.box_service_layout}>
                        {typeServices.map(typeService => (
                            <div className={styles.box_service} key={typeService.id}>
                                <div className={styles.box_service_image}>
                                    <img src={`https://nmw.prahwa.net/storage/${typeService.image}`} alt={typeService.title}/>
                                </div>
                                <div className={styles.box_service_content}>
                                    <h1>{typeService.title}</h1>
                                    <p
                                        className={styles.service_description}
                                        dangerouslySetInnerHTML={{
                                            __html: typeService.description === '-' 
                                            ? 'Klik lihat detail untuk mendapatkan informasi selengkapnya tentang layanan ini' 
                                            : typeService.description
                                        }}
                                    />
                                </div>
                                <div className={styles.box_service_btn}>
                                    <Link href={`/layanan/jenis-layanan/${typeService.id}`}><button>Lihat Detail</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.section_4}>
                <div className={styles.heading_section_4}>
                <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                    <h1><font>Dokter Kami</font></h1>
                    <p>dr. Nataliani Mawardi, dipl. CIBTAC</p>
                </div>
                </div>
                <div className={styles.section_4_box}>
                    <img src="../images/dokter_layanan.png" alt="Dokter-dokter NMW Clinic" className={styles.our_dokter} />
                    <img src="../images/nmw_bg.png" alt="Dokter-dokter NMW Clinic" className={styles.bg_our_dokter} />
                    <div className={styles.section_4_content}>
                        <p>Dokter NMW klinik adalah dokter terpilih, terlatih secara profesional, dan terpercaya untuk melakukanbedah plastik, dermatologi, spesialis kulit dan kelamin dan perawatan kulit ekstetika.</p>
                        <p>Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian untuk memberikan hasil luar biasa sekaligus memastikan keselamatan pasien.</p>
                        <Link href={'/'}><button>Lihat Lebih Lanjut</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
