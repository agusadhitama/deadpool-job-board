import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logoMark}>
            <span className={styles.logoX}>✕</span>
          </div>
          <div>
            <h1 className={styles.title}>Deadpool Job Board</h1>
            <p className={styles.subtitle}>Papan Lowongan Kerja Mercenary Resmi - Divisi Weapon X</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Generator Poster Aktif
          </div>
          <p className={styles.credit}>
            by <span>Agus Satria Adhitama</span>
          </p>
        </div>
      </div>
      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {Array(4).fill('⚡ WEAPON X MERCENARY AGENCY · LOWONGAN TERSEDIA SEKARANG · BAYARAN KOMPETITIF · REGENERASI ADALAH BONUS · CHIMICHANGA DITANGGUNG PERUSAHAAN · DAFTAR SEGERA ·  ').join('')}
        </div>
      </div>
    </header>
  )
}
