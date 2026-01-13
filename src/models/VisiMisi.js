const mongoose = require("mongoose");

const visiMisiSchema = new mongoose.Schema(
  {
    prodi: { type: String, required: true },
    tahun: { type: String, required: true },
    visi: String,
    misi: String,
    file: String,
  },
  { timestamps: true }
);

visiMisiSchema.index({ prodi: 1, tahun: 1 }, { unique: true });

module.exports = mongoose.model("VisiMisi", visiMisiSchema);
