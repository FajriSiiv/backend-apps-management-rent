# Aplikasi Manajemen Kos/Kontrakan

## 📌 Deskripsi Proyek

Aplikasi ini adalah sistem manajemen kos/kontrakan berbasis web yang memungkinkan pemilik kos untuk mengelola properti mereka dan penyewa untuk memesan serta membayar sewa secara online.

## 🚀 Teknologi yang Digunakan

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Autentikasi:** JWT, Bcrypt, CSRF Token
- **Pembayaran:** Midtrans / Xendit
- **Notifikasi:** Nodemailer, Twilio / WhatsApp API
- **Scheduler:** Node-cron

## 📂 Struktur Direktori

```
📦 project-root
├── 📂 src
│   ├── 📂 controllers  # Logika bisnis API
│   ├── 📂 models       # Model database
│   ├── 📂 routes       # Definisi endpoint API
│   ├── 📂 middlewares  # Middleware untuk autentikasi & validasi
│   ├── 📂 utils        # Helper function
│   ├── server.js       # Entry point aplikasi
├── 📜 .env             # Konfigurasi environment
├── 📜 package.json     # Konfigurasi proyek
└── 📜 README.md        # Dokumentasi proyek
```

## ⚙️ Instalasi & Menjalankan Proyek

1. **Clone repository:**

   ```bash
   git clone https://github.com/username/nama-repo.git
   cd nama-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Buat file `.env` dan isi dengan konfigurasi berikut:**

   ```env
   PORT=5000
   DATABASE_URL=mysql://user:password@localhost:3306/nama_db
   JWT_SECRET=your_secret_key
   CSRF_SECRET=your_csrf_secret
   MIDTRANS_API_KEY=your_midtrans_key
   EMAIL_SERVICE=your_email_service
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

### 2️⃣ Manajemen Kos & Kamar

- Pemilik kos dapat menambah, mengedit, dan menghapus properti kos
- Penyewa dapat melihat daftar kos & detail kamar

### 3️⃣ Booking & Pembayaran

- Penyewa dapat memesan kamar
- Pembayaran otomatis dengan Midtrans/Xendit
- Status booking (pending, diterima, ditolak)

### 4️⃣ Notifikasi & Reminder Pembayaran

- Email & WhatsApp reminder untuk jatuh tempo pembayaran
- Notifikasi real-time untuk pemilik kos

## 📮 API Endpoint

### **1. Autentikasi**

| Method | Endpoint             | Deskripsi                                  |
| ------ | -------------------- | ------------------------------------------ |
| POST   | `/api/auth/register` | Register pengguna                          |
| POST   | `/api/auth/login`    | Login pengguna dengan proteksi CSRF Token  |
| POST   | `/api/auth/logout`   | Logout pengguna dengan proteksi CSRF Token |
| GET    | `/api/auth/me`       | Ambil data pengguna saat ini               |

### **2. Manajemen Kos**

| Method | Endpoint       | Deskripsi        |
| ------ | -------------- | ---------------- |
| POST   | `/api/kos`     | Tambah kos baru  |
| GET    | `/api/kos`     | Ambil daftar kos |
| GET    | `/api/kos/:id` | Ambil detail kos |

### **3. Booking & Pembayaran**

| Method | Endpoint       | Deskripsi             |
| ------ | -------------- | --------------------- |
| POST   | `/api/booking` | Penyewa memesan kamar |
| GET    | `/api/booking` | Lihat daftar penyewa  |
| POST   | `/api/payment` | Pembayaran sewa       |

## 💡 Pengembangan Selanjutnya

- ✅ Chat antara pemilik kos & penyewa
- ✅ Sistem rating & ulasan kos
- ✅ Integrasi Google Maps untuk lokasi kos

## 🤝 Kontribusi

Silakan buat pull request atau buka issue jika ingin menambahkan fitur baru atau melaporkan bug.

## 📜 Lisensi

Proyek ini menggunakan lisensi **MIT**.
