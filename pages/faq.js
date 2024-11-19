import banner from "@/styles/Banner.module.css"
import styles from "@/styles/faq.module.css"
import { IoChevronDown } from "react-icons/io5";
import { useEffect, useState } from "react";

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/faq`);
                const data = await response.json();
                if (data && data.data) { // Pastikan data dan data.data ada
                setFaqs(data.data); // Setel data objek banner
                } else {
                console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };
 
        fetchData();
    }, []);

  const [activeIndex, setActiveIndex] = useState(null);

//   const faqs = [
//     {
//       question: "Apa itu layanan kami?",
//       answer:
//         "Kami menyediakan layanan digital terbaik seperti aplikasi, website, dan digital marketing.",
//     },
//     {
//       question: "Bagaimana cara menghubungi kami?",
//       answer:
//         "Anda dapat menghubungi kami melalui email di admin@example.com atau telepon di +628123456789.",
//     },
//     {
//       question: "Apakah layanan kami mendukung berbagai platform?",
//       answer: "Ya, layanan kami mendukung berbagai platform seperti web, iOS, dan Android.",
//     },
//   ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <div className={banner.banner}>
        <img src="images/faq_banner.png" alt="Layanan Nmw Clinic"/>
    </div>
    <div className={styles.faqPage}>
        <div className={`${styles.heading_section}`}>
            <h1><font>FAQ</font> (Pertanyaan Umum)</h1>
        </div>
        <div className={styles.faqList}>
            {faqs.map((faq, index) => (
            <div
                key={index}
                className={`${styles.faqItem} ${
                activeIndex === index ? styles.active : ""
                }`}
            >
                <button className={styles.question} onClick={() => toggleFAQ(index)}>
                    {faq.question}
                    <IoChevronDown/>
                </button>
                <div
                className={`${styles.answer} ${
                    activeIndex === index ? styles.show : ""
                }`}
                >
                <p>{faq.answer}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
    </>
  );
};

export default FAQPage;
