import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import loadingStyles from "@/styles/Loading.module.css";
import styles from "@/styles/Promo.module.css";
import Link from 'next/link';
import { FaCalendar } from "react-icons/fa";
import Head from 'next/head';

export async function getServerSideProps(context) {
    const { title } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    let promos = [];
    let promoDetail = null;

    try {
        // Fetch promos
        const promoRes = await fetch(`${baseUrl}/promo`);
        const promoData = await promoRes.json();

        if (promoData?.data) {
            promos = promoData.data;

            // Match promo by title
            const matchedArticle = promos.find(
                promo =>
                    promo.title &&
                    promo.title.replace(/\s+/g, '-').toLowerCase() === title
            );

            // Fetch promo detail if matched
            if (matchedArticle) {
                const promoDetailRes = await fetch(`${baseUrl}/detail_promo/${matchedArticle.id}`);
                const promoDetailData = await promoDetailRes.json();

                if (promoDetailData) {
                    promoDetail = promoDetailData;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching promo data:', error);
    }

    return {
        props: {
            initialPromoDetail: promoDetail || null,
            initialPromos: promos || [],
        },
    };
}

export default function Promo() {
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;
    const [promo, setPromo] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { title } = router.query; 

    useEffect(() => {
          if (!title) return; // Hindari fetch jika title masih undefined
    
          const fetchServiceType = async () => {
              try {
                  setLoading(true);
                  const response = await fetch(`/api/detail_promo/${title}`);
    
                  const result = await response.json();
                  setPromo(result);
              } catch (error) {
                  console.error("Error fetching promo:", error);
                  setError(error.message);
              } finally {
                  setLoading(false);
              }
          };
    
          fetchServiceType();
      }, [title]); 

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
        if (!promo) {
          return (
              <div className={styles.emptyPage}>
              </div>
          );
        } 

    function formatDateWithTextMonth(dateString) {
        // Jika dateString kosong atau null, kembalikan string kosong
        if (!dateString) {
            return '';
        }
    
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
    
        const [year, month, day] = dateString.split('-');
        const monthName = months[parseInt(month, 10) - 1];
        return `${day} ${monthName} ${year}`;
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Promo - NMW Aesthetic Clinic`,
        description: `Dapatkan promo terbaik dari NMW Aesthetic Clinic untuk perawatan kecantikan dan kesehatan kulit Anda. Nikmati penawaran spesial untuk layanan medis, perawatan wajah, dan perawatan tubuh dengan harga terbaik. Jangan lewatkan promo eksklusif yang dirancang khusus untuk memenuhi kebutuhan kecantikan Anda!`,
        url: `${mainUrl}/${promo.slug}`,
        publisher: {
        "@type": "Organization",
        name: "NMW Aesthetic Clinic",
        logo: {
            "@type": "ImageObject",
            url: `${storageUrl}/${promo.image}`
        }
        },
        mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${mainUrl}/${promo.slug}`
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
                    name: "Promo",
                    item: `${mainUrl}/${promo.slug}`
                }
            ]
        }
    };

  return (
    <>
        <Head>
          <title>{promo.title ? `${promo.title}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
          <meta name="description" content="Dapatkan promo terbaik dari NMW Aesthetic Clinic untuk perawatan kecantikan dan kesehatan kulit Anda. Nikmati penawaran spesial untuk layanan medis, perawatan wajah, dan perawatan tubuh dengan harga terbaik. Jangan lewatkan promo eksklusif yang dirancang khusus untuk memenuhi kebutuhan kecantikan Anda!" />
          <meta name="keywords" content="promo klinik kecantikan, promo perawatan kulit, diskon layanan medis, promo perawatan wajah, penawaran kecantikan NMW Clinic, promo estetika medis, potongan harga perawatan tubuh, promo perawatan rambut, diskon bedah plastik, penawaran khusus NMW Clinic, promo perawatan anti-aging, diskon rejuvenasi kulit, promo perawatan kecantikan NMW Clinic" />

          <meta property="og:title" content={promo.title ? `${promo.title}` : `Layanan NMW Aesthetic Clinic`}  />
          <meta property="og:description" content="Dapatkan promo terbaik dari NMW Aesthetic Clinic untuk perawatan kecantikan dan kesehatan kulit Anda. Nikmati penawaran spesial untuk layanan medis, perawatan wajah, dan perawatan tubuh dengan harga terbaik. Jangan lewatkan promo eksklusif yang dirancang khusus untuk memenuhi kebutuhan kecantikan Anda!" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/${promo.slug}`} />
          <meta property="og:image" content={promo.image ? `${storageUrl}/${promo.image}` : `${mainUrl}/images/logo.svg`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={promo.title ? `${promo.title}` : `Layanan NMW Aesthetic Clinic`} />
          <meta name="twitter:description" content="Dapatkan promo terbaik dari NMW Aesthetic Clinic untuk perawatan kecantikan dan kesehatan kulit Anda. Nikmati penawaran spesial untuk layanan medis, perawatan wajah, dan perawatan tubuh dengan harga terbaik. Jangan lewatkan promo eksklusif yang dirancang khusus untuk memenuhi kebutuhan kecantikan Anda!" />
          <meta name="twitter:image" content={promo.image ? `${storageUrl}/${promo.image}` : `${mainUrl}/images/logo.svg`} />

          <link rel="canonical" href={`${mainUrl}/${promo.slug}`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
        <div className={banner.banner}>
            <img src={`${storageUrl}/${promo.image}`} alt={promo.title} />
            <h1>{promo.title}</h1>
        </div>
        <div className={styles.section_1}>
            <div className={styles.section_1_heading}>
                <h1>
                    <font>{promo.title.split(' ')[0]} </font> 
                    {promo.title.split(' ').slice(1).join(' ')}
                </h1>
                {(promo.start_date && promo.end_date) && (
                    <div className={styles.date}>
                        <FaCalendar />
                        <p>
                            {formatDateWithTextMonth(promo.start_date)} - {formatDateWithTextMonth(promo.end_date)}
                        </p>
                    </div>
                )}
            </div>
            <div className={styles.section_1_content}>
                <div className={styles.section_1_content_heading}>
                    <h3>Syarat & Ketentuan</h3>
                </div>
                <div className={styles.service_description} dangerouslySetInnerHTML={{ __html: promo.sk }} />
            </div>
        </div>
    </>
  );
}
