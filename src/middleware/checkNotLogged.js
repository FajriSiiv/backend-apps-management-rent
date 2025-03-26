import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkNotLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.status(400).json({ message: "Anda sudah login" });
    } catch (error) {
      next();
    }
  } else {
    next();
  }
};

export default checkNotLoggedIn;
