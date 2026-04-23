import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          Deadpool Job Board · Dibuat dengan <span>♥</span> dan chimichanga oleh{' '}
          <strong>Agus Satria Adhitama</strong>
        </p>
        <p className={styles.disclaimer}>
          Weapon X tidak bertanggung jawab atas kerusakan fisik, psikologis, atau multiverse yang terjadi.
        </p>
      </div>
    </footer>
  )
}
