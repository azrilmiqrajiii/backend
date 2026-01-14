const VisiMisi = require("../models/VisiMisi");

exports.get = async (req, res) => {
  const { prodi, tahun } = req.params;
  const data = await VisiMisi.findOne({ prodi, tahun });

  if (!data) return res.json(null);

  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.get("host");
  const baseUrl = `${protocol}://${host}`;

  res.json({
    ...data.toObject(),
    file: data.file ? `${baseUrl}${data.file}` : null,
  });
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
