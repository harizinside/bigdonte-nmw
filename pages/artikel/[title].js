import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import banner from "@/styles/Banner.module.css";
import styles from "@/styles/Detail.module.css";
import stylesAll from "@/styles/Article.module.css"
import loadingStyles from "@/styles/Loading.module.css";
import not from "@/styles/Not.module.css";
import Link from 'next/link';

export default function DetailArtikel() {
    const router = useRouter();
    const { title } = router.query;
    const [articleDetail, setArticleDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [settings, setSettings] = useState([]);
    const [articlesAll, setArticlesAll] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman yang aktif
    const [totalPages, setTotalPages] = useState(1); 

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        if (title && articles.length > 0) {
            const matchedArticle = articles.find(article =>
                article.title.replace(/\s+/g, '-').toLowerCase() === title
            );

            if (matchedArticle) {
                const fetchArticleDetail = async () => {
                    try {
                        const response = await fetch(`${baseUrl}/detail-artikel?id=${matchedArticle.id}`);
                        const data = await response.json();

                        if (data && data.data) {
                            setArticleDetail(data.data);

                            // Filter artikel lain
                            const filteredArticles = articles.filter(article => article.id !== matchedArticle.id);
                            setArticles(filteredArticles.slice(0, 3)); // Tampilkan 3 artikel lainnya
                        }
                    } catch (error) {
                        console.error('Error fetching article detail:', error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchArticleDetail();
            } else {
                setLoading(false); // Jika artikel tidak ditemukan
            }
        }
    }, [title, articles, baseUrl]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/article-new`);
                const data = await response.json();
                if (data && data.data) { 
                    const articles = data.data;

                    // Urutkan artikel berdasarkan 'date' dan 'created_at' yang paling baru
                    const sortedArticles = articles.sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        const createdAtA = new Date(a.created_at);
                        const createdAtB = new Date(b.created_at);

                        return (dateB - dateA) || (createdAtB - createdAtA);
                    });

                    setArticles(sortedArticles);
                } else {
                    console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchData();
    }, [baseUrl]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/setting`);
                const data = await response.json();
                console.log('Fetched data:', data);  // Log the entire response

                if (data && data.social_media) {
                    setSettings(data); // Set the entire response object to settings
                } else {
                    console.error('No social_media data found:', data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
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

    if (!articleDetail) {
        return (
            <>
                <div className={not.box}>
                    <div className={not.content}>
                        <img src="../images/not-found.png" alt='Artikel Tidak Ditemukan' />
                        <span>Artikel Tidak Ditemukan</span>
                    </div>
                </div>
                <div className={stylesAll.article_section}>
                    <div className={`${stylesAll.heading_section} ${stylesAll.heading_section_start}`}>
                        <h1><font>Artikel</font> Lain</h1>
                    </div>
                    <div className={stylesAll.article_container}>
                        <div className={stylesAll.article_layout}>
                            {articlesAll.map(article => (
                                <div className={stylesAll.article_box} key={article.id}>
                                    <div className={stylesAll.article_image}>
                                        <Link href={"/detail-artikel"}><button>#aging</button></Link>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <img src={article.image} alt={article.title}/>
                                        </Link>
                                    </div>
                                    <div className={stylesAll.article_content}>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <div className={stylesAll.article_heading}>
                                                <h1>{article.title}</h1>
                                            </div>
                                        </Link>
                                        <span>Admin, {article.date}</span>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}><button className={stylesAll.btn_more}>Baca Selengkapnya</button></Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={stylesAll.article_pagination}>
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Sebelumnya
                            </button>
                            {/* Menampilkan nomor halaman */}
                            {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={currentPage === index + 1 ? stylesAll.active_pagination : ''}
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

    return (
        <>
            <div className={banner.banner}>
                <img src={articleDetail.image} alt={articleDetail.title} />
            </div>
            <div className={styles.container}>
                <div className={styles.detail_tag}>
                    <Link href={""}><button>#Skincare</button></Link>
                </div>
                <div className={styles.container_layout}>
                    <div className={styles.container_content}>
                        <div className={styles.content_heading}>
                            <h1>{articleDetail.title}</h1>
                            <span>Admin, {articleDetail.date}</span>
                        </div>
                        <div className={styles.content_text}>
                            <div dangerouslySetInnerHTML={{ __html: articleDetail.description }} />
                        </div>
                    </div>
                    <div className={styles.container_sidebar}>
                        <div className={styles.sidebar_heading}>
                            <h4>Artikel Lain</h4>
                            <Link href={"/artikel"}>Lihat lebih banyak</Link>
                        </div>
                        <div className={styles.sidebar_layout}>
                            {articles.map(article => (
                                <div className={styles.article_box} key={article.id}>
                                    <div className={styles.article_image}>
                                        <Link href={"/"}><button>#aging</button></Link>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <img src={article.image} alt={article.title} />
                                        </Link>
                                    </div>
                                    <div className={styles.article_content}>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <div className={styles.article_heading}>
                                                <h1>{article.title}</h1>
                                            </div>
                                        </Link>
                                        <span>Admin, {article.date}</span>
                                        <Link href={`/artikel/${encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase())}`}>
                                            <button className={styles.btn_more}>Baca Selengkapnya</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
