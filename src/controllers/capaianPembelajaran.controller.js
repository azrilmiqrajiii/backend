const CapaianPembelajaran = require("../models/CapaianPembelajaran");

exports.list = async (req, res) => {
  try {
    const data = await CapaianPembelajaran.find({
      prodi: req.params.prodi,
    }).sort({ createdAt: 1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data" });
  }
};

exports.bulkSave = async (req, res) => {
  try {
    const { prodi } = req.params;
    const rows = Array.isArray(req.body) ? req.body : req.body.rows;

    if (!Array.isArray(rows)) {
      return res.status(400).json({ message: "Format data tidak valid" });
    }

    await CapaianPembelajaran.deleteMany({ prodi });

    const payload = rows.map((r) => ({
      prodi,
      tahunLulus: r.tahunLulus,
      jumlahLulusan: r.jumlahLulusan,
      masaStudi: r.masaStudi,
      ipkMin: r.ipkMin,
      ipkAvg: r.ipkAvg,
      ipkMax: r.ipkMax,
      skYudisium: r.skYudisium || "",
    }));

    await CapaianPembelajaran.insertMany(payload);

    res.json({ message: "Data berhasil disimpan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menyimpan data" });
  }
};

exports.uploadSk = async (req, res) => {
  try {
    const data = await CapaianPembelajaran.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    if (!req.file) {
      return res.status(400).json({ message: "File tidak ada" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    data.skYudisium = `/uploads/sk-yudisium/${req.file.filename}`;
    await data.save();

    res.json({
      skYudisium: baseUrl + data.skYudisium,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload SK gagal" });
  }
};

exports.remove = async (req, res) => {
  try {
    await CapaianPembelajaran.findByIdAndDelete(req.params.id);
    res.json({ message: "Data dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal hapus" });
  }
};
