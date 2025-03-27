import Kos from "../model/kos.js";
import User from "../model/users.js";

export const getAllKos = async (req, res) => {
  try {
    const allKos = await Kos.findAll();

    res.status(200).json({ data: allKos });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getKosById = async (req, res) => {
  const { id } = req.params;
  try {
    const kosByID = await Kos.findOne({
      where: {
        id: id
      }
    });

    res.status(200).json({ data: kosByID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateKosById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, price, facilities, available, max_room } = req.body;

    const kos = await Kos.findByPk(id);
    if (!kos) {
      return res.status(404).json({ message: "Kos tidak ditemukan" });
    }

    if (req.user.id !== kos.owner_id) {
      return res.status(403).json({ message: "Anda tidak memiliki izin untuk mengupdate kos ini" });
    }

    await kos.update({ name, address, price, facilities, available, max_room });

    res.status(200).json({ message: "Kos berhasil diperbarui", kos });

  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui kos", error: error.message });
  }
}

export const deleteKos = async (req, res) => {
  try {
    const { id } = req.params;

    const kos = await Kos.findByPk(id);
    if (!kos) {
      return res.status(404).json({ message: "Kos tidak ditemukan" });
    }

    if (req.user.id !== kos.owner_id) {
      return res.status(403).json({ message: "Anda tidak memiliki izin untuk menghapus kos ini" });
    }

    await kos.destroy();

    res.status(200).json({ message: "Kos berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus kos", error: error.message });
  }
};


export const addKos = async (req, res) => {
  try {
    const { name, address, price, facilities, available, max_room } = req.body;
    const userId = req.user.id;

    const owner = await User.findByPk(userId);
    if (!owner) {
      return res.status(404).json({ message: "Owner tidak ditemukan" });
    }

    if (owner.role !== 'owner') {
      return res.status(404).json({ message: "Kamu bukanlah owner! Harus menjadi owner terlebih dahulu." });
    }


    if (max_room === undefined) {
      return res.status(404).json({ message: "Jumlah kamar harus di isi!" });
    }


    const newKos = await Kos.create({
      owner_id: userId,
      name,
      address,
      price,
      facilities,
      available,
      max_room
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