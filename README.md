# Berita Kita

Berita Kita adalah portal berita berbasis AdonisJS dengan antarmuka Inertia React. Aplikasi ini menyediakan:

- Daftar dan login pengguna.
- Pembacaan artikel berita berdasarkan kategori.
- Pemberian rating artikel oleh pengguna yang sudah login.
- Daftar artikel trending berdasarkan rata-rata rating tertinggi.
- Panel admin untuk mengelola artikel dan kategori.
- Role `user` dan `admin`.

Pengguna baru otomatis mendapatkan role `user`. Akun dengan alamat email berakhiran `@example.com` dapat dipromosikan menjadi admin melalui migrasi database.

## Teknologi

- AdonisJS 7
- Inertia.js dan React
- TypeScript
- MySQL
- Lucid ORM
- Vite

## Prasyarat

Pastikan perangkat sudah memiliki:

- Node.js versi 24 atau lebih baru.
- npm.
- MySQL Server yang sedang berjalan.
- Git, jika repository diambil dari version control.

## Instalasi

1. Masuk ke folder project:

   ```bash
   cd adonisjs-app
   ```

2. Install dependency:

   ```bash
   npm install
   ```

3. Buat file environment dari template:

   ```bash
   cp .env.example .env
   ```

   Pada Windows PowerShell, gunakan:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Isi konfigurasi database di file `.env`:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_DATABASE=news_portal
   ```

   Sesuaikan `DB_USER` dan `DB_PASSWORD` dengan konfigurasi MySQL lokal.

5. Buat database MySQL jika belum tersedia:

   ```sql
   CREATE DATABASE news_portal;
   ```

6. Pastikan `APP_KEY` tersedia di `.env`. Jika belum ada, buat dengan perintah:

   ```bash
   node ace generate:key
   ```

## Menyiapkan Database

Jalankan migrasi untuk membuat tabel aplikasi:

```bash
node ace migration:run
```

Untuk mengisi data contoh, kategori, artikel, dan akun admin:

```bash
node ace db:seed
```

Seeder membuat akun admin berikut:

```text
Email    : admin@example.com
Password : password
```

Segera ganti password akun tersebut untuk penggunaan di luar development.

Migrasi juga akan mengubah akun lama dengan email berakhiran `@example.com` menjadi admin. Jangan gunakan pola email tersebut untuk akun pengguna biasa jika tidak ingin akun itu memiliki akses admin.

## Menjalankan Aplikasi

### Development

Jalankan server dengan hot reload:

```bash
npm run dev
```

Buka aplikasi di browser:

```text
http://localhost:3333
```

### Production

Build aplikasi terlebih dahulu:

```bash
npm run build
```

Jalankan hasil build:

```bash
npm start
```

## Script NPM

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server development dengan HMR |
| `npm run build` | Membuat build production |
| `npm start` | Menjalankan build production |
| `npm run typecheck` | Memeriksa tipe TypeScript aplikasi dan Inertia |
| `npm run lint` | Menjalankan ESLint |
| `npm test` | Menjalankan test suite AdonisJS |
| `npm run format` | Memformat file dengan Prettier |

## Hak Akses

- **User**: membaca artikel dan memberi rating artikel setelah login.
- **Admin**: mengakses dashboard serta membuat, mengubah, menerbitkan, dan menghapus artikel dan kategori.

Akses admin dilindungi di server melalui middleware, sehingga menyembunyikan menu saja tidak cukup untuk memperoleh akses.

## Struktur Direktori Utama

```text
app/                 Controller, model, middleware, validator, dan service backend
database/             Migration dan seeder database
inertia/              Halaman dan komponen React Inertia
config/               Konfigurasi aplikasi dan database
public/               Asset publik dan upload
start/                Route, middleware kernel, dan konfigurasi environment
resources/views/      Template view server
```

## Pemeriksaan Sebelum Commit

Jalankan pemeriksaan berikut sebelum mengirim perubahan:

```bash
npm run typecheck
npm run lint
npm test
```
