# Aplikasi Manajemen Kos/Kontrakan

## 📌 Deskripsi Proyek

Aplikasi ini adalah sistem manajemen kos/kontrakan berbasis web yang memungkinkan pemilik kos untuk mengelola properti mereka dan penyewa untuk memesan serta membayar sewa secara online.

## 🚀 Teknologi yang Digunakan

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Autentikasi:** JWT, Bcrypt, CSRF Token

## ⚙️ Instalasi & Menjalankan Proyek

1. **Clone repository:**

   ```bash
   git clone https://github.com/FajriSiiv/backend-apps-management-rent.git
   cd nama-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Buat file `.env` dan isi dengan konfigurasi berikut:**

   ```env
   PORT=5000
   DB_NAME=your_dataase_name
   DB_USER=user_mysql
   DB_PASSWORD=password_mysql
   DB_HOST=localhost
   DB_PORT=db_port
   JWT_SECRET=jwt_secret
   CSRF_SECRET=your_csrf_secret
   ```

4. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```

## 📌 Fitur Utama

### 1️⃣ Autentikasi & Manajemen Pengguna

- Register, Login, Logout
- Middleware JWT untuk proteksi endpoint
- Role-based access control (Admin & Penyewa)
- Proteksi CSRF Token untuk endpoint login/logout

### 2️⃣ Manajemen Kos

[✅] Tambah Kos → Pemilik bisa menambah kos baru.

[✅] Lihat Daftar Kos → Penyewa bisa melihat semua kos.

[✅] Detail Kos → Penyewa bisa melihat informasi kos tertentu.

[✅] Hapus Kos → Menghapus kos tertentu.

### 3️⃣ Booking & Pembayaran

[✅] Booking Kamar → Penyewa bisa memesan kamar.

[✅] Cek Status Booking → Lihat apakah booking sudah dikonfirmasi.

[✅] Batal Booking → Penyewa bisa membatalkan booking sebelum pembayaran.

### 4️⃣ Fitur Pembayaran

[✅] Buat Pembayaran → Penyewa membayar sewa kamar.

[✅] Cek Riwayat Pembayaran → Melihat semua pembayaran yang sudah dilakukan.

## 📮 API Endpoint && Documentation route

Dokumentasi API lengkap tersedia di sini:  
👉 [Lihat Dokumentasi API](./doc.api.md)

## 🤝 Kontribusi

Silakan buat pull request atau buka issue jika ingin menambahkan fitur baru atau melaporkan bug.

## 📜 Lisensi

Proyek ini menggunakan lisensi **MIT**.
