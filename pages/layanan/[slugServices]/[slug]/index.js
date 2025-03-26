// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import banner from "@/styles/Banner.module.css";
// import styles from "@/styles/Layanan.module.css";
// import Link from 'next/link';
// import loadingStyles from "@/styles/Loading.module.css";
// import { FaWhatsapp } from "react-icons/fa";
// import Head from 'next/head';
// import breadcrumb from "@/styles/Breadcrumb.module.css"
// import Image from 'next/image';

// export async function getServerSideProps(context) {
//     const { slug } = context.query;
//     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//     try {
//       Fetch settings
//       const settingsRes = await fetch(`${baseUrl}/setting`);
//         const settingsData = await settingsRes.json(); 

//         // Fetch service detail
//         const serviceDetailRes = await fetch(`${baseUrl}/service_two/${slug}`);
//         const serviceDetailData = await serviceDetailRes.json();

//         if (!serviceDetailData.data) {
//             return { notFound: true };
//         }

//         // Fetch service detail list
//         const serviceId = serviceDetailData.data.id;
//         const serviceDetailListRes = await fetch(`${baseUrl}/sub_service_list/${serviceId}`);
//         const serviceDetailListData = await serviceDetailListRes.json();

//         return {
//             props: {
//                 initialSettings: settingsData || {},
//                 initialServiceDetail: serviceDetailData.data || null,
//                 initialServiceDetailList: serviceDetailListData.data || [],
//                 showPopup: serviceDetailData.data.sensitive_content === 1,
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return { notFound: true };
//     }
// }

// export default function JenisLayanan({ initialSettings, initialServiceDetail, initialServiceDetailList, showPopup: initialShowPopup  }) {
//     const router = useRouter();
//     const { slugServices, slug } = router.query;
//     const [showPopup, setShowPopup] = useState(initialShowPopup);

//     const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
//     const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

//     const [htmlContent, setHtmlContent] = useState("");

//     useEffect(() => {
//         setHtmlContent(initialServiceDetail.description || "Deskripsi tidak tersedia.");
//     }, [initialServiceDetail.description]);

//     const formattedPhone = initialSettings.phone && initialSettings.phone.startsWith('0')
//         ? '62' + initialSettings.phone.slice(1)  
//         : initialSettings.phone;

//     const closeModal = () => {
//         setShowPopup(false);
//     };

//     const handleBack = () => {
//         router.back();
//     };

//     if (!initialServiceDetail) {
//         return (
//             <div className="section_error">
//                 <p>Layanan tidak ditemukan.</p>
//             </div>
//         );
//     }

//     const formattedName = formatText(name);

//   const schemaData = {
//       "@context": "https://schema.org",
//       "@type": "WebPage",
//       name: `${initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}`,
//       description: `${initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'} `,
//       url: `${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`,
//       publisher: {
//       "@type": "Organization",
//       name: "NMW Aesthetic Clinic",
//       logo: {
//           "@type": "ImageObject",
//           url: `${initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`}`
//       }
//       },
//       mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": `${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`
//       },
//       breadcrumb: { 
//           "@type": "BreadcrumbList",
//           itemListElement: [
//               {
//               "@type": "ListItem",
//                   position: 1,
//                   name: "Home",
//                   item: `${mainUrl}`
//               },
//               {
//                 "@type": "ListItem",
//                 position: 2,
//                 name: "Layanan",
//                 item: `${mainUrl}/layanan`
//               },
//               {
//                 "@type": "ListItem",
//                 position: 3,
//                 name: `${formattedName}`,
//                 item: `${mainUrl}/layanan/${name}`
//               },
//               {
//               "@type": "ListItem",
//               position: 4,
//                   name: `${initialServiceDetail.title}`,
//                   item: `${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`
//               }
//           ]
//       }
//   };

//   function formatText(text) {
//         return text.replace(/-/g, ' ') // Mengganti "-" dengan spasi
//                 .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi setiap kata
//     }
    

//   return (
//     <>
//         <Head>
//           <title>{initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
//           <meta name="description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
//           <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

//           <meta property="og:title" content={initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`}  />
//           <meta property="og:description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
//           <meta property="og:type" content="website" />
//           <meta property="og:url" content={`${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`} />
//           <meta property="og:image" content={initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`}  />

//           <meta name="twitter:card" content="summary_large_image" />
//           <meta name="twitter:title" content={initialServiceDetail.title ? `${initialServiceDetail.title}` : `Layanan NMW Aesthetic Clinic`} />
//           <meta name="twitter:description" content={initialServiceDetail.description ? `${initialServiceDetail.description.replace(/<[^>]+>/g, '').slice(0, 100)}${initialServiceDetail.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
//           <meta name="twitter:image" content={initialServiceDetail.image ? `${storageUrl}/${initialServiceDetail.image}` : `${mainUrl}/images/logo.svg`}  />

//           <link rel="canonical" href={`${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`} />

//           <script type="application/ld+json">
//           {JSON.stringify(schemaData)}
//           </script>
//       </Head>
//         <div className={banner.banner}>
//             <Image
//                 priority
//                 width={800}
//                 height={800}
//                 src={`${storageUrl}/${initialServiceDetail.image}`}
//                 alt={initialServiceDetail.name}
//             />
//         </div>
//         <div className={breadcrumb.breadcrumb}>
//             <h5><Link href={'/'}>Home</Link> / <Link href={`${mainUrl}/layanan`}>Layanan</Link> / <Link href={`${mainUrl}/layanan/${name}`}>{formattedName}</Link> / <span><Link href={`${mainUrl}/layanan/${name}/${initialServiceDetail.slug}`}>{initialServiceDetail.title}</Link></span></h5>
//         </div>
//         <div className={`${styles.section_1} ${styles.section_1_sc}`}>
//             <div className={styles.section_1_heading}>
//                 <h1 >
//                     {initialServiceDetail.title.split(' ')[0]}{" "}
//                     <font>{initialServiceDetail.title.split(' ').slice(1).join(' ')}</font>
//                 </h1>
//             </div>
//             <div className={styles.section_1_content}>
//             <div
//                 className={styles.service_description}
//                 dangerouslySetInnerHTML={{ __html: htmlContent }}
//                 suppressHydrationWarning 
//             />

//                 <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target='blank_' ><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
//             </div>
//         </div>

//         {showPopup && (
//             <div className={`${styles.modal} ${showPopup ? styles.active : ""}`}>
//                 <div className={styles.overlay_modal}></div>
//                 <div className={styles.modal_content}>
//                     <h2>Verifikasi Usia</h2>
//                     <p>
//                         Situs web ini berisi materi yang dibatasi usia yang mengandung unsur dewasa. 
//                         Dengan ini Anda menyatakan bahwa Anda setidaknya berusia 18 tahun atau lebih, 
//                         untuk mengakses situs web dan Anda setuju untuk melihat konten ini.
//                     </p>
//                     <div className={styles.button_layout}>
//                         <button onClick={closeModal}>Saya sudah diatas 18 Tahun</button>
//                         <button onClick={handleBack}>Saya masih dibawah 18 Tahun</button>
//                     </div>
//                     <p>ⓒ PT.HUB 2024</p>
//                 </div>
//             </div>
//         )}

//         {initialServiceDetailList.length > 0 && (
//             <div className={styles.section_3}> 
//                 <div className={`${styles.box_service_layout} ${styles.box_service_layout_sc}`}>
//                     {
//                         initialServiceDetailList.map((serviceDetailListing) => (
//                             <div className={styles.box_service} key={serviceDetailListing.id}>
//                                 <div className={styles.box_service_content}>
//                                     <h3>{serviceDetailListing.title}</h3>
//                                     <p>{serviceDetailListing.description.replace(/<\/?p>/g, "")}</p>
//                                 </div>
//                                 <div className={styles.box_service_btn}>
//                                     <Link href={`/layanan/${name}/${slug}/${serviceDetailListing.slug}`}><button>Lihat Gambar</button></Link>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         )}


//         <div className={styles.section_4}>
//             <div className={styles.heading_section_4}>
//                 <div
//                     className={`${styles.heading_section} ${styles.heading_section_start}`}
//                 >
//                     <h2>
//                         <span>Dokter </span>
//                         Kami
//                     </h2>
//                 </div>
//             </div>
//             <div className={styles.section_4_box}>
//                 <img
//                     src="../../images/dokter_layanan.webp"
//                     alt="Dokter-dokter NMW Aesthetic Clinic"
//                     className={styles.our_dokter}
//                     loading='lazy'
//                 />
//                 <img
//                     src="../../images/nmw_bg.webp"
//                     alt="Background Dokter"
//                     className={styles.bg_our_dokter}
//                     loading='lazy'
//                 />
//                 <div className={styles.section_4_content}>
//                     <p>
//                         Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara profesional,
//                         dan terpercaya untuk melakukan bedah plastik, dermatologi, spesialis
//                         kulit dan kelamin, serta perawatan kulit estetik.
//                     </p>
//                     <p>
//                         Dokter kami telah menjalani pelatihan ekstensif dan memiliki keahlian
//                         untuk memberikan hasil luar biasa sekaligus memastikan keselamatan
//                         pasien.
//                     </p>
//                     <Link href="/dokter-kami">
//                         <button>Lihat Lebih Lanjut</button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     </>
//   );
// }
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

export default function JenisLayanan(){
    const router = useRouter();
    const { slugServices, slug } = router.query; 
    const [servicesList, setServicesList] = useState(null)
    const [servicesType, setServicesType] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [htmlContent, setHtmlContent] = useState("");
    const [settings, setSettings] = useState([])
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
        const fetchData = async () => {
            const cachedSetting = localStorage.getItem('settingCache');
            const cachedSettingExpired = localStorage.getItem('settingCacheExpired');
            const now = new Date().getTime();
    
            // Cek apakah cache valid
            if (cachedSetting && cachedSettingExpired && now < parseInt(cachedSettingExpired)) {
                setSettings(JSON.parse(cachedSetting));
                
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
            }
        };
    
        fetchData();
    }, [baseUrl]);

     useEffect(() => {
            if (!slug) return; // Hindari fetch jika slug masih undefined
    
            const fetchPatients = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/serviceListDetail/${slug}`);
    
                    const result = await response.json();
                    setServicesList(result);
                    if (result.sensitive_content) {
                        setShowPopup(true);
                    } else {
                        setShowPopup(false);
                    }
                } catch (error) {
                    console.error("Error fetching services:", error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchPatients();
    }, [slug]); 

    useEffect(() => {
        if (!slug) return; // Hindari fetch jika slug masih undefined
    
        const fetchServices = async () => {
            try {
                setLoading(true); 
    
                const response = await fetch(`/api/serviceType?servicesList=${slug}`);
                const result = await response.json();

                setServicesType(result.servicesType);
            } catch (error) {
                console.error("Error fetching services:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchServices();
    }, [slug]);

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

    // useEffect(() => {
    //     if (servicesList && servicesType) {
    //         setLoading(false); // Set loading false saat data tersedia
    //     }
    // }, [servicesList, servicesType]);

     if (loading){
        return(
            <>
                {loading && (
                    <div className={loadingStyles.box}>
                        <div className={loadingStyles.content}>
                            <img src="/images/logo.svg" loading="lazy"/>
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

    return(
        <>
        <Head>
           <title>{servicesList.name ? `${servicesList.name}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
           <meta name="description" content={servicesList.description ? `${servicesList.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesList.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
           <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

           <meta property="og:title" content={servicesList.name ? `${servicesList.name}` : `Layanan NMW Aesthetic Clinic`}  />
           <meta property="og:description" content={servicesList.description ? `${servicesList.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesList.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
           <meta property="og:type" content="website" />
           <meta property="og:url" content={`${mainUrl}/layanan/${name}/${servicesList.slug}`} />
           <meta property="og:image" content={servicesList.imageCover ? `${storageUrl}/${servicesList.imageCover}` : `${mainUrl}/images/logo.svg`}  />

           <meta name="twitter:card" content="summary_large_image" />
           <meta name="twitter:title" content={servicesList.name ? `${servicesList.name}` : `Layanan NMW Aesthetic Clinic`} />
           <meta name="twitter:description" content={servicesList.description ? `${servicesList.description.replace(/<[^>]+>/g, '').slice(0, 100)}${servicesList.description.length > 100 ? '...' : ''}` : 'Layanan NMW Aesthetic Clinic'}   />
           <meta name="twitter:image" content={servicesList.imageCover ? `${storageUrl}/${servicesList.imageCover}` : `${mainUrl}/images/logo.svg`}  />

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
        {showPopup &&(
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
                    <p>ⓒ PT.HUB 2024</p>
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