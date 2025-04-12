# IMPHNEN Website

Website resmi untuk komunitas IMPHNEN (Ingin Menjadi Programmer Handal Namun Enggan Ngoding).

## Fitur

- Desain retro 90s/2000s
- Penghitung pengunjung real-time
- Statistik pengunjung
- Tampilan pengguna online
- Responsif untuk mobile dan desktop

## Teknologi

- Next.js
- TypeScript
- Tailwind CSS
- File-based JSON storage

## Cara Menjalankan

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat direktori `data` di root project (jika belum ada)
4. Jalankan server development:
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda

## Penyimpanan Data

Website ini menggunakan penyimpanan berbasis file JSON untuk menyimpan data pengunjung. Data disimpan di direktori `data` di root project.

## Deployment

### Manual Deployment

1. Build aplikasi:
   ```bash
   npm run build
   ```

2. Jalankan server:
   ```bash
   npm run serve
   ```

### Auto-Deploy dengan Vercel

Proyek ini dikonfigurasi untuk auto-deploy ke Vercel. Setiap kali ada push ke branch utama di GitHub, Vercel akan otomatis men-deploy versi terbaru.

1. Fork atau clone repository ini ke GitHub Anda
2. Buat akun di [Vercel](https://vercel.com) jika belum memilikinya
3. Di dashboard Vercel, klik "New Project"
4. Import repository GitHub Anda
5. Vercel akan otomatis mendeteksi konfigurasi Next.js
6. Klik "Deploy"

Setelah deployment awal, setiap push ke branch utama akan memicu deployment otomatis.

Untuk instruksi lebih detail, lihat [DEPLOYMENT.md](./DEPLOYMENT.md).

## Struktur Proyek

- `src/app` - Halaman Next.js
- `src/components` - Komponen React
- `src/lib` - Utilitas dan konfigurasi
- `public` - Aset statis

## Penghitung Pengunjung

Sistem penghitung pengunjung menggunakan kombinasi dari:

1. **Client-side Storage**: Menyimpan ID pengunjung unik di localStorage
2. **File-based JSON Storage**: Menyimpan data pengunjung secara persisten dalam file JSON
3. **API Endpoints**: Menangani penghitungan dan pembaruan pengunjung
4. **Heartbeat**: Memperbarui status online pengunjung secara berkala

Ini memungkinkan penghitungan pengunjung yang akurat dan statistik real-time.
