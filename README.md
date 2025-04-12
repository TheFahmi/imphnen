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
- Supabase (untuk database dan autentikasi)

## Cara Menjalankan

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup Supabase (lihat bagian di bawah)
4. Copy `.env.local.example` ke `.env.local` dan isi dengan kredensial Supabase Anda
5. Jalankan server development:
   ```bash
   npm run dev
   ```
6. Buka [http://localhost:3000](http://localhost:3000) di browser Anda

## Setup Supabase

1. Buat akun di [Supabase](https://supabase.com/)
2. Buat project baru
3. Dapatkan URL dan anon key dari Settings > API
4. Buat tabel `visitors` dengan struktur berikut:

```sql
CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  visitor_id TEXT UNIQUE NOT NULL,
  first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  visit_count INTEGER DEFAULT 1
);

-- Indeks untuk mempercepat query
CREATE INDEX idx_visitors_visitor_id ON visitors(visitor_id);
CREATE INDEX idx_visitors_last_visit ON visitors(last_visit);
```

5. Tambahkan Row Level Security (RLS) untuk keamanan:

```sql
-- Aktifkan RLS
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Buat kebijakan untuk membaca data
CREATE POLICY "Allow anonymous read access" ON visitors FOR SELECT USING (true);

-- Buat kebijakan untuk menulis data (hanya untuk service role)
CREATE POLICY "Allow service role to insert/update" ON visitors FOR ALL USING (auth.role() = 'service_role');
```

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
2. **Supabase Database**: Menyimpan data pengunjung secara persisten
3. **API Endpoints**: Menangani penghitungan dan pembaruan pengunjung
4. **Heartbeat**: Memperbarui status online pengunjung secara berkala

Ini memungkinkan penghitungan pengunjung yang akurat dan statistik real-time.
