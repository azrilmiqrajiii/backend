const fs = require("fs");
const path = require("path");
const Kurikulum = require("../models/Kurikulum");

exports.get = async (req, res) => {
  const { prodi, tahun } = req.params;
  const data = await Kurikulum.findOne({ prodi, tahun });

  if (!data) return res.json(null);

  const base = `${req.protocol}://${req.get("host")}`;

  res.json({
    ...data.toObject(),
    pdf: data.pdf ? base + data.pdf : "",
    matkul: data.matkul.map((m) => ({
      ...m.toObject(),
      rps: m.rps ? base + m.rps : "",
    })),
  });
};

exports.save = async (req, res) => {
  const { prodi } = req.params;
  const { tahun, matkul, removePdf } = req.body;

  const existing = await Kurikulum.findOne({ prodi, tahun: Number(tahun) });

  const payload = {
    prodi,
    tahun: Number(tahun),
    matkul: JSON.parse(matkul),
  };

  if (removePdf && existing?.pdf) {
    const filePath = path.join(process.cwd(), existing.pdf);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    payload.pdf = "";
  }

  if (req.files?.pdf) {
    payload.pdf = `/uploads/kurikulum/${req.files.pdf[0].filename}`;
  }

  const data = await Kurikulum.findOneAndUpdate(
    { prodi, tahun: payload.tahun },
    payload,
    { upsert: true, new: true },
  );

  res.json(data);
};

exports.uploadRps = async (req, res) => {
  const { prodi, index } = req.params;
  const { tahun } = req.body;

  if (!req.file) return res.status(400).json({ message: "RPS wajib" });

  const data = await Kurikulum.findOne({ prodi, tahun });
  if (!data) return res.status(404).json({ message: "Kurikulum tidak ada" });

  data.matkul[index].rps = `/uploads/rps/${req.file.filename}`;
  await data.save();

  res.json({ rps: data.matkul[index].rps });
};
