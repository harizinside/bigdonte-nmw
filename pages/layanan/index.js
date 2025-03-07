import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import breadcrumb from "@/styles/Breadcrumb.module.css"
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";

export default function LayananPage(){
    const [settings, setSettings] = useState([]);
    const [services, setServices] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

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
                    const response = await fetch(`${baseUrl}/setting`);
                    const data = await response.json();
    
                    if (data && data.social_media) {
                        const cachedData = JSON.parse(cachedSetting);
                        
                        // Bandingkan data baru dengan cache
                        if (JSON.stringify(data) !== JSON.stringify(cachedData)) {
                            setSettings(data);
                            localStorage.setItem('settingCache', JSON.stringify(data));
                            localStorage.setItem('settingCacheExpired', (now + 86400000).toString());
                        } 
                    } else {
                        console.error('Invalid API response:', data);
                    }
                } catch (error) {
                    console.error('Error checking API for updates:', error);
                }
                return;
            }
    
            // Fetch data jika tidak ada cache atau cache sudah kadaluarsa
            try {
                const response = await fetch(`${baseUrl}/setting`);
                const data = await response.json();
    
                if (data && data.social_media) {
                    setSettings(data);
                    localStorage.setItem('settingCache', JSON.stringify(data));
                    localStorage.setItem('settingCacheExpired', (now + 86400000).toString());
                } else {
                    console.error('Invalid API response:', data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [baseUrl]);

    useEffect(() => {
        const fetchDataService = async () => {
            const cachedData = localStorage.getItem('promoCache');
            const cacheExpiry = localStorage.getItem('promoCacheExpiry');
            const now = new Date().getTime();
    
            try {
                const response = await fetch(`${baseUrl}/service`);
                const data = await response.json();
    
                if (data && data.data) {
                    let servicesData = data.data;
    
                    if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
                        const parsedCache = JSON.parse(cachedData);
                        if (JSON.stringify(parsedCache) !== JSON.stringify(data.data)) {
                            servicesData = data.data;
                        } else {
                            servicesData = parsedCache;
                        }
                    } else {
                        servicesData = data.data;
                    }
    
                    // Ambil detail service setelah mendapatkan daftar
                    const detailedServices = await fetchServiceDetails(servicesData);
    
                    setServices(detailedServices);
                    localStorage.setItem('promoCache', JSON.stringify(servicesData));
                    localStorage.setItem('promoCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                } else {
                    console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchDataService();
    }, [baseUrl]);
    
    const fetchServiceDetails = async (services) => {
    
        return await Promise.all(
            services.map(async (service) => {
                try {
                    const res = await fetch(`${baseUrl}/service_detail/${service.id}`);
                    const detail = await res.json();
    
                    return {
                        ...service,
                        image: detail.data?.image ? `${storageUrl}/${detail.data.image}` : '/images/detail-artikel-banner.png',
                        image_2: detail.data?.image_2 ? `${storageUrl}/${detail.data.image_2}` : null,
                        description: detail.data?.description || '',
                    };
                } catch (error) {
                    console.error(`Error fetching service ${service.id}:`, error);
                    return { ...service, image: '/images/detail-artikel-banner.png' };
                }
            })
        );
    };    

    const generateSlug = (text) => {
        return text
            .toLowerCase() // Ubah ke huruf kecil
            .replace(/\s+/g, '-') // Ganti spasi dengan "-"
            .replace(/[^a-z0-9\-]/g, '') // Hapus karakter selain huruf, angka, dan "-"
            .replace(/-+/g, '-') // Hapus duplikasi tanda "-"
            .trim(); // Hilangkan spasi di awal dan akhir
    };
    
    

    const formattedPhone = settings.phone && settings.phone.startsWith('0')
    ? '62' + settings.phone.slice(1)  // Replace the first 0 with 62
    : settings.phone;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `NMW Aesthetic Clinic`,
        description: `Temukan layanan terbaik dari NMW Aesthetic Clinic, mulai dari perawatan kulit, bedah plastik, konsultasi kesehatan, hingga perawatan anti-aging. Kunjungi klinik kecantikan terpercaya untuk solusi kecantikan yang optimal.`,
        url: `${mainUrl}/layanan}`,
        publisher: {
          "@type": "Organization",
          name: "NMW Aesthetic Clinic",
          logo: {
            "@type": "ImageObject",
            url: `${storageUrl}/${settings.logo}`,
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${mainUrl}/layanan`
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Beranda",
                item: `${mainUrl}`
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Layanan",
                item: `${mainUrl}/layanan`
              },
            ]
        }
    };

    return(
        <>
        <Head>
        <title>Layanan NMW Aesthetic Clinic - Perawatan Kulit & Estetika Medis</title>

        <meta name="description" content="Temukan layanan terbaik dari NMW Aesthetic Clinic, mulai dari perawatan kulit, bedah plastik, konsultasi kesehatan, hingga perawatan anti-aging. Kunjungi klinik kecantikan terpercaya untuk solusi kecantikan yang optimal." />

        <meta name="keywords" content="NMW Aesthetic Clinic, perawatan kulit, klinik kecantikan, estetika medis, bedah plastik, konsultasi kesehatan, perawatan wajah, rejuvenasi kulit, anti-aging, dokter kecantikan, laser treatment, facial treatment, lifting & tightening" />

        <meta property="og:title" content="Layanan NMW Aesthetic Clinic - Perawatan Kulit & Estetika Medis" />
        <meta property="og:description" content="Dapatkan berbagai layanan kecantikan dan perawatan kulit terbaik di NMW Aesthetic Clinic. Konsultasi dengan dokter kecantikan berpengalaman sekarang!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${mainUrl}/layanan`} />
        <meta property="og:image" content={`${storageUrl}/${settings.favicon}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NMW Aesthetic Clinic" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Layanan NMW Aesthetic Clinic - Perawatan Kulit & Estetika Medis" />
        <meta name="twitter:description" content="Klinik kecantikan terbaik dengan layanan estetika medis, bedah plastik, dan perawatan kulit profesional." />
        <meta name="twitter:image" content={`${storageUrl}/${settings.favicon}`} />

        <link rel="canonical" href={`${mainUrl}/layanan`} />

        <meta name="robots" content="index, follow" />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
        <div className={banner.banner}>
            <Image priority width={500} height={500} src={`/images/detail-artikel-banner.png`} alt="Layanan NMW Aesthetic Clinic" />
        </div>
        <div className={breadcrumb.breadcrumb}>
            <h5><Link href={'/'}>Home</Link> / <span>Layanan</span></h5>
        </div>
        <div className={styles.section_1}>
            <div className={styles.section_1_heading}>
                <h1>
                    <span>Layanan </span> 
                    Kami 
                </h1>

                <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target="blank_"><button className={styles.btn_layanan}>Buat Janji Temu Sekarang <FaWhatsapp/></button></Link>
            </div>
            <div className={styles.section_1_content}>
                <p>Di NMW Aesthetic Clinic, kami menghadirkan solusi perawatan kulit yang inovatif dan berbasis medis untuk membantu Anda mencapai kulit sehat, cerah, dan bercahaya. Dengan kombinasi teknologi terkini, tenaga medis profesional, serta bahan berkualitas tinggi, kami menawarkan berbagai layanan estetika yang disesuaikan dengan kebutuhan unik kulit Anda. Setiap prosedur yang kami lakukan telah melalui penelitian mendalam dan dirancang untuk memberikan hasil yang efektif, aman, dan sesuai dengan standar medis terbaik.
                    <br/><br/>
                    Kami memahami bahwa setiap individu memiliki kondisi kulit yang berbeda, sehingga setiap perawatan yang kami berikan bersifat personal dan disesuaikan dengan jenis kulit serta kebutuhan spesifik Anda. Dengan pendekatan yang holistik, kami tidak hanya fokus pada hasil jangka pendek tetapi juga kesehatan kulit dalam jangka panjang.
                    <br/><br/>
                    Di NMW Aesthetic Clinic, kami berkomitmen untuk memberikan pelayanan terbaik yang mengutamakan kepuasan dan kenyamanan pasien. Klinik kami dirancang dengan suasana yang tenang dan nyaman, menciptakan pengalaman perawatan yang menyenangkan dan bebas dari rasa khawatir. Kami percaya bahwa kecantikan sejati berasal dari kulit yang sehat, dan dengan dukungan dari tim medis profesional kami, Anda dapat menikmati perawatan berkualitas tinggi yang membantu meningkatkan rasa percaya diri Anda dalam setiap momen kehidupan.</p>
            </div> 
        </div>
        <div className={styles.section_3}>
            <div className={styles.heading_section}>
                <h2>
                    <span>Jenis</span> Layanan
                </h2>
            </div>

            <div className={styles.box_galeri_layout}>
            {services.map((service) => (
                <Link href={`layanan/${generateSlug(service.name)}`} key={service.id}>
                    <div className={styles.box_galeri}>
                        <div className={styles.box_galeri_image}>
                            <div className={styles.box_galeri_overlay}></div>
                            <Image
                                width={800}
                                height={800}
                                priority
                                src={service.image}
                                alt={service.name}
                            />
                            <div className={`${styles.button_image} ${styles.button_image_sc}`}>
                                <button>{service.name}</button>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

            </div>
        </div>
            
        </>
    );
}