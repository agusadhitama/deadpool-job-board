import { useEffect } from 'react'

function fillRoundRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
  if (fill) { ctx.fillStyle = fill; ctx.fill() }
}

function strokeRoundRect(ctx, x, y, w, h, r, stroke, lw) {
  ctx.lineWidth = lw || 1
  ctx.strokeStyle = stroke
  fillRoundRect(ctx, x, y, w, h, r)
  ctx.stroke()
}

function wrapText(ctx, text, x, y, maxW, lineH, maxLines) {
  const words = text.split(' ')
  let line = ''
  let lines = []
  for (const word of words) {
    const test = line + (line ? ' ' : '') + word
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line); line = word
      if (maxLines && lines.length >= maxLines) break
    } else { line = test }
  }
  if (line) lines.push(line)
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineH))
  return y + lines.length * lineH
}

function drawDeadpoolMask(ctx, cx, cy, size) {
  const s = size
  // Kepala merah
  ctx.fillStyle = '#C41E2A'
  ctx.beginPath(); ctx.ellipse(cx, cy, s * 0.52, s * 0.58, 0, 0, Math.PI * 2); ctx.fill()

  // Kontur hitam kepala
  ctx.strokeStyle = '#1a0a0a'; ctx.lineWidth = s * 0.04
  ctx.beginPath(); ctx.ellipse(cx, cy, s * 0.52, s * 0.58, 0, 0, Math.PI * 2); ctx.stroke()

  // Area mata kiri (putih telur)
  ctx.fillStyle = '#fff'
  ctx.beginPath(); ctx.ellipse(cx - s * 0.16, cy - s * 0.08, s * 0.14, s * 0.18, -0.2, 0, Math.PI * 2); ctx.fill()
  // Area mata kanan
  ctx.beginPath(); ctx.ellipse(cx + s * 0.16, cy - s * 0.08, s * 0.14, s * 0.18, 0.2, 0, Math.PI * 2); ctx.fill()

  // Kontur mata hitam
  ctx.strokeStyle = '#1a0a0a'; ctx.lineWidth = s * 0.03
  ctx.beginPath(); ctx.ellipse(cx - s * 0.16, cy - s * 0.08, s * 0.14, s * 0.18, -0.2, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.ellipse(cx + s * 0.16, cy - s * 0.08, s * 0.14, s * 0.18, 0.2, 0, Math.PI * 2); ctx.stroke()

  // Garis hitam tengah vertikal (jahitan topeng)
  ctx.strokeStyle = '#1a0a0a'; ctx.lineWidth = s * 0.025
  ctx.beginPath(); ctx.moveTo(cx, cy - s * 0.58); ctx.lineTo(cx, cy + s * 0.58); ctx.stroke()

  // Garis horizontal tengah
  ctx.beginPath(); ctx.moveTo(cx - s * 0.52, cy); ctx.lineTo(cx + s * 0.52, cy); ctx.stroke()

  // Detail jahitan kecil
  ctx.strokeStyle = '#8B0000'; ctx.lineWidth = s * 0.015
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue
    const stitchX = cx + i * s * 0.12
    ctx.beginPath(); ctx.moveTo(stitchX - s * 0.015, cy - s * 0.04); ctx.lineTo(stitchX + s * 0.015, cy + s * 0.04); ctx.stroke()
  }

  // Mulut (garis tegas)
  ctx.strokeStyle = '#1a0a0a'; ctx.lineWidth = s * 0.025
  ctx.beginPath()
  ctx.moveTo(cx - s * 0.18, cy + s * 0.3)
  ctx.quadraticCurveTo(cx, cy + s * 0.38, cx + s * 0.18, cy + s * 0.3)
  ctx.stroke()

  // Kilat di mata kiri
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.beginPath(); ctx.ellipse(cx - s * 0.2, cy - s * 0.16, s * 0.04, s * 0.02, -0.5, 0, Math.PI * 2); ctx.fill()
}

function drawBulletHoles(ctx, W, H) {
  const holes = [
    { x: W * 0.08, y: H * 0.12 },
    { x: W * 0.91, y: H * 0.09 },
    { x: W * 0.85, y: H * 0.78 },
    { x: W * 0.06, y: H * 0.85 },
    { x: W * 0.78, y: H * 0.22 },
  ]
  holes.forEach(h => {
    const r = 8 + Math.random() * 6
    ctx.fillStyle = '#0a0a0a'
    ctx.beginPath(); ctx.arc(h.x, h.y, r, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = '#333'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.arc(h.x, h.y, r * 1.6, 0, Math.PI * 2); ctx.stroke()
    // crack lines
    for (let i = 0; i < 6; i++) {
      const ang = (Math.PI * 2 / 6) * i + Math.random() * 0.3
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(h.x + Math.cos(ang) * r, h.y + Math.sin(ang) * r)
      ctx.lineTo(h.x + Math.cos(ang) * (r + 8 + Math.random() * 12), h.y + Math.sin(ang) * (r + 8 + Math.random() * 12))
      ctx.stroke()
    }
  })
}

function drawSplatter(ctx, x, y, r, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.fillStyle = color
  ctx.globalAlpha = 0.55
  for (let i = 0; i < 8; i++) {
    const ang = (Math.PI * 2 / 8) * i
    const len = r * (0.6 + Math.random() * 0.6)
    const blobR = r * 0.18 + Math.random() * r * 0.12
    ctx.beginPath()
    ctx.arc(Math.cos(ang) * len, Math.sin(ang) * len, blobR, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 0.75
  ctx.beginPath(); ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawUrgensiStamp(ctx, x, y, urgensi) {
  const stamps = {
    santai:  { text: 'PRIORITAS RENDAH', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)' },
    segera:  { text: 'DIPERLUKAN SEGERA', color: '#EF9F27', bg: 'rgba(239,159,39,0.12)' },
    darurat: { text: '!! DARURAT !!',     color: '#E24B4A', bg: 'rgba(226,75,74,0.18)' },
  }
  const s = stamps[urgensi] || stamps.segera
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(-0.12)
  ctx.strokeStyle = s.color; ctx.lineWidth = 3
  ctx.fillStyle = s.bg
  fillRoundRect(ctx, -90, -18, 180, 36, 4, s.bg)
  strokeRoundRect(ctx, -90, -18, 180, 36, 4, s.color, 3)
  ctx.fillStyle = s.color
  ctx.font = 'bold 15px "Oswald", sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(s.text, 0, 1)
  ctx.restore()
}

export function drawPoster(canvas, data) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height
  const {
    namaJabatan, aliasKode, bayaran, lokasi,
    skills, urgensi, durasi, tingkatBahaya, deskripsi
  } = data

  // ── BACKGROUND ──────────────────────────────────────────────
  ctx.fillStyle = '#0f0808'
  ctx.fillRect(0, 0, W, H)

  // Noise texture simulation (halftone dots)
  ctx.save()
  ctx.globalAlpha = 0.04
  for (let row = 0; row < H; row += 8) {
    for (let col = 0; col < W; col += 8) {
      if (Math.random() > 0.5) {
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(col, row, 1, 0, Math.PI * 2); ctx.fill()
      }
    }
  }
  ctx.restore()

  // Merah dramatis di bagian atas
  ctx.fillStyle = '#C41E2A'
  ctx.fillRect(0, 0, W, H * 0.42)

  // Halftone dots besar di area merah (komik Marvel feel)
  ctx.save()
  ctx.globalAlpha = 0.08
  ctx.fillStyle = '#8B0000'
  for (let row = 0; row < H * 0.42; row += 18) {
    for (let col = 0; col < W; col += 18) {
      const size = 3 + Math.sin(row * 0.3 + col * 0.2) * 2
      ctx.beginPath(); ctx.arc(col, row, size, 0, Math.PI * 2); ctx.fill()
    }
  }
  ctx.restore()

  // Diagonal slash / garis panel komik
  ctx.save()
  ctx.globalAlpha = 0.15
  ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 40
  ctx.beginPath(); ctx.moveTo(0, H * 0.1); ctx.lineTo(W, H * 0.38); ctx.stroke()
  ctx.restore()

  // Splatter darah
  drawSplatter(ctx, W * 0.05, H * 0.38, 22, '#8B0000')
  drawSplatter(ctx, W * 0.95, H * 0.4, 16, '#8B0000')
  drawSplatter(ctx, W * 0.5, H * 0.41, 10, '#6e0000')

  // Bullet holes
  drawBulletHoles(ctx, W, H)

  // ── BORDER LUAR ──────────────────────────────────────────────
  ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 5
  ctx.strokeRect(12, 12, W - 24, H - 24)
  ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 2
  ctx.strokeRect(18, 18, W - 36, H - 36)

  // ── HEADER WANTED ────────────────────────────────────────────
  ctx.fillStyle = '#FFD700'
  ctx.font = `bold 88px "Bangers", cursive`
  ctx.textAlign = 'center'
  ctx.letterSpacing = '8px'
  // Shadow teks
  ctx.shadowColor = '#8B0000'; ctx.shadowBlur = 12; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 4
  ctx.fillText('DICARI!', W / 2, 92)
  ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0

  // Subheader
  ctx.fillStyle = '#fff'
  ctx.font = '13px "Share Tech Mono", monospace'
  ctx.fillText('AGEN WEAPON X - DIVISI MERCENARY BERBAYAR', W / 2, 112)

  // ── DIVIDER TOP ───────────────────────────────────────────────
  ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(28, 122); ctx.lineTo(W - 28, 122); ctx.stroke()
  ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(28, 126); ctx.lineTo(W - 28, 126); ctx.stroke()

  // ── DEADPOOL MASK ─────────────────────────────────────────────
  drawDeadpoolMask(ctx, W / 2, 230, 110)

  // ── NAMA JABATAN ──────────────────────────────────────────────
  const titleY = 330
  ctx.fillStyle = '#fff'
  ctx.font = `bold 34px "Bangers", cursive`
  ctx.textAlign = 'center'
  ctx.shadowColor = '#000'; ctx.shadowBlur = 8
  ctx.fillText((namaJabatan || 'POSISI BELUM DIISI').toUpperCase(), W / 2, titleY)
  ctx.shadowBlur = 0

  // Alias kode
  ctx.fillStyle = '#FFD700'
  ctx.font = `italic 14px "Special Elite", serif`
  ctx.fillText(`"${aliasKode || 'NAMA RAHASIA'}"`, W / 2, titleY + 24)

  // Urgensi stamp
  drawUrgensiStamp(ctx, W * 0.82, 210, urgensi)

  // ── DIVIDER ───────────────────────────────────────────────────
  ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(28, 372); ctx.lineTo(W - 28, 372); ctx.stroke()

  // ── BOX BAYARAN & INFO ────────────────────────────────────────
  fillRoundRect(ctx, 28, 380, W - 56, 88, 3, 'rgba(0,0,0,0.6)')
  strokeRoundRect(ctx, 28, 380, W - 56, 88, 3, '#FFD700', 1.5)

  // Bayaran
  ctx.fillStyle = '#aaa'
  ctx.font = '10px "Share Tech Mono", monospace'
  ctx.textAlign = 'left'
  ctx.fillText('KOMPENSASI MISI', 42, 398)
  ctx.fillStyle = '#FFD700'
  ctx.font = `bold 32px "Oswald", sans-serif`
  ctx.fillText(`Rp ${Number(bayaran || 0).toLocaleString('id-ID')}`, 42, 432)
  ctx.fillStyle = '#777'
  ctx.font = '11px "Share Tech Mono"'
  ctx.fillText('/ per misi · negosiasi tersedia', 42, 450)

  // Kanan: lokasi & durasi
  ctx.textAlign = 'right'
  ctx.fillStyle = '#aaa'; ctx.font = '10px "Share Tech Mono"'
  ctx.fillText('LOKASI OPERASI', W - 42, 398)
  ctx.fillStyle = '#fff'; ctx.font = 'bold 13px "Oswald"'
  ctx.fillText(lokasi || '-', W - 42, 418)
  ctx.fillStyle = '#aaa'; ctx.font = '10px "Share Tech Mono"'
  ctx.fillText('DURASI', W - 42, 436)
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px "Oswald"'
  ctx.fillText(durasi || '-', W - 42, 453)

  // ── TINGKAT BAHAYA ────────────────────────────────────────────
  const bahayaColors = { '1': '#1D9E75', '2': '#EF9F27', '3': '#E24B4A', '4': '#C41E2A' }
  const bahayaLabel = { '1': 'RENDAH', '2': 'SEDANG', '3': 'TINGGI', '4': 'EKSTRIM' }
  const bColor = bahayaColors[tingkatBahaya] || '#EF9F27'
  const bLabel = bahayaLabel[tingkatBahaya] || 'SEDANG'

  const barW = 14
  for (let i = 1; i <= 4; i++) {
    ctx.fillStyle = i <= (Number(tingkatBahaya) || 2) ? bColor : '#333'
    ctx.fillRect(W - 42 - (5 - i) * (barW + 4), 460, barW, 7)
  }
  ctx.fillStyle = bColor; ctx.font = '10px "Share Tech Mono"'
  ctx.textAlign = 'right'
  ctx.fillText(`BAHAYA: ${bLabel}`, W - 42, 475)

  // ── DIVIDER ───────────────────────────────────────────────────
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(28, 484); ctx.lineTo(W - 28, 484); ctx.stroke()

  // ── SKILLS ────────────────────────────────────────────────────
  ctx.fillStyle = '#FFD700'
  ctx.font = `bold 14px "Oswald"`
  ctx.textAlign = 'left'
  ctx.fillText('KEAHLIAN YANG DIBUTUHKAN:', 34, 502)

  const skillsToShow = (skills || []).slice(0, 10)
  const colW = (W - 56) / 2
  skillsToShow.forEach((sk, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const sx = 34 + col * colW
    const sy = 518 + row * 22

    // Bullet merah
    ctx.fillStyle = '#C41E2A'
    ctx.beginPath(); ctx.arc(sx + 6, sy - 4, 4, 0, Math.PI * 2); ctx.fill()

    ctx.fillStyle = '#ddd'
    ctx.font = '12px "Special Elite"'
    ctx.textAlign = 'left'
    ctx.fillText(sk, sx + 16, sy)
  })

  const skillsEndY = 522 + Math.ceil(skillsToShow.length / 2) * 22

  // ── DESKRIPSI ─────────────────────────────────────────────────
  if (deskripsi && deskripsi.trim()) {
    ctx.strokeStyle = '#222'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(28, skillsEndY + 6); ctx.lineTo(W - 28, skillsEndY + 6); ctx.stroke()
    ctx.fillStyle = '#999'; ctx.font = '10px "Share Tech Mono"'
    ctx.textAlign = 'left'
    ctx.fillText('KETERANGAN MISI:', 34, skillsEndY + 22)
    ctx.fillStyle = '#bbb'; ctx.font = '11px "Special Elite"'
    wrapText(ctx, deskripsi, 34, skillsEndY + 38, W - 68, 16, 3)
  }

  // ── DISCLAIMER ────────────────────────────────────────────────
  const discY = H - 76
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(28, discY - 8); ctx.lineTo(W - 28, discY - 8); ctx.stroke()

  ctx.fillStyle = '#444'; ctx.font = '9px "Share Tech Mono"'
  ctx.textAlign = 'center'
  ctx.fillText('PERINGATAN: Weapon X tidak bertanggung jawab atas kehilangan anggota tubuh,', W / 2, discY + 6)
  ctx.fillText('trauma psikologis, atau insiden chimichanga. Kemampuan regenerasi sangat dianjurkan.', W / 2, discY + 20)

  // ── FOOTER ───────────────────────────────────────────────────
  ctx.fillStyle = '#C41E2A'
  ctx.fillRect(0, H - 48, W, 48)
  ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(0, H - 48); ctx.lineTo(W, H - 48); ctx.stroke()

  ctx.fillStyle = '#FFD700'
  ctx.font = `bold 13px "Bangers"`
  ctx.textAlign = 'center'
  ctx.fillText('WEAPON X MERCENARY AGENCY  ·  BERDIRI SEJAK 1991  ·  "USAHA MAKSIMAL"', W / 2, H - 28)

  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.font = '9px "Share Tech Mono"'
  ctx.fillText('dibuat oleh Agus Satria Adhitama  |  github.com/agus-satria', W / 2, H - 12)

  // ── SCAN LINE EFFECT ──────────────────────────────────────────
  ctx.save()
  ctx.globalAlpha = 0.03
  for (let y = 0; y < H; y += 3) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, y, W, 1)
  }
  ctx.restore()
}

export function usePoster(canvasRef, data) {
  useEffect(() => {
    if (canvasRef.current) drawPoster(canvasRef.current, data)
  }, [canvasRef, data])
}
