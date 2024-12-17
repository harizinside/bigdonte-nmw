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

export default function Promo({ initialPromoDetail }) {
    const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    if (!initialPromoDetail) {
        return (
            <div className={banner.banner}>
                <h2>Promo not found</h2>
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
        url: `${mainUrl}/${encodeURIComponent(initialPromoDetail.title.replace(/\s+/g, '-').toLowerCase())}`,
        publisher: {
        "@type": "Organization",
        name: "NMW Aesthetic Clinic",
        logo: {
            "@type": "ImageObject",
            url: `${storageUrl}/${initialPromoDetail.image}`
        }
        },
        mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${mainUrl}/${encodeURIComponent(initialPromoDetail.title.replace(/\s+/g, '-').toLowerCase())}`
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
                    item: `${mainUrl}/${encodeURIComponent(initialPromoDetail.title.replace(/\s+/g, '-').toLowerCase())}`
                }
            ]
        }
    };

  return (
    <>
        <Head>
          <title>{initialPromoDetail.title ? `${initialPromoDetail.title}` : `Layanan NMW Aesthetic Clinic`}  | NMW Aesthetic Clinic</title>
          <meta name="description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="keywords" content="kebijakan privasi, kebijakan, privasi, kebijakan privasi nmw clinic, nmw clinic" />

          <meta property="og:title" content={initialPromoDetail.title ? `${initialPromoDetail.title}` : `Layanan NMW Aesthetic Clinic`}  />
          <meta property="og:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${mainUrl}/${encodeURIComponent(initialPromoDetail.title.replace(/\s+/g, '-').toLowerCase())}`} />
          <meta property="og:image" content={initialPromoDetail.image ? `${storageUrl}/${initialPromoDetail.image}` : `${mainUrl}/images/logo.svg`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={initialPromoDetail.title ? `${initialPromoDetail.title}` : `Layanan NMW Aesthetic Clinic`} />
          <meta name="twitter:description" content="Berikut kebijakan privasi untuk melakukan akses website NMW Aesthetic Clinic" />
          <meta name="twitter:image" content={initialPromoDetail.image ? `${storageUrl}/${initialPromoDetail.image}` : `${mainUrl}/images/logo.svg`} />

          <link rel="canonical" href={`${mainUrl}/${encodeURIComponent(initialPromoDetail.title.replace(/\s+/g, '-').toLowerCase())}`} />

          <script type="application/ld+json">
          {JSON.stringify(schemaData)}
          </script>
      </Head>
        <div className={banner.banner}>
            <img src={`${storageUrl}/${initialPromoDetail.image}`} alt={initialPromoDetail.title} />
            <h1>{initialPromoDetail.title}</h1>
        </div>
        <div className={styles.section_1}>
            <div className={styles.section_1_heading}>
                <h1>
                    <font>{initialPromoDetail.title.split(' ')[0]} </font> 
                    {initialPromoDetail.title.split(' ').slice(1).join(' ')}
                </h1>
                {(initialPromoDetail.start_date && initialPromoDetail.end_date) && (
                    <div className={styles.date}>
                        <FaCalendar />
                        <p>
                            {formatDateWithTextMonth(initialPromoDetail.start_date)} - {formatDateWithTextMonth(initialPromoDetail.end_date)}
                        </p>
                    </div>
                )}
            </div>
            <div className={styles.section_1_content}>
                <div className={styles.section_1_content_heading}>
                    <h3>Syarat & Ketentuan</h3>
                </div>
                <div className={styles.service_description} dangerouslySetInnerHTML={{ __html: initialPromoDetail.sk }} />
            </div>
        </div>
    </>
  );
}
