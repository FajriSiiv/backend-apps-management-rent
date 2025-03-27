import Booking from "../model/booking.js";
import Kos from "../model/kos.js";

export const bookingKos = async (req, res) => {
  try {
    const { kos_id, start_date, end_date } = req.body;
    const user_id = req.user.id; // Ambil ID user dari JWT

    // Cek apakah kos yang dipesan ada
    const kos = await Kos.findByPk(kos_id);
    if (!kos) {
      return res.status(404).json({ message: "Kos tidak ditemukan" });
    }

    // Cek apakah kos masih tersedia
    if (!kos.available) {
      return res.status(400).json({ message: "Kos ini sudah penuh atau tidak tersedia" });
    }

    // Cek apakah kos sudah dipesan dalam rentang tanggal yang dipilih
    const existingBooking = await Booking.findOne({
      where: {
        kos_id,
        start_date: { $lte: end_date }, // Mulai sebelum atau sama dengan end_date
        end_date: { $gte: start_date }, // Berakhir setelah atau sama dengan start_date
      },
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Kos sudah dipesan pada tanggal tersebut" });
    }

    // Buat booking baru dengan status pending
    const newBooking = await Booking.create({
      user_id,
      kos_id,
      start_date,
      end_date,
      status: "pending",
    });

    res.status(201).json({ message: "Booking berhasil", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Gagal melakukan booking", error: error.message });
  }
};
