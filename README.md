# ☠ Deadpool Job Board

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

## Deploy ke GitHub Pages

### Langkah 1 Ubah `homepage` di `package.json`
```json
"homepage": "https://agusadhitama.github.io/deadpool-job-board"
```

### Langkah 2 Ubah `base` di `vite.config.js`
```js
base: '/deadpool-job-board/',
```

### Langkah 3 Push ke GitHub
```bash
git init
git remote add origin https://github.com/agusadhitama/deadpool-job-board.git
git add .
git commit -m "initial commit: deadpool job board"
git push -u origin main
```

### Langkah 4 Deploy
```bash
npm run deploy
```

Perintah ini akan otomatis:
1. Build project (`npm run build`)
2. Push hasil build ke branch `gh-pages`

### Langkah 5 Aktifkan GitHub Pages
1. Buka repo di GitHub
2. Klik **Settings** → **Pages**
3. Source: pilih branch **`gh-pages`**, folder **`/ (root)`**
4. Klik **Save**

Tunggu 1–2 menit, lalu buka:
```
https://agusadhitama.github.io/deadpool-job-board
```

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
