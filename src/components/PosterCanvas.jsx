import React, { useRef, useEffect } from 'react'
import { drawPoster } from '../hooks/usePoster'
import styles from './PosterCanvas.module.css'

export default function PosterCanvas({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      drawPoster(canvasRef.current, data)
    }
  }, [data])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `deadpool-kontrak-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function handleDownloadJpg() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `deadpool-kontrak-${Date.now()}.jpg`
    link.href = canvas.toDataURL('image/jpeg', 0.95)
    link.click()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.previewLabel}>
        <span className={styles.dot} />
        Live Preview - update otomatis
      </div>

      <div className={styles.canvasFrame}>
        <canvas
          ref={canvasRef}
          width={560}
          height={820}
          className={styles.canvas}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={handleDownload}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download PNG
        </button>
        <button className={styles.btnSecondary} onClick={handleDownloadJpg}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download JPG
        </button>
      </div>

      <p className={styles.hint}>
        Ukuran poster: 560 × 820px · Cocok untuk Instagram & wallpaper
      </p>
    </div>
  )
}
