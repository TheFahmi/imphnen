# Panduan Deployment IMPHNEN Website

Dokumen ini berisi instruksi detail untuk men-deploy IMPHNEN Website ke Vercel dengan auto-deployment.

## Persiapan

1. Pastikan Anda memiliki akun GitHub dan repository untuk proyek ini
2. Buat akun di [Vercel](https://vercel.com) jika belum memilikinya

## Setup Vercel

### Langkah 1: Hubungkan Repository GitHub

1. Login ke dashboard Vercel
2. Klik "New Project"
3. Import repository GitHub Anda
4. Pilih repository IMPHNEN

### Langkah 2: Konfigurasi Project

1. Vercel akan otomatis mendeteksi bahwa ini adalah proyek Next.js
2. Pastikan pengaturan berikut:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. Klik "Deploy"

## Setup GitHub Actions (Opsional)

Untuk menggunakan GitHub Actions untuk deployment, Anda perlu menambahkan secrets berikut di repository GitHub Anda:

1. `VERCEL_TOKEN`: Token API Vercel Anda
   - Dapatkan dari [Vercel Account Settings](https://vercel.com/account/tokens)
   
2. `VERCEL_ORG_ID`: ID organisasi Vercel Anda
   - Dapatkan dari URL saat Anda berada di dashboard Vercel

3. `VERCEL_PROJECT_ID`: ID proyek Vercel Anda
   - Dapatkan dari pengaturan proyek di Vercel

### Cara Mendapatkan ID Organisasi dan Proyek

1. Deploy proyek secara manual terlebih dahulu ke Vercel
2. Instal Vercel CLI: `npm i -g vercel`
3. Jalankan: `vercel link`
4. Lihat file `.vercel/project.json` yang dibuat, di sana akan ada `orgId` dan `projectId`

## Cara Kerja Auto-Deployment

1. Setiap kali Anda push ke branch utama (main/master), GitHub Actions akan memicu workflow
2. Workflow akan menjalankan linting dan build untuk memastikan tidak ada error
3. Jika semua langkah berhasil, kode akan di-deploy ke Vercel

## Troubleshooting

### Masalah dengan Direktori Data

Jika Anda mengalami masalah dengan direktori `data` yang tidak ada:

1. Pastikan script `postinstall` dijalankan: `"postinstall": "mkdir -p data"`
2. Jika menggunakan Windows, ganti dengan: `"postinstall": "if not exist data mkdir data"`

### Masalah dengan Deployment

Jika deployment gagal:

1. Periksa log build di Vercel Dashboard
2. Pastikan semua environment variables yang diperlukan sudah diatur
3. Periksa apakah ada error dalam kode yang mungkin tidak terdeteksi secara lokal

## Catatan Penting

- Vercel gratis memiliki batasan, termasuk jumlah deployment per hari
- Untuk penyimpanan data persisten, pertimbangkan untuk menggunakan database eksternal daripada file JSON lokal
- Untuk produksi, sebaiknya gunakan layanan database seperti MongoDB Atlas atau Supabase
