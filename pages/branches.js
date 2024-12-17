import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Kebijakan.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function KebijakanPrivasi() {
  const [kebijakans, setKebijakans] = useState([]); // Default sebagai array
  const [branchs, setBranchs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

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
                const response = await fetch(`${baseUrl}/setting`);
                const data = await response.json();

                if (data && data.social_media) {
                    const cachedData = JSON.parse(cachedSetting);
                    
                    // Bandingkan data baru dengan cache
                    if (JSON.stringify(data) !== JSON.stringify(cachedData)) {
                        setSettings(data);
                        localStorage.setItem('settingCache', JSON.stringify(data));
                        localStorage.setItem('settingCacheExpired', (now + 86400000).toString());
                        console.log('Cache updated after API check');
                    } else {
                        console.log('No changes detected in API data');
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
                console.log('Fetched and cached from API');
            } else {
                console.error('Invalid API response:', data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, [baseUrl]);

useEffect(() => {
    const fetchData = async () => {
        const cachedData = localStorage.getItem('promoCache');
        const cacheExpiry = localStorage.getItem('promoCacheExpiry');
        const now = new Date().getTime();

        try {
            const response = await fetch(`${baseUrl}/branch`);
            const data = await response.json();

            if (data && data.data) {
                if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
                    const parsedCache = JSON.parse(cachedData);
                    
                    if (JSON.stringify(parsedCache) !== JSON.stringify(data.data)) {
                        console.log('Data updated from API');
                        setBranchs(data.data);
                        localStorage.setItem('promoCache', JSON.stringify(data.data));
                        localStorage.setItem('promoCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                    } else {
                        console.log('Loaded from cache');
                        setBranchs(parsedCache);
                    }
                } else {
                    console.log('Fetched from API');
                    setBranchs(data.data);
                    localStorage.setItem('promoCache', JSON.stringify(data.data));
                    localStorage.setItem('promoCacheExpiry', (now + 6 * 60 * 60 * 1000).toString());
                }
            } else {
                console.error('Invalid response data format:', data);
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
            if (cachedData) {
                setBranchs(JSON.parse(cachedData));
                console.log('Loaded from cache after API error');
            }
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, [baseUrl]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/kebijakan`);
        const data = await response.json();
        if (Array.isArray(data)) { // Pastikan data adalah array
          setKebijakans(data); // Setel data array kebijakan
        } else {
          console.error("Invalid response data format:", data);
        }
      } catch (error) {
        console.error("Error fetching kebijakan:", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Cabang - NMW Aesthetic Clinic`,
    description: `Alamat Cabang & Kantor NMW Aesthetic Clinic`,
    url: `${mainUrl}/cabang`,
    publisher: {
      "@type": "Organization",
      name: "NMW Aesthetic Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${mainUrl}/images/cabang-banner.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${mainUrl}/cabang`
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
                name: "Cabang",
                item: `${mainUrl}/cabang`
            }
        ]
    }
};

  return (
    <>
        <Head>
          <title>Cabang | NMW Aesthetic Clinic</title>
          <meta name="description" content="Berikut Alamat Cabang NMW Aesthetic Clinic" />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content="Cabang NMW Aesthetic Clinic"  />
          <meta property="og:description" content="Berikut Alamat Cabang NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/kebijakan-privasi`} />
          <meta property="og:image" content={`${mainUrl}/images/cabang-banner.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Cabang NMW Aesthetic Clinic" />
          <meta name="twitter:description" content="Berikut Alamat Cabang NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={`${mainUrl}/images/cabang-banner.png`} />

          <link rel="canonical" href={`${mainUrl}/kebijakan-privasi`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
      <div className={banner.banner}>
        <img
          src="/images/kebijakan-privasi.png"
          alt="Kebijakan Privasi NMW Aesthetic Clinic"
        />
      </div>
      <div className={styles.container}>
        <div className={`${styles.heading_section}`}>
          <h1>
            <font>Kebijakan</font> Privasi
          </h1>
        </div>
        <div className={styles.kebijakan_layout}>
          {kebijakans.map((item, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.kebijakan }} // Render HTML dari API
            />
          ))}
        </div>
      </div>
    </>
  );
}
