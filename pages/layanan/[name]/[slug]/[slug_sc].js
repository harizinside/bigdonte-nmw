import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Layanan.module.css";
import Link from "next/link";
import loadingStyles from "@/styles/Loading.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function SubJenisLayanan() {
  const router = useRouter();
  const { slug_sc } = router.query;
  const [serviceDetail, setServiceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ phone: "" });

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${baseUrl}/setting`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setSettings(data || { phone: "" });
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, [baseUrl]);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      if (!slug_sc) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/stos/${slug_sc}`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setServiceDetail(data?.data || null);
      } catch (error) {
        console.error("Error fetching service detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [slug_sc, baseUrl]);

  const formattedPhone = settings.phone?.startsWith("0")
    ? "62" + settings.phone.slice(1)
    : settings.phone;

  if (loading) {
    return (
      <div className={loadingStyles.box}>
        <div className={loadingStyles.content}>
          <img src="/images/logo.svg" alt="Loading logo" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!serviceDetail) {
    return (
      <div className={styles.section_error}>
        <p>Layanan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <div className={banner.banner}>
        <img
          src={`https://nmw.prahwa.net/storage/${serviceDetail.image}`}
          alt={serviceDetail.name || "Banner image"}
        />
      </div>

      {/* Section 1 */}
      <div className={`${styles.section_1} ${styles.section_1_sc}`}>
        <div className={styles.section_1_heading}>
          <h1>
            {serviceDetail.title.split(" ")[0]}{" "}
            <font>{serviceDetail.title.split(" ").slice(1).join(" ")}</font>
          </h1>
        </div>
        <div className={styles.section_1_content}>
          <div
            className={styles.service_description}
            dangerouslySetInnerHTML={{
              __html: serviceDetail.description || "Deskripsi tidak tersedia.",
            }}
          />
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

      {/* Section 4 */}
      <div className={styles.section_4}>
        <div className={styles.heading_section_4}>
          <div
            className={`${styles.heading_section} ${styles.heading_section_start}`}
          >
            <h1>
              <font>Dokter Kami</font>
            </h1>
            <p>dr. Nataliani Mawardi, dipl. CIBTAC</p>
          </div>
        </div>
        <div className={styles.section_4_box}>
          <img
            src="/images/dokter_layanan.png"
            alt="Dokter-dokter NMW Clinic"
            className={styles.our_dokter}
          />
          <img
            src="/images/nmw_bg.png"
            alt="Background Dokter"
            className={styles.bg_our_dokter}
          />
          <div className={styles.section_4_content}>
            <p>
              Dokter NMW klinik adalah dokter terpilih, terlatih secara
              profesional, dan terpercaya untuk melakukan bedah plastik,
              dermatologi, spesialis kulit dan kelamin, serta perawatan kulit
              estetik.
            </p>
            <p>
              Dokter kami telah menjalani pelatihan ekstensif dan memiliki
              keahlian untuk memberikan hasil luar biasa sekaligus memastikan
              keselamatan pasien.
            </p>
            <Link href="/">
              <button>Lihat Lebih Lanjut</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
