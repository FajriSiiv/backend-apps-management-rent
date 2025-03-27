import express from "express";
import router from "./router/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import csrfMiddleware from "./middleware/csrf.js";

import User from "./model/users.js";
import Kos from "./model/kos.js";
import Booking from "./model/booking.js";
import Payment from "./model/payment.js";

dotenv.config();

const syncDatabase = async () => {
  try {
    await db.sync({
      alter: true
      // force: true

    });
    console.log("Database & tabel telah sinkron!");
  } catch (error) {
    console.error("Gagal sinkronisasi database:", error);
  }
};
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(csrfMiddleware);



app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(router);

syncDatabase()
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
