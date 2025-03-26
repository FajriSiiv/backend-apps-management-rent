import Kos from "../model/kos.js";
import User from "../model/users.js";

export const addKos = async (req, res) => {
  try {
    const { name, address, price, facilities, available } = req.body;
    const userId = req.user.id;

    // Cek apakah user(pemilik kos) ada
    const owner = await User.findByPk(userId);
    if (!owner) {
      return res.status(404).json({ message: "Owner tidak ditemukan" });
    }

    if (owner.role !== 'owner') {
      return res.status(404).json({ message: "Kamu bukanlah owner! Harus menjadi owner terlebih dahulu." });
    }

    // res.send({ owner_id, name })
    const newKos = await Kos.create({
      owner_id: userId,
      name,
      address,
      price,
      facilities,
      available,
    });


    res.status(201).json({
      message: "Kos berhasil ditambahkan",
      kos: newKos,
    });
  } catch (error) {
    console.error("Error saat menambahkan kos:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}