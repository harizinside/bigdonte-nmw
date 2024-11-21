import { useState } from 'react';
import styles from "@/styles/Article.module.css"
import banner from "@/styles/Banner.module.css"
import Link from 'next/link';
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect } from 'react';

export default function Artikel() {
    const [articles, setArticles] = useState([]);
    const [articlesAll, setArticlesAll] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman yang aktif
    const [totalPages, setTotalPages] = useState(1); 
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/article-new`);
                const data = await response.json();
                if (data && data.data) { // Pastikan data dan data.data ada
                    // Ambil artikel dari data.data
                    const articles = data.data;
    
                    // Urutkan artikel berdasarkan 'date' dan 'created_at' yang paling baru
                    const sortedArticles = articles.sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        const createdAtA = new Date(a.created_at);
                        const createdAtB = new Date(b.created_at);
    
                        // Urutkan berdasarkan 'date' jika ada, jika tidak, urutkan berdasarkan 'created_at'
                        return (dateB - dateA) || (createdAtB - createdAtA);
                    });
    
                    // Ambil 3 artikel pertama setelah diurutkan
                    setArticles(sortedArticles.slice(0, 3));
                } else {
                    console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
    
        fetchData();
    }, []);    
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${baseUrl}/article?page=${currentPage}`);
            const data = await response.json();
            if (data) {
              setArticlesAll(data.data); // Simpan artikel yang didapat
              setTotalPages(data.meta.last_page); // Simpan total halaman
            } else {
              console.error('Invalid response data format:', data);
            }
          } catch (error) {
            console.error('Error fetching articles:', error);
          }
        };
    
        fetchData();
      }, [currentPage]); // Fetch ulang saat currentPage berubah
    
      // Fungsi untuk menangani klik halaman berikutnya
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      // Fungsi untuk menangani klik halaman sebelumnya
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    

  return (
    <>
    <div className={banner.banner}>
        <img src="images/slimming-treatment.png" alt="Layanan Nmw Clinic"/>
    </div>
    <div className={styles.container}>
        <div className={styles.tabsContainer}>
            <div className={styles.tabContent_container}>
                <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
                    <h1><font>Artikel</font> Terbaru</h1>
                </div>
                <div className={styles.heading_sidebar}>
                    <h1>Tag Artikel</h1>
                </div>
            </div>
            <div className={styles.tabContent}>
                <div className={styles.tabcontent_layout}>
                    <div className={styles.tabcontent_section}>
                        {articles.map(article => (
                            <div className={styles.tabcontent_box} key={article.id}>
                                <div className={styles.tabcontent_box_img}>
                                    <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                        <img src={article.image} alt={article.title}/>
                                    </Link>
                                    <Link href={""}><button className={styles.tag_article_img}>#aging</button></Link>
                                </div>
                                <div className={styles.tabcontent_box_text}>
                                    <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                        <h1>{article.title}</h1>
                                    </Link>
                                    <span>Admin, {article.date}</span>
                                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: article.description }} />
                                    <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                        <button>Baca Selengkapnya</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.article_sidebar_layout}>
                        <h3 className={styles.heading_sidebar_mobile}>Tag Artikel</h3>
                        <div className={styles.article_sidebar_button}>
                            <Link href={""}><button>#aging</button></Link>
                            <Link href={""}><button>#Skincare</button></Link>
                            <Link href={""}><button>#Aging</button></Link>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    <div className={styles.article_section}>
        <div className={`${styles.heading_section} ${styles.heading_section_start}`}>
            <h1><font>Artikel</font> Lain</h1>
        </div>
        <div className={styles.article_container}>
            <div className={styles.article_layout}>
                {articlesAll.map(article => (
                    <div className={styles.article_box} key={article.id}>
                        <div className={styles.article_image}>
                            <Link href={"/detail-artikel"}><button>#aging</button></Link>
                            <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                <img src={article.image} alt={article.title}/>
                            </Link>
                        </div>
                        <div className={styles.article_content}>
                            <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                <div className={styles.article_heading}>
                                    <h1>{article.title}</h1>
                                </div>
                            </Link>
                            <span>Admin, {article.date}</span>
                            <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}><button className={styles.btn_more}>Baca Selengkapnya</button></Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.article_pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Sebelumnya
                </button>
                {/* Menampilkan nomor halaman */}
                {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    className={currentPage === index + 1 ? styles.active_pagination : ''}
                    onClick={() => setCurrentPage(index + 1)}
                >
                    {index + 1}
                </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Selanjutnya
                </button>
            </div>
        </div>
    </div>
    </>
  );
}
