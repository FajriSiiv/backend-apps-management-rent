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
