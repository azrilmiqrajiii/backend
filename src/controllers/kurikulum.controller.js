const Kurikulum = require("../models/Kurikulum");

exports.get = async (req, res) => {
  const { prodi, tahun } = req.params;
  const data = await Kurikulum.findOne({ prodi, tahun });
  res.json(data);
};

exports.save = async (req, res) => {
  const { prodi } = req.params;
  const { tahun, matkul } = req.body;

  const payload = {
    prodi,
    tahun,
    matkul: JSON.parse(matkul),
  };

  if (req.file) payload.file = `/uploads/kurikulum/${req.file.filename}`;

  const data = await Kurikulum.findOneAndUpdate({ prodi, tahun }, payload, {
    upsert: true,
    new: true,
  });

  res.json(data);
};
