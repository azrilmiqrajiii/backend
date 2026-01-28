const fs = require("fs");
const path = require("path");
const Model = require("../models/WaktuTungguLulusan");

const unlinkSafe = (p) => {
  if (!p) return;
  const full = path.join(process.cwd(), p);
  if (fs.existsSync(full)) fs.unlinkSync(full);
};

exports.get = async (req, res) => {
  const { prodi, tahun } = req.params;
  const data = await Model.findOne({ prodi, tahun });

  if (!data) return res.json(null);

  const base = `${req.protocol}://${req.get("host")}`;
  res.json({
    ...data.toObject(),
    file: data.file ? base + data.file : null,
  });
};

exports.save = async (req, res) => {
  try {
    const { prodi } = req.params;
    const { tahun, rows } = req.body;

    if (!tahun || !rows)
      return res.status(400).json({ message: "Tahun dan rows wajib" });

    const parsedRows = JSON.parse(rows);
    const existing = await Model.findOne({ prodi, tahun });

    if (existing) {
      if (req.file) {
        unlinkSafe(existing.file);
        existing.file = `/uploads/tracer-study/${req.file.filename}`;
      }

      existing.rows = parsedRows;
      await existing.save();
      return res.json(existing);
    }

    const created = await Model.create({
      prodi,
      tahun,
      rows: parsedRows,
      file: req.file ? `/uploads/tracer-study/${req.file.filename}` : "",
    });

    res.json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
