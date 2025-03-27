import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Promo.module.css";
import Link from 'next/link';
import { FaCalendar } from "react-icons/fa";
import Head from 'next/head';

export const getServerSideProps = async (context) => {
  const { query } = context;
  const title = query.title;

  if (!title) {
    return {
      notFound: true,
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  try {
    const response = await fetch(`${baseUrl}/detail_promo/${title}`);
    const promo = await response.json();

    return {
      props: {
        promo,
      },
    };
  } catch (error) {
    console.error("Error fetching promo:", error);
    return {
      notFound: true,
    };
  }
};

export default function Promo({ promo }) {
  const mainUrl = process.env.NEXT_PUBLIC_API_MAIN_URL;
  const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

  function formatDateWithTextMonth(date) {
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];
  
    const dateObject = new Date(date); // Buat objek Date dari string tanggal
    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
  
    return `${day} ${month} ${year}`;
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
    <div>
      <Head>
        <title>{promo.title ? `${promo.title}` : `Layanan NMW Aesthetic Clinic`} | NMW Aesthetic Clinic</title>
        <meta name="description" content="Dapatkan promo terbaik dari NMW Aesthetic Clinic untuk perawatan kecantikan dan kesehatan kulit Anda. Nikmati penawaran spesial untuk layanan medis, perawatan wajah, dan perawatan tubuh dengan harga terbaik. Jangan lewatkan promo eksklusif yang dirancang khusus untuk memenuhi kebutuhan kecantikan Anda!" />
        <meta name="keywords" content="promo klinik kecantikan, promo perawatan kulit, diskon layanan medis, promo perawatan wajah, penawaran kecantikan NMW Clinic, promo estetika medis, potongan harga perawatan tubuh, promo perawatan rambut, diskon bedah plastik, penawaran khusus NMW Clinic, promo perawatan anti-aging, diskon rejuvenasi kulit, promo perawatan kecantikan NMW Clinic" />

        <meta property="og:title" content={promo.title ? `${promo.title}` : `Layanan NMW Aesthetic Clinic`} />
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
    </div>
  );
}