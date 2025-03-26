import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import User from "../model/users.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const getUsers = async (req, res) => {
  try {
    const users = User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimum 5 request
  message: "Terlalu banyak percobaan login, coba lagi nanti.",
});

export const registerUser = async (req, res) => {
  const { username, password, name, role } = req.body;

  // Validasi input
  if (!username || !password || !name) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  if (password.length < 3) {
    return res.status(400).json({ message: "Password harus minimal 3 karakter" });
  }

  try {
    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    await User.create({
      username,
      password: hashedPassword,
      name,
      role: role || "user", // Default ke "user" jika tidak diisi
    });

    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Simpan token di cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.json({ message: "Login berhasil" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// LOGOUT USER
export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.clearCookie("_csrf", { httpOnly: true, secure: true, sameSite: "Strict" });

  console.log("Cookies setelah logout:", req.cookies);

  res.json({ message: "Logout berhasil" });
};


export const verifyRoute = async (req, res) => {
  const token = req.cookies.token;


  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};

export const validateRegister = [
  body("username").notEmpty().withMessage("Username wajib diisi"),
  body("password").isLength({ min: 3 }).withMessage("Password minimal 3 karakter"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { loginLimiter };
