import Booking from "../model/booking.js";
import Kos from "../model/kos.js";
import User from "../model/users.js";

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();

    res.status(200).json({ data: bookings })
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil semua data", error: error.message });

  }
}

export const bookingKos = async (req, res) => {
  try {
    const { kos_id, start_date, end_date } = req.body;
    const user_id = req.user.id;

    const kos = await Kos.findByPk(kos_id);
    const paidBookings = await Booking.count({
      where: {
        kos_id: kos_id,
        status: "paid"
      }
    });

    if (!kos) {
      return res.status(404).json({ message: "Kos tidak ditemukan" });
    }

    if (!kos.available) {
      return res.status(400).json({ message: "Kos ini sudah penuh atau tidak tersedia" });
    }

    const remainingRooms = kos.max_room - paidBookings;

    if (remainingRooms <= 0) {
      return res.status(400).json({ message: "Kos ini sudah penuh" });
    }

    // const existingBooking = await Booking.findOne({
    //   where: {
    //     kos_id,
    //     start_date: { $lte: end_date },
    //     end_date: { $gte: start_date },
    //   },
    // });

    // if (existingBooking) {
    //   return res.status(400).json({ message: "Kos sudah dipesan pada tanggal tersebut" });
    // }

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


export const cancelBooking = async (req, res) => {
  try {
    const { idBooking } = req.params;
    const user_id = req.user.id;

    const booking = await Booking.findByPk(idBooking, { include: Kos });
    const kos = await Kos.findByPk(booking.kos_id, { include: User });

    if (!booking) {
      return res.status(404).json({ message: "Booking tidak ditemukan" });
    }

    if (booking.user_id !== user_id && kos.User.role !== 'owner') {
      return res.status(403).json({ message: "Anda tidak berhak membatalkan booking ini" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Booking sudah dibayar atau sudah dibatalkan" });
    }

    await booking.destroy();

    res.status(200).json({ message: "Booking berhasil dibatalkan" });
  } catch (error) {
    res.status(500).json({ message: "Gagal membatalkan booking", error: error.message });
  }
};


export const updateBooking = async (req, res) => {
  try {
    const { idBooking } = req.params;
    const owner_id = req.user.id;
    const { status } = req.body;

    const booking = await Booking.findByPk(idBooking, { include: Kos });
    const paidBookings = await Booking.count({
      where: {
        kos_id: booking.kos_id,
        status: "paid"
      }
    });
    const kos = await Kos.findByPk(booking.kos_id);


    if (!booking) {
      return res.status(404).json({ message: "Booking tidak ditemukan" });
    }

    if (req.user.role !== 'owner') {
      return res.status(404).json({ message: "Kamu bukanlah owner! Harus menjadi owner terlebih dahulu." });
    }

    if (booking.Ko.owner_id !== owner_id) {
      return res.status(403).json({ message: "Anda tidak memiliki kos ini" });
    }

    const remainingRooms = booking.Ko.max_room - paidBookings;

    if (remainingRooms <= 0) {
      await kos.update({ available: false });

      return res.status(400).json({ message: "Kos ini sudah penuh" });
    }

    if (status !== "paid" && status !== "pending" && status !== "canceled") {
      return res.status(403).json({ message: "Status booking harus 'paid','pending','canceled'" });
    }

    await booking.update({ status });

    res.status(200).json({ message: "Booking telah disetujui", booking });
  } catch (error) {
    res.status(500).json({ message: "Gagal menyetujui booking", error: error.message });
  }
};
