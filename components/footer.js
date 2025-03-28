import styles from '@/styles/Footer.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Footer(){
    const [settings, setSettings] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setMessage('');
        setError(null); // Reset error sebelum request baru
      
        try {
          const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
      
          const data = await response.json();
      
          if (response.status === 400) {
            setError("Email sudah terdaftar");
            return;
          }
      
          if (!response.ok) {
            setError(data.error || "Terjadi kesalahan");
            return;
          }
      
          console.log('Success:', data);
          setMessage('Berhasil berlangganan!');
        } catch (err) {
          console.error("❌ Error:", err);
          setError("Terjadi kesalahan, silakan coba lagi.");
        }
      };
                
      

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
   
    const formattedPhone = settings.phone && settings.phone.startsWith('0')
    ? '62' + settings.phone.slice(1)  // Replace the first 0 with 62
    : settings.phone;


    return(
        <>
            <div className={styles.footer}>
                <div className={styles.footer_logo}>
                    <img src={`${storageUrl}/${settings.logo}`} alt="NMW Aesthetic Clinic Logo" />
                    <div className={styles.footer_form}>
                        <h5>Berlangganan dengan berita terbaru kami</h5>
                        <p>Daftar untuk tips perawatan kulit, saran ahli acara eksklusif dari NMW Aesthetic Clinic</p>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.form_layout}>
                                <input type='email' placeholder='email@gmail.com'  id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/><button type="submit">{loading ? "Loading..." : "Berlangganan"}</button>
                            </div>
                        </form>
                        {error && <p className={styles.eror}>{error}</p>} {/* Tampilkan error jika ada */}
                        {message && <p className={styles.eror}>{message}</p>}
                    </div>
                </div>
                <div className={styles.contact_footer}>
                    <h4>Hubungi Kami</h4>
                    <div className={styles.contact_footer_layout}>
                        <div className={styles.contact_footer_box}>
                            <h5>Alamat</h5>
                            <p>{settings.address_footer}</p>
                        </div>
                        <div className={styles.contact_footer_box}>
                            <h5>Layanan Pelanggan</h5>
                            <Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`} target="blank_"><p>{settings.phone}</p></Link>
                        </div>
                        <div className={styles.contact_footer_box}>
                            <h5>Email</h5>
                            <Link href={`mailto:${settings.email}`} target="blank_"><p>{settings.email}</p></Link>
                        </div>
                    </div>
                </div>
                <div className={styles.contact_footer}>
                    <h4>Lainnya</h4>
                    <ul>
                        <li><Link href={`https://api.whatsapp.com/send?phone=${formattedPhone}`}  target="blank_">Bantuan Kami</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                    </ul>
                </div>
                <div className={styles.contact_footer}>
                    <h4>Legalitas</h4>
                    <ul>
                        <li><Link href="/kebijakan-privasi">Kebijakan Privasi</Link></li>
                        <li><Link href="/syarat-ketentuan">Syarat & Ketentuan</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}