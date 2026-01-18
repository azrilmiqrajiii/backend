const Kurikulum = require("../models/Kurikulum");

exports.get = async (req, res) => {
  const { prodi, tahun } = req.params;
  const data = await Kurikulum.findOne({ prodi, tahun });
  res.json(data);
};

exports.save = async (req, res) => {
  try {
    const { prodi } = req.params;

    const tahun = req.body.tahun;
    const matkulRaw = req.body.matkul || "[]";

    const payload = {
      prodi,
      tahun,
      matkul: JSON.parse(matkulRaw),
    };

    if (req.file) {
      payload.file = `/uploads/kurikulum/${req.file.filename}`;
    }

    const data = await Kurikulum.findOneAndUpdate({ prodi, tahun }, payload, {
      upsert: true,
      new: true,
    });

    res.json(data);
  } catch (err) {
    console.error("KURIKULUM SAVE ERROR:", err);
    res.status(500).json({ message: "Gagal menyimpan kurikulum" });
  }
};
