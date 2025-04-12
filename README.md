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

1. Build aplikasi:
   ```bash
   npm run build
   ```

2. Jalankan server:
   ```bash
   npm run serve
   ```

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
