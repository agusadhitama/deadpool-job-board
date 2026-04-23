# Deadpool Job Board

> **Generator Poster Lowongan Kerja Mercenary** buat poster kontrak bergaya Deadpool / Marvel, download PNG, bagikan ke mana saja.

**Dibuat oleh: Agus Satria Adhitama**

---

## Fitur

- Poster bergaya komik Marvel Deadpool yang digambar lewat Canvas API
- Form interaktif poster update real time saat form diisi
- Pilihan skill, lokasi, tingkat bahaya, urgensi misi
- Download hasil sebagai PNG atau JPG (560×820px, cocok untuk Instagram)
- 100% berjalan di browser tidak ada data yang dikirim ke server
- Siap deploy ke GitHub Pages dengan satu perintah

---

## Cara Menjalankan Lokal

```bash
# 1. Clone repo
git clone https://github.com/agusadhitama/deadpool-job-board.git
cd deadpool-job-board

# 2. Install dependensi
npm install

# 3. Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` di browser.

---

## Struktur Project

```
deadpool-job-board/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx         ← Header & ticker berjalan
│   │   ├── Header.module.css
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── FormPanel.jsx      ← Form input kiri
│   │   ├── FormPanel.module.css
│   │   ├── PosterCanvas.jsx   ← Canvas preview + tombol download
│   │   └── PosterCanvas.module.css
│   ├── hooks/
│   │   └── usePoster.js       ← Semua logika Canvas API ada di sini
│   ├── data/
│   │   └── options.js         ← Data pilihan form
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css              ← Global styles & CSS variables
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Teknologi

- **React 18** + **Vite 5**
- **Canvas API** semua gambar poster dibuat programatik, tidak ada gambar eksternal
- **CSS Modules** styling scoped per komponen
- **Google Fonts**: Bangers, Special Elite, Oswald, Share Tech Mono
- **gh-pages** deploy ke GitHub Pages

---

## Cara Kustomisasi Poster

Semua logika gambar poster ada di `src/hooks/usePoster.js`. Kamu bisa:

- Ubah warna di bagian `// BACKGROUND` dan variabel warna
- Tambah elemen baru dengan Canvas API (`ctx.fillRect`, `ctx.fillText`, dll)
- Ganti font dengan mengubah nama font di baris `ctx.font = '...'`
- Tambah pilihan di `src/data/options.js`

---

*"Usaha Maksimal." - Wade Wilson*

*© 2026 Agus Satria Adhitama*
