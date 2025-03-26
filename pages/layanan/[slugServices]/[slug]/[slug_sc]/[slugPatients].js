// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import banner from "@/styles/Banner.module.css";
// import styles from "@/styles/Layanan.module.css";
// import Link from "next/link";
// import loadingStyles from "@/styles/Loading.module.css";
// import { FaWhatsapp } from "react-icons/fa";
// import Head from "next/head";
// import breadcrumb from "@/styles/Breadcrumb.module.css"
// import Image from "next/image";

// export default function Patient() {
//   const router = useRouter();
//   const { name, slug_sc, id, slug } = router.query;
//   const [serviceDetail, setServiceDetail] = useState(null);
//   const [patientDetail, setPatientDetail] = useState(null); // Changed to object
//   const [loading, setLoading] = useState(true);
//   const [settings, setSettings] = useState({ phone: "" });

//   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//   const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
//   const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/setting`);
//         if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
//         const data = await response.json();
//         setSettings(data || { phone: "" });
//       } catch (error) {
//         console.error("Error fetching settings:", error);
//       }
//     };

//     fetchSettings();
//   }, [baseUrl]);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);

//         // Fetch service detail if slug_sc exists
//         if (slug_sc) {
//           const responseService = await fetch(`${baseUrl}/stos/${slug_sc}`);
//           if (!responseService.ok) {
//             throw new Error(`Error API: ${responseService.status} ${responseService.statusText}`);
//           }
//           const dataService = await responseService.json();
//           if (dataService.data) {
//             setServiceDetail(dataService.data); // Set service details
//           } else {
//             console.error("Data layanan tidak ditemukan:", dataService);
//           }
//         }

//         // Fetch patient details if id exists
//         if (id) {
//           const responsePatient = await fetch(`${baseUrl}/detail_patient/${id}`);
//           if (!responsePatient.ok) {
//             throw new Error(`API error: ${responsePatient.status} ${responsePatient.statusText}`);
//           }
//           const dataPatient = await responsePatient.json();
//           if (dataPatient && dataPatient.data) {
//             setPatientDetail(dataPatient.data); // Set patient details
//           } else {
//             console.error("Data pasien tidak ditemukan:", dataPatient);
//           }
//         }
//       } catch (error) {
//         console.error('Error saat mengambil data:', error);
//       } finally {
//         setLoading(false); // Ensure loading is set to false after fetch
//       }
//     };

//     fetchDetails(); // Call the function to fetch data
//   }, [slug_sc, id, baseUrl]);

//   const formattedPhone = settings.phone?.startsWith("0")
//     ? "62" + settings.phone.slice(1)
//     : settings.phone;

//   if (loading) {
//     return (
//       <div className={loadingStyles.box}>
//         <div className={loadingStyles.content}>
//           <img src="/images/logo.svg" alt="Loading logo" loading="lazy" />
//           <span>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!serviceDetail) {
//     return (
//       <div className={styles.section_error}>
//         <p>Layanan tidak ditemukan.</p>
//       </div>
//     );
//   }

//   function formatText(text) {
//     return text.replace(/-/g, ' ') // Mengganti "-" dengan spasi
//             .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi setiap kata
//   }
//   const formattedName = formatText(name);
//   const formattedSlug = formatText(slug);
//   const formattedSlugSc = formatText(slug_sc);

//   const schemaData = {
//       "@context": "https://schema.org",
//       "@type": "WebPage",
//       name: `${patientDetail.name} - NMW Aesthetic Clinic`,
//       description: `${patientDetail.description}`,
//       url: `${mainUrl}/layanan/${name}/${slug}/${slug_sc}/${id}`,
//       publisher: {
//         "@type": "Organization",
//         name: "NMW Aesthetic Clinic",
//         logo: {
//           "@type": "ImageObject",
//           url: `${storageUrl}/${settings.logo}`
//         }
//       },
//       mainEntityOfPage: {
//         "@type": "WebPage",
//         "@id": `${mainUrl}/layanan/${name}/${slug}/${slug_sc}/${id}`
//       },
//       breadcrumb: {
//         "@type": "BreadcrumbList",
//         itemListElement: [
//           {
//             "@type": "ListItem",
//             position: 1,
//             name: "Beranda",
//             item: `${mainUrl}`
//           },
//           {
//             "@type": "ListItem",
//             position: 2,
//             name: "Layanan",
//             item: `${mainUrl}/layanan`
//           },
//           {
//             "@type": "ListItem",
//             position: 3,
//             name: `${formattedName}`,
//             item:  `${mainUrl}/layanan/${name}`
//           },
//           {
//             "@type": "ListItem",
//             position: 4,
//             name: `${formattedSlug}`,
//             item: `${mainUrl}/layanan/${name}/${slug}`
//           },
//           {
//             "@type": "ListItem",
//             position: 5,
//             name: `${formattedSlugSc}`,
//             item: `${mainUrl}/layanan/${name}/${slug}/${slug_sc}`
//           },
//           {
//             "@type": "ListItem",
//             position: 6,
//             name: `${patientDetail.name}`,
//             item: `${mainUrl}/layanan/${name}/${slug}/${slug_sc}/${patientDetail.id}`
//           }
//         ]
//       }
//   };

  

//   return (
//     <>
//         <Head>
//             <title>{patientDetail.name} | NMW Aesthetic Clinic</title>
//             <meta name="description" content={patientDetail.description} />
//             <meta name="keywords" content="layanan medis, perawatan kulit, bedah plastik, konsultasi kesehatan, perawatan kecantikan, NMW Clinic, layanan kecantikan, perawatan wajah, estetika medis, klinik estetika, perawatan anti-aging, operasi plastik, perawatan rambut, perawatan tubuh, terapi kecantikan, klinik kecantikan NMW, dokter kecantikan, solusi kecantikan, layanan kecantikan medis, klinik bedah plastik, rejuvenasi kulit, konsultasi bedah plastik" />

//             <meta property="og:title" content={patientDetail.name} />
//             <meta property="og:description" content={patientDetail.description} />
//             <meta property="og:type" content="website" />
//             <meta property="og:url" content={`${mainUrl}/layanan/${name}/${slug}/${slug_sc}/${patientDetail.id}`} />
//             <meta property="og:image" content={`${storageUrl}/${patientDetail.image}`} />

//             <meta name="twitter:card" content="summary_large_image" />
//             <meta name="twitter:title" content={patientDetail.name} />
//             <meta name="twitter:description" content={patientDetail.description} />
//             <meta name="twitter:image" content={`${storageUrl}/${patientDetail.image}`} />

//             <link rel="canonical" href={`${mainUrl}/layanan/${name}/${slug}/${slug_sc}/${patientDetail.id}`} />

//             <script type="application/ld+json">
//               {JSON.stringify(schemaData)}
//             </script>
//         </Head>

//       {/* Banner */}
//       <div className={banner.banner}>
//         <Image
//           priority
//           width={800}
//           height={800}
//           src={`${storageUrl}/${serviceDetail.image}`}
//           alt={serviceDetail.name || "Banner image"}
//         />
//       </div>
//       <div className={breadcrumb.breadcrumb}>
//           <h5><Link href={'/'}>Home</Link> / <Link href={`${mainUrl}/layanan`}>Layanan</Link> / <Link href={`${mainUrl}/layanan/${name}`}>{formattedName}</Link> / <Link href={`${mainUrl}/layanan/${name}/${slug}`}>{formattedSlug}</Link> / <Link href={`${mainUrl}/layanan/${name}/${slug}/${slug_sc}`}>Pasien {formattedSlugSc}</Link> / <span>Pasien {formattedSlugSc} {id}</span></h5>
//       </div>

//       {/* Section 1 */}
//       <div className={`${styles.section_1} ${styles.section_1_sc}`}>
//         <div className={styles.section_1_heading}>
//           <h1> 
//              {patientDetail.name.split(" ")[0]}{" "}
//             <font>{patientDetail.name.split(" ").slice(1).join(" ")}</font>
//           </h1>
//         </div>
//         <div className={styles.section_1_content}>
//           <div
//             className={styles.service_description}
//             dangerouslySetInnerHTML={{
//               __html: patientDetail.description || "Deskripsi tidak tersedia.",
//             }}
//           />
//           <p>Hasil individu bervariasi <br/> <br/>
//           Dibawah ini adalah gambar sebelum dan sesudah pasien yang melalukan tindakan operasi Blepharoplasty di NMW Bedah Plastik. Harap diperhatikan bahwa setiap hasil pasien sebelum dan sesudah berbeda. Silahkan hubungi Customer Service kami apabila ingin bertanya lebih lanjut.</p>
//           <Link
//             href={`https://api.whatsapp.com/send?phone=${formattedPhone}`}
//             target="_blank"
//           >
//             <button className={styles.btn_layanan}>
//               Buat Janji Temu Sekarang <FaWhatsapp />
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Section 2 - Pasien */}
//       <div className={`${styles.section_2} ${styles.section_2_sc} ${styles.section_2_patient}`}>
//         <div className={styles.patient_galeri_layout}>
//           {/* Map over the patient data */}
//           {patientDetail ? (
//             <>
//             <div className={styles.box_galeri} key={patientDetail.id}>
//               {/* Gambar Pasien */}
//               <div className={styles.box_galeri_image}>
//                 <Image
//                   priority
//                   width={800}
//                   height={800}
//                   src={`${storageUrl}/${patientDetail.image}`}
//                   alt={patientDetail.name || "Galeri Image"}
//                 />
//                 <div className={styles.button_image}>
//                   <button type="button">Sebelum</button>
//                   <button type="button">Sesudah</button>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.box_galeri} key={patientDetail.id}>
//               {/* Gambar Pasien */}
//               <div className={styles.box_galeri_image}>
//                 <Image
//                   priority
//                   width={800}
//                   height={800}
//                   src={`${storageUrl}/${patientDetail.image2}`}
//                   alt={patientDetail.name || "Galeri Image"}
//                 />
//                 <div className={styles.button_image}>
//                   <button type="button">Sebelum</button>
//                   <button type="button">Sesudah</button>
//                 </div>
//               </div>
//             </div>
//             </>
//           ) : (
//             <p>Data pasien tidak tersedia.</p>
//           )}
//         </div>
//       </div>

//       {/* Section 4 */}
//       <div className={styles.section_4}>
//         <div className={styles.heading_section_4}>
//           <div
//             className={`${styles.heading_section} ${styles.heading_section_start}`}
//           >
//             <h2>
//               <font>Dokter </font>
//               Kami
//             </h2>
//           </div>
//         </div>
//         <div className={styles.section_4_box}>
//           <img
//             src="/images/dokter_layanan.webp"
//             alt="Dokter-dokter NMW Aesthetic Clinic"
//             className={styles.our_dokter}
//             loading="lazy"
//           />
//           <img
//             src="/images/nmw_bg.webp"
//             alt="Background Dokter"
//             className={styles.bg_our_dokter}
//             loading="lazy"
//           />
//           <div className={styles.section_4_content}>
//             <p>
//               Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara
//               profesional, dan terpercaya untuk melakukan bedah plastik,
//               dermatologi, spesialis kulit dan kelamin, serta perawatan kulit
//               estetik.
//             </p>
//             <p>
//               Dokter kami telah menjalani pelatihan ekstensif dan memiliki
//               keahlian untuk memberikan hasil luar biasa sekaligus memastikan
//               keselamatan pasien.
//             </p>
//             <Link href="/dokter-kami">
//               <button>Lihat Lebih Lanjut</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from "next/link";
import loadingStyles from "@/styles/Loading.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Head from "next/head";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Image from "next/image";

export default function Patient(){
  const router = useRouter();
  const { slugServices, slug, slug_sc, slugPatients } = router.query;
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;

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
      if (!slugPatients) return; // Hindari fetch jika slugPatients masih undefined

      const fetchPatients = async () => {
          try {
              setLoading(true);
              const response = await fetch(`/api/patientDetail/${slugPatients}`);
              const result = await response.json();
              setPatients(result);
          } catch (error) {
              console.error("Error fetching patients:", error);
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };

      fetchPatients();
  }, [slugPatients]); 

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
  if (!patients) {
    return (
        <div className={styles.emptyPage}>
        </div>
    );
  } 

  const formattedPhone = settings.phone?.startsWith("0")
  ? "62" + settings.phone.slice(1)
  : settings.phone;

  function formatText(text) {
    if (!text) return ""; // Jika text undefined/null, return string kosong

      return text.replace(/-/g, ' ') // Mengganti "-" dengan spasi
                .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi setiap kata
  }

  const formattedName = formatText(slugServices);
  const formattedSlug = formatText(slug);
  const formattedSlugSc = formatText(slug_sc);


  return(
    <>
      <div className={banner.banner}>
         <Image
          priority
          width={800}
          height={800}
          src={`${storageUrl}/${patients.imageSecond}`}
          alt={patients.name || "Banner image"}
        />
      </div>
      <div className={breadcrumb.breadcrumb}>
          <h5><Link href={'/'}>Home</Link> / <Link href={`${mainUrl}/layanan`}>Layanan</Link> / <Link href={`${mainUrl}/layanan/${slugServices}`}>{formattedName}</Link> / <Link href={`${mainUrl}/layanan/${slugServices}/${slug}`}>{formattedSlug}</Link> / <Link href={`${mainUrl}/layanan/${slugServices}/${slug}/${slug_sc}`}>Pasien {formattedSlugSc}</Link> / <span>{patients.name}</span></h5>
      </div>

      {/* Section 1 */}
      <div className={`${styles.section_1} ${styles.section_1_sc}`}>
        <div className={styles.section_1_heading}>
          <h1> 
             {patients.name.split(" ")[0]}{" "}
            <font>{patients.name.split(" ").slice(1).join(" ")}</font>
          </h1>
        </div>
        <div className={styles.section_1_content}>
          <div
            className={styles.service_description}
            dangerouslySetInnerHTML={{
              __html: patients.description || "Deskripsi tidak tersedia.",
            }}
          />
          <p>Hasil individu bervariasi <br/> <br/>
          Dibawah ini adalah gambar sebelum dan sesudah pasien yang melalukan tindakan operasi Blepharoplasty di NMW Bedah Plastik. Harap diperhatikan bahwa setiap hasil pasien sebelum dan sesudah berbeda. Silahkan hubungi Customer Service kami apabila ingin bertanya lebih lanjut.</p>
          <Link
            href={`https://api.whatsapp.com/send?phone=${formattedPhone}`}
            target="_blank"
          >
            <button className={styles.btn_layanan}>
              Buat Janji Temu Sekarang <FaWhatsapp />
            </button>
          </Link>
        </div>
      </div>
       <div className={`${styles.section_2} ${styles.section_2_sc} ${styles.section_2_patient}`}>
         <div className={styles.patient_galeri_layout}>
           {/* Map over the patient data */}
           {patients ? (
            <>
            <div className={styles.box_galeri} key={patients._id}>
              {/* Gambar Pasien */}
              <div className={styles.box_galeri_image}>
                <Image
                  priority
                  width={800}
                  height={800}
                  src={`${storageUrl}/${patients.image}`}
                  alt={patients.name || "Galeri Image"}
                />
                <div className={styles.button_image}>
                  <button type="button">Sebelum</button>
                  <button type="button">Sesudah</button>
                </div>
              </div>
            </div>
            <div className={styles.box_galeri} key={patients._id}>
              {/* Gambar Pasien */}
              <div className={styles.box_galeri_image}>
                <Image
                  priority
                  width={800}
                  height={800}
                  src={`${storageUrl}/${patients.imageSecond}`}
                  alt={patients.name || "Galeri Image"}
                />
                <div className={styles.button_image}>
                  <button type="button">Sebelum</button>
                  <button type="button">Sesudah</button>
                </div>
              </div>
            </div>
            </>
          ) : (
            <p>Data pasien tidak tersedia.</p>
          )}
        </div>
      </div>
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
            src="/images/dokter_layanan.webp"
            alt="Dokter-dokter NMW Aesthetic Clinic"
            className={styles.our_dokter}
            loading="lazy"
          />
          <img
            src="/images/nmw_bg.webp"
            alt="Background Dokter"
            className={styles.bg_our_dokter}
            loading="lazy"
          />
          <div className={styles.section_4_content}>
            <p>
              Dokter NMW Aesthetic Clinic adalah dokter terpilih, terlatih secara
              profesional, dan terpercaya untuk melakukan bedah plastik,
              dermatologi, spesialis kulit dan kelamin, serta perawatan kulit
              estetik.
            </p>
            <p>
              Dokter kami telah menjalani pelatihan ekstensif dan memiliki
              keahlian untuk memberikan hasil luar biasa sekaligus memastikan
              keselamatan pasien.
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