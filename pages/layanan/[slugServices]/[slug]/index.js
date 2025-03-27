import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from 'next/link';
import loadingStyles from "@/styles/Loading.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Head from 'next/head';
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Image from 'next/image';

export default function JenisLayanan({ servicesList, servicesType, settings }) {
    const router = useRouter();
    const { slugServices, slug } = router.query;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [htmlContent, setHtmlContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

    const closeModal = () => {
        setShowPopup(false);
    };

    const handleBack = () => {
        router.back();
    };

    useEffect(() => {
        setHtmlContent(servicesList?.description || "Deskripsi tidak tersedia.");
    }, [servicesList?.description]);

    const formattedPhone = settings.phone && settings.phone.startsWith('0')
        ? '62' + settings.phone.slice(1)
        : settings.phone;

    function formatText(text) {
        if (!text) return ""; // Jika text undefined/null, return string kosong

        return text.replace(/-/g, ' ') // Mengganti "-" dengan spasi
            .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi setiap kata
    }

    const formattedName = formatText(slugServices);

    if (loading) {
        return (
            <>
                {loading && (
                    <div className={loadingStyles.box}>
                        <div className={loadingStyles.content}>
                            <img src="/images/logo.svg" loading="lazy" />
                            <span>LOADING</span>
                        </div>
                    </div>
                )}
            </>
        );
    };
    if (error) return <p>Error: {error}</p>;

    if (!servicesList || !servicesType) {
        if (loading) return null; // Jangan tampilkan apa pun saat masih loading

        return (
            <div className={styles.emptyPage}>
            </div>
        );
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${servicesList.name ? `${servicesList.name}` : `Layanan NMW Aesthetic Clinic`}`,
        description: `${servicesList.description ? `${servicesList.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesList.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} `,
        url: `${mainUrl}/layanan/${slugServices}/${servicesList.slug}`,
        publisher: {
            "@type": "Organization",
            name: "NMW Aesthetic Clinic",
            logo: {
                "@type": "ImageObject",
                url: `${servicesList.imageCover ? `${storageUrl}/${servicesList.imageCover}` : `${mainUrl}/images/logo.svg`}`
            }
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${mainUrl}/layanan/${slugServices}/${servicesList.slug}`
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${mainUrl}`
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Layanan",
                    item: `${mainUrl}/layanan`
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: `${formattedName}`,
                    item: `${mainUrl}/layanan/${slugServices}`
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: `${servicesList.name}`,
                    item: `${mainUrl}/layanan/${slugServices}/${servicesList.slug}`
                }
            ]
        }
    };

    return (
        <>
            <Head>
                <title>{servicesList.name ? `${servicesList.name}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
                <meta name="description" content={servicesList.description ? `${servicesList.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesList.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
                <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

                <meta property="og:title" content={servicesList.name ? `${servicesList.name}` : `Layanan NMW Aesthetic Clinic`} />
                <meta property="og:description" content={servicesList.description ? `${servicesList.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesList.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${mainUrl}/layanan/${slugServices}/${servicesList.slug}`} />
                <meta property="og:image" content={servicesList.imageCover ? `${storageUrl}/${servicesList.imageCover}` : `${mainUrl}/images/logo.svg`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={servicesList.name ? `${servicesList.name}` : `Layanan NMW Aesthetic Clinic`} />
                <meta name="twitter:description" content={servicesList.description ? `${servicesList.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesList.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} />
                <meta name="twitter:image" content={servicesList.imageCover ? `${storageUrl}/${servicesList.imageCover}` : `${mainUrl}/images/logo.svg`} />

                <link rel="canonical" href={`${mainUrl}/layanan/${slugServices}/${servicesList.slug}`} />

                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Head>
            <div className={banner.banner}>
                <Image
                    priority
                    width={800}
                    height={800}
                    src={`${storageUrl}/${servicesList.imageBanner}`}
                    alt={servicesList.name}
                />
            </div>
            <div className={breadcrumb.breadcrumb}>
                <h5><Link href={'/'}>Home</Link> / <Link href={`${mainUrl}/layanan`}>Layanan</Link> / <Link href={`${mainUrl}/layanan/${slugServices}`}>{formattedName}</Link> / <span><Link href={`${mainUrl}/layanan/${slugServices}/${servicesList.slug}`}>{servicesList.name}</Link></span></h5>
            </div>
            <div className={`${styles.section_1} ${styles.section_1_sc}`}>
                <div className={styles.section_1_heading}>
                    <h1 >
                        {servicesList.name.split(' ')[0]}{" "}
                        <font>{servicesList.name.split(' ').slice(1).join(' ')}</font>
                    </h1>
                </div>
                <div className={styles.section_1_content}>
                    <div
                        className={styles.service_description}
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                        suppressHydrationWarning
                    />

                    <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target='blank_' ><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
                </div>
            </div>
            {showPopup && (
                <div className={`${styles.modal} ${showPopup ? styles.active : ""}`}>
                    <div className={styles.overlay_modal}></div>
                    <div className={styles.modal_content}>
                        <h2>Verifikasi Usia</h2>
                        <p>
                            Situs web ini berisi materi yang dibatasi usia yang mengandung unsur dewasa.
                            Dengan ini Anda menyatakan bahwa Anda setidaknya berusia 18 tahun atau lebih,
                            untuk mengakses situs web dan Anda setuju untuk melihat konten ini.
                        </p>
                        <div className={styles.button_layout}>
                            <button onClick={closeModal}>Saya sudah diatas 18 Tahun</button>
                            <button onClick={handleBack}>Saya masih dibawah 18 Tahun</button>
                        </div>
                        <p> PT.HUB 2024</p>
                    </div>
                </div>
            )}
            {servicesType.length > 0 && (
                <div className={styles.section_3}>
                    <div className={`${styles.box_service_layout} ${styles.box_service_layout_sc}`}>
                        {
                            servicesType.map((servicesType) => (
                                <div className={styles.box_service} key={servicesType._id}>
                                    <div className={styles.box_service_content}>
                                        <h3>{servicesType.name}</h3>
                                        <p>{servicesType.description.replace(/<\/?p>/g, "")}</p>
                                    </div>
                                    <div className={styles.box_service_btn}>
                                        <Link href={`/layanan/${slugServices}/${slug}/${servicesType.slug}`}><button>Lihat Gambar</button></Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
            <div className={styles.section_4}>
                <div className={styles.heading_section_4}>
                    <div
                        className={`${styles.heading_section} ${styles.heading_section_start}`}
                    >
                        <h2>
                            <span>Dokter </span>
                            Kami
                        </h2>
                    </div>
                </div>
                <div className={styles.section_4_box}>
                    <img
                        src="../../images/dokter_layanan.webp"
                        alt="Dokter-dokter NMW Aesthetic Clinic"
                        className={styles.our_dokter}
                        loading='lazy'
                    />
                    <img
                        src="../../images/nmw_bg.webp"
                        alt="Background Dokter"
                        className={styles.bg_our_dokter}
                        loading='lazy'
                    />
                    <div className={styles.section_4_content}>
                        <p>
                            Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara profesional,
                            dan terpercaya untuk melakukan bedah plastik, dermatologi, spesialis
                            kulit dan kelamin, serta perawatan kulit estetik.
                        </p>
                        <p>
                            Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian
                            untuk memberikan hasil luar biasa sekaligus memastikan keselamatan
                            pasien.
                        </p>
                        <Link href="/dokter-kami">
                            <button>Lihat Lebih Lanjut</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { slugServices, slug } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

    try {
        const responseServicesList = await fetch(`${baseUrl}/serviceListDetail/${slug}`);
        const servicesList = await responseServicesList.json();

        const responseServicesType = await fetch(`${baseUrl}/serviceType?servicesList=${slug}`);
        const servicesType = await responseServicesType.json();

        const responseSettings = await fetch(`${baseUrl}/settings`);
        const settings = await responseSettings.json();

        return {
            props: {
                servicesList,
                servicesType: servicesType.servicesType,
                settings,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                error: 'Error fetching data',
            },
        };
    }
}