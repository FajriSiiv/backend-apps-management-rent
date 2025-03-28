import Booking from "../model/booking.js";

export const createPayment = async (req, res) => {
  try {
    const { idBooking } = req.params;
    const user_id = req.user.id;

    const booking = await Booking.findByPk(idBooking);

    if (!booking) {
      return res.status(404).json({ message: "Booking tidak ditemukan" });
    }

    if (booking.user_id !== user_id) {
      return res.status(403).json({ message: "Anda tidak memesan kos ini" });
    }

    if (booking.status === "paid") {
      return res.status(400).json({ message: "Booking sudah dibayar" });
    }

    const detailBooking = await booking.update({ status: "paid" });

    res.status(201).json({ message: "Pembayaran berhasil", detailBooking });
  } catch (error) {
    res.status(500).json({ message: "Gagal melakukan pembayaran", error: error.message });
  }
};


