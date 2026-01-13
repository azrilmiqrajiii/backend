const VisiMisi = require("../models/VisiMisi");

exports.get = async (req, res) => {
  const { prodi, tahun } = req.params;
  const data = await VisiMisi.findOne({ prodi, tahun });
  res.json(data);
};

exports.save = async (req, res) => {
  const { prodi } = req.params;
  const { visi, misi, tahun } = req.body;

  const payload = { prodi, tahun, visi, misi };

  if (req.file) payload.file = `/uploads/visi-misi/${req.file.filename}`;

  const data = await VisiMisi.findOneAndUpdate({ prodi, tahun }, payload, {
    upsert: true,
    new: true,
  });

  res.json(data);
};

exports.remove = async (req, res) => {
  await VisiMisi.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
