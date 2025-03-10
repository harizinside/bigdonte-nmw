import styles from '@/styles/Footer.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Footer(){
    const [settings, setSettings] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const storageUrl = process.env.NEXT_PUBLIC_API_STORAGE_URL;

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setStatus(null);
        setMessage('');
    
        try {
            const response = await fetch(`${baseUrl}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            if (response.ok) {
                setStatus('success');
                setMessage('Terima Kasih Telah Berlangganan');
                setEmail(''); // Reset input
            } else {
                const errorData = await response.json();
                setStatus('error');
                setMessage(errorData.error || 'Ada Kesalahan');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            setMessage('Terjadi kesalahan yang tidak terduga.');
        }
    };
     

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/setting`);
                const data = await response.json();
   
                if (data) { // We no longer check data.data, just check if data exists
                    setSettings(data); // Set the entire response object to settings
                } else {
                    console.error('Invalid response data format:', data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
   
        fetchData();
    }, []);
   
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
                                <input type='email' placeholder='email@gmail.com'  id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/><button type="submit">Berlangganan</button>
                            </div>
                        </form>
                        {status && (
                            <div className={styles.eror}
                            style={{
                                color: status === 'success' ? '#fff' : '#fff',
                            }}
                            >
                            {message}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.contact_footer}>
                    <h4>Hubungi Kami</h4>
                    <div className={styles.contact_footer_layout}>
                        <div className={styles.contact_footer_box}>
                            <h5>Alamat</h5>
                            <p>{settings.address}</p>
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