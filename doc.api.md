### **📌 Dokumentasi API - User Authentication**

**Base URL**: `https://url/api/v1`

## 🟢 **. GET CSRF TOKEN**

**Endpoint**: `GET /api/csrf-token`
**Deskripsi**: Mendapatkan CSRF Token.

```json
{
  "csrfToken": "token-csrf"
}
```

---

## 🟢 **1. Register User**

**Endpoint**: `POST /api/register`  
**Deskripsi**: Mendaftarkan pengguna baru.

### **Request**

**Headers**:

```yaml
Content-Type: application/json
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Body** (JSON):

```json
{
  "username": "user",
  "password": "user",
  "name": "John Doe1",
  "role": "tenant" // default "tenant" ENUM "admin" "owner"
}
```

### **Response**

✔ **200 OK** (Berhasil mendaftar)

```json
{
  "message": "User berhasil didaftarkan"
}
```

❌ **400 Bad Request** (Validasi username gagal)

```json
{
  "error": "Username sudah terdaftar"
}
```

❌ **400 Bad Request** (Validasi username & password jika tidak ada)

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Username wajib diisi",
      "path": "username",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password minimal 3 karakter",
      "path": "password",
      "location": "body"
    }
  ]
}
```

---

## 🔵 **2. Login User**

**Endpoint**: `POST /login`  
**Deskripsi**: Autentikasi pengguna dan mengembalikan token.

### **Request**

**Headers**:

```yaml
Content-Type: application/json
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

**Body** (JSON):

```json
{
  "username": "user",
  "password": "user"
}
```

### **Response**

✔ **200 OK** (Login berhasil)

```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

❌ **401 Unauthorized** (Gagal login)

```json
{
  "error": "Email atau password salah"
}
```

---

## 🟠 **3. Get User Profile**

**Endpoint**: `GET /me`  
**Deskripsi**: Mengambil data pengguna yang sedang login.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
# Bearer Token: jwt-token
```

### **Response**

✔ **200 OK** (Berhasil mendapatkan data)

```json
{
  "user": {
    "id": 3,
    "username": "user",
    "role": "tenant",
    "iat": 1742995591,
    "exp": 1742999191
  }
}
```

❌ **401 Unauthorized** (Token tidak valid atau tidak ada)

```json
{
  "error": "Unauthorized"
}
```

---

## 🔴 **4. Logout User**

**Endpoint**: `POST /logout`  
**Deskripsi**: Menghapus token dan mengakhiri sesi login.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Response**

✔ **200 OK** (Logout berhasil)

```json
{
  "message": "Logout berhasil"
}
```

❌ **401 Unauthorized** (Belum login)

```json
{
  "error": "Unauthorized"
}
```

## 🔴 **5. GET Kos**

**Endpoint**: `GET /kos`  
**Deskripsi**: Mendapatkan data kos.

### **Request**

**Headers**:

<!-- ```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
``` -->

### **Response**

✔ **200 OK**

```json
{
  "data": [
    {
      "id": 1,
      "owner_id": 3,
      "name": "Kos Sejahtera Update update",
      "address": "Jl. Merdeka No.10, Jakarta 123123",
      "price": "1500000.00",
      "facilities": ["WiFi", "AC", "Kasur", "Lemari"],
      "available": true,
      "max_room": 1,
      "createdAt": "2025-03-27T15:49:25.000Z",
      "updatedAt": "2025-03-27T15:49:54.000Z"
    }
  ]
}
```

❌ **400 Bad Internal Server**

```json
{
  "error": "Tidak dapat mendapatkan data kos"
}
```

## **6. GET Kos By ID**

**Endpoint**: `GET /kos`  
**Deskripsi**: Mendapatkan data kos by ID.

### **Request**

**Headers**:

<!-- ```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
``` -->

### **Response**

✔ **200 OK**

```json
{
  "data": {
    "id": 2,
    "owner_id": 3,
    "name": "Kos 2 BEkasih",
    "address": "Jl. Merdeka No.10, Jakarta 123123",
    "price": "1500000.00",
    "facilities": ["WiFi", "AC", "Kasur", "Lemari"],
    "available": true,
    "max_room": 5,
    "createdAt": "2025-03-27T15:49:38.000Z",
    "updatedAt": "2025-03-27T15:49:38.000Z"
  }
}
```

❌ **400 Bad Internal Server**

```json
{
  "error": "Tidak dapat mendapatkan data kos"
}
```

## **7. POST Kos**

**Endpoint**: `POS /kos`  
**Deskripsi**: Membuat data kos baru.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Body**

```json
{
  "name": "Kos 2 BEkasih asdasd",
  "address": "Jl. Merdeka No.10, Jakarta 123123",
  "price": 1500000,
  "facilities": ["WiFi", "AC", "Kasur", "Lemari"],
  "available": true,
  "max_room": 5
}
```

### **Response**

✔ **200 OK** (Berhasil membuat kos)

```json
{
  "message": "Kos berhasil ditambahkan",
  "kos": {
    "id": 5,
    "owner_id": 3,
    "name": "Kos 2 BEkasih asdasd",
    "address": "Jl. Merdeka No.10, Jakarta 123123",
    "price": 1500000,
    "facilities": ["WiFi", "AC", "Kasur", "Lemari"],
    "available": true,
    "max_room": 5,
    "updatedAt": "2025-03-27T15:56:54.891Z",
    "createdAt": "2025-03-27T15:56:54.891Z"
  }
}
```

❌ **404 Bad Request** (Validasi pemilik kos)

```json
{
  "error": "Owner tidak ditemukan"
}
```

❌ **404 Bad Request** (Validasi pembuat adalah owner)

```json
{
  "error": "Kamu bukanlah owner! Harus menjadi owner terlebih dahulu."
}
```

❌ **404 Bad Request** (Jumlah kamar)

```json
{
  "error": "Jumlah kamar harus di isi!"
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Terjadi kesalahan server"
}
```

## **8. Update Kos By ID**

**Endpoint**: `PUT /kos/:idKos`  
**Deskripsi**: Update data kos.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Body**

```json
{
  "name": "Kos 2 BEkasih asdasd",
  "address": "Jl. Merdeka No.10, Jakarta 123123",
  "price": 1500000,
  "facilities": ["WiFi", "AC", "Kasur", "Lemari"],
  "available": true,
  "max_room": 5
}
```

### **Response**

✔ **200 OK** (Berhasil update kos)

```json
{
  "message": "Kos berhasil diperbarui",
  "kos": {
    "id": 1,
    "owner_id": 3,
    "name": "Kos Sejahtera Update update",
    "address": "Jl. Merdeka No.10, Jakarta 123123",
    "price": "1500000.00",
    "facilities": ["WiFi", "AC", "Kasur", "Lemari"],
    "available": true,
    "max_room": 1,
    "createdAt": "2025-03-27T15:49:25.000Z",
    "updatedAt": "2025-03-27T15:49:54.127Z"
  }
}
```

❌ **404 Bad Request** (Validasi adanya kos)

```json
{
  "error": "Kos tidak ditemukan"
}
```

❌ **404 Bad Request** (Cek apakah ada izin-nya role owner.id === kos.owner.id)

```json
{
  "error": "Anda tidak memiliki izin untuk mengupdate kos ini"
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Gagal memperbarui kos"
}
```

## **9. DELETE Kos By ID**

**Endpoint**: `DELETE /kos/:idKos`  
**Deskripsi**: DELETE data kos.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Response**

✔ **200 OK** (Berhasil delete kos)

```json
{
  "message": "Kos berhasil dihapus"
}
```

❌ **404 Bad Request** (Validasi adanya kos)

```json
{
  "error": "Kos tidak ditemukan"
}
```

❌ **404 Bad Request** (Cek apakah ada izin-nya role owner.id === kos.owner.id)

```json
{
  "error": "Anda tidak memiliki izin untuk mengupdate kos ini"
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Gagal menghapus kos"
}
```

## **10. GET Booking**

**Endpoint**: `GET /booking`  
**Deskripsi**: GET mengambil data booking.

### **Request**

<!-- **Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
``` -->

### **Response**

✔ **200 OK** (Berhasil mengambil data booking)

```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "kos_id": 1,
      "start_date": "2024-04-01T00:00:00.000Z",
      "end_date": "2024-04-30T00:00:00.000Z",
      "status": "paid",
      "createdAt": "2025-03-27T15:51:08.000Z",
      "updatedAt": "2025-03-27T15:52:30.000Z"
    }
  ]
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Gagal mengambil semua data"
}
```

## **11. POST Booking**

**Endpoint**: `POS /booking`  
**Deskripsi**: Membuat data booking kos.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Body**

```json
{
  "kos_id": 4,
  "start_date": "2024-04-01",
  "end_date": "2024-04-30"
}
```

### **Response**

✔ **200 OK** (Berhasil membuat booking kos)

```json
{
  "message": "Booking berhasil",
  "booking": {
    "id": 20,
    "user_id": 3,
    "kos_id": 4,
    "start_date": "2024-04-01T00:00:00.000Z",
    "end_date": "2024-04-30T00:00:00.000Z",
    "status": "pending",
    "updatedAt": "2025-03-27T16:37:39.998Z",
    "createdAt": "2025-03-27T16:37:39.998Z"
  }
}
```

❌ **404 Bad Request** (Validasi adanya kos)

```json
{
  "error": "Kos tidak ditemukan"
}
```

❌ **404 Bad Request** (Validasi available kos)

```json
{
  "error": "Kos ini sudah penuh atau tidak tersedia"
}
```

❌ **404 Bad Request** (Validasi maximal kamar kos)

```json
{
  "error": "Kos ini sudah penuh"
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Gagal melakukan booking"
}
```

## **12. PUT Booking**

**Endpoint**: `PUT /booking/:idBooking/paid`  
**Deskripsi**: Melakukan pembayaran booking / mengubah status menjadi paid.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Body**

```json
{
  "status": "paid"
}
```

### **Response**

✔ **200 OK** (Berhasil meng-update status booking)

```json
{
  "message": "Booking telah disetujui",
  "booking": {
    "id": 20,
    "user_id": 3,
    "kos_id": 4,
    "start_date": "2024-04-01T00:00:00.000Z",
    "end_date": "2024-04-30T00:00:00.000Z",
    "status": "paid",
    "updatedAt": "2025-03-27T16:37:39.998Z",
    "createdAt": "2025-03-27T16:37:39.998Z"
  }
}
```

❌ **404 Bad Request** (Validasi booking)

```json
{
  "error": "Booking tidak ditemukan"
}
```

❌ **404 Bad Request** (Validasi role user owner kos)

```json
{
  "error": "Kamu bukanlah owner! Harus menjadi owner terlebih dahulu."
}
```

❌ **404 Bad Request** (Validasi user adalah pemilik kos)

```json
{
  "error": "Anda tidak memiliki kos ini"
}
```

❌ **404 Bad Request** (Validasi maximal kamar kos)

```json
{
  "error": "Kos ini sudah penuh"
}
```

❌ **404 Bad Request** (Validasi status kos "paid" "pending" "canceled")

```json
{
  "error": "Status booking harus 'paid','pending','canceled'"
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Gagal menyetujui booking"
}
```

## **13. DELETE Booking By ID**

**Endpoint**: `DELETE /booking/:idBooking`  
**Deskripsi**: DELETE data booking.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Response**

✔ **200 OK** (Berhasil booking kos)

```json
{
  "message": "Booking berhasil dibatalkan"
}
```

❌ **404 Bad Request** (Validasi booking)

```json
{
  "error": "Booking tidak ditemukan"
}
```

❌ **404 Bad Request** (Validasi jika status sudah pending)

```json
{
  "error": "Booking sudah dibayar atau sudah dibatalkan"
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Gagal membatalkan booking"
}
```

## **14. PUT Payment Booking by User**

**Endpoint**: `PUT /payment/:idBooking/paid`  
**Deskripsi**: Melakukan pembayaran booking / mengubah status menjadi paid dilakukan dari user/tenant/penyewa.

### **Request**

**Headers**:

```yaml
x-csrf-token: your csrf-token # From /api/csrf-token
```

**Auth**

```yaml
Auth: Bearer jwt-token
```

### **Body**

```json
{
  "status": "paid"
}
```

### **Response**

✔ **200 OK** (Berhasil meng-update status booking)

```json
{
  "message": "Pembayaran berhasil",
  "booking": {
    "id": 20,
    "user_id": 3,
    "kos_id": 4,
    "start_date": "2024-04-01T00:00:00.000Z",
    "end_date": "2024-04-30T00:00:00.000Z",
    "status": "paid",
    "updatedAt": "2025-03-27T16:37:39.998Z",
    "createdAt": "2025-03-27T16:37:39.998Z"
  }
}
```

❌ **404 Bad Request** (Validasi booking)

```json
{
  "error": "Booking tidak ditemukan"
}
```

❌ **404 Bad Request** (Validasi user/penyewa)

```json
{
  "error": "Anda tidak memesan kos ini"
}
```

❌ **404 Bad Request** (Validasi booking sudah di bayar)

```json
{
  "error": "Booking ini sudah di bayar"
}
```

❌ **500 Bad Request** (Error fetching to database)

```json
{
  "message": "Gagal melakukan pembayaran"
}
```
