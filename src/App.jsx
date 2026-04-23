import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FormPanel from './components/FormPanel'
import PosterCanvas from './components/PosterCanvas'
import styles from './App.module.css'

const DEFAULT_DATA = {
  namaJabatan: 'Senior Chimichanga Taster',
  aliasKode: 'SI MULUT MESIN',
  bayaran: '75000000',
  lokasi: 'New York City, AS',
  durasi: 'Sampai Target Habis',
  urgensi: 'segera',
  tingkatBahaya: '3',
  skills: ['Faktor Penyembuhan', 'Pedang Ganda', 'Senjata Api Kelas Berat'],
  deskripsi: 'Kandidat diharap tahan banting, anti lebay, dan tidak takut mati (berkali-kali).',
}

export default function App() {
  const [data, setData] = useState(DEFAULT_DATA)

  function handleReset() {
    setData(DEFAULT_DATA)
  }

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <span className={styles.topBarTitle}>Buat Poster Kontrak Mercenary</span>
            <span className={styles.topBarSub}>Isi form → Poster otomatis terbentuk → Download PNG</span>
          </div>
          <button className={styles.resetBtn} onClick={handleReset} type="button">
            Reset Form
          </button>
        </div>

        <div className={styles.grid}>
          <FormPanel data={data} onChange={setData} />
          <PosterCanvas data={data} />
        </div>

        <div className={styles.infoBar}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>◈</span>
            <span>Isi semua kolom untuk hasil poster terbaik</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>◈</span>
            <span>Poster PNG langsung bisa diupload ke Instagram, Twitter, atau dijadikan wallpaper</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>◈</span>
            <span>Tidak ada data yang disimpan ke server - semua berjalan di browser kamu</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
