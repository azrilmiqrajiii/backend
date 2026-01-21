const fs = require("fs");
const path = require("path");
const Kurikulum = require("../models/Kurikulum");

const unlinkSafe = (p) => {
  if (!p) return;
  const full = path.join(process.cwd(), p);
  if (fs.existsSync(full)) fs.unlinkSync(full);
};

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

  const parsedMatkul = JSON.parse(matkul);
  const existing = await Kurikulum.findOne({ prodi, tahun });

  if (existing) {
    existing.matkul.forEach((m) => {
      const stillUsed = parsedMatkul.find(
        (x) => x._id?.toString() === m._id.toString(),
      );
      if (!stillUsed && m.rps) unlinkSafe(m.rps);
    });

    if (removePdf === "1") {
      unlinkSafe(existing.pdf);
      existing.pdf = "";
    }

    if (req.files?.pdf) {
      unlinkSafe(existing.pdf);
      existing.pdf = `/uploads/kurikulum/${req.files.pdf[0].filename}`;
    }

    existing.matkul = parsedMatkul;
    await existing.save();
    return res.json(existing);
  }

  const payload = {
    prodi,
    tahun: Number(tahun),
    matkul: parsedMatkul,
    pdf: req.files?.pdf
      ? `/uploads/kurikulum/${req.files.pdf[0].filename}`
      : "",
  };

  const created = await Kurikulum.create(payload);
  res.json(created);
};

exports.uploadRps = async (req, res) => {
  const { prodi, matkulId } = req.params;
  const { tahun } = req.body;

  if (!req.file) return res.status(400).json({ message: "RPS wajib" });

  const data = await Kurikulum.findOne({ prodi, tahun });
  if (!data) return res.status(404).json({ message: "Kurikulum tidak ada" });

  const matkul = data.matkul.id(matkulId);
  if (!matkul)
    return res.status(404).json({ message: "Matkul tidak ditemukan" });

  unlinkSafe(matkul.rps);

  matkul.rps = `/uploads/rps/${req.file.filename}`;
  await data.save();

  res.json({ rps: matkul.rps });
};

exports.removeRps = async (req, res) => {
  const { prodi, matkulId, tahun } = req.params;

  const data = await Kurikulum.findOne({ prodi, tahun });
  if (!data) return res.status(404).json({ message: "Kurikulum tidak ada" });

  const matkul = data.matkul.id(matkulId);
  if (!matkul)
    return res.status(404).json({ message: "Matkul tidak ditemukan" });

  unlinkSafe(matkul.rps);
  matkul.rps = "";
  await data.save();

  res.json({ success: true });
};
