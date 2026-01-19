const Kurikulum = require("../models/Kurikulum");

exports.get = async (req, res) => {
  const { prodi, tahun } = req.params;
  const data = await Kurikulum.findOne({ prodi, tahun });
  res.json(data || null);
};

exports.save = async (req, res) => {
  const { prodi } = req.params;
  const { tahun, matkul } = req.body;

  const payload = {
    prodi,
    tahun: Number(tahun),
    matkul: JSON.parse(matkul),
  };

  if (req.files?.pdf)
    payload.pdf = `/uploads/kurikulum/${req.files.pdf[0].filename}`;

  const data = await Kurikulum.findOneAndUpdate(
    { prodi, tahun: payload.tahun },
    payload,
    { upsert: true, new: true },
  );

  res.json(data);
};
