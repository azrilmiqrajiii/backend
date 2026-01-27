const mongoose = require("mongoose");

const matkulSchema = new mongoose.Schema({
  semester: String,
  kode: String,
  nama: String,
  sksKuliah: { type: Boolean, default: false },
  sksSeminar: { type: Boolean, default: false },
  sksPraktikum: { type: Boolean, default: false },
  rps: String,
});

const kurikulumSchema = new mongoose.Schema(
  {
    prodi: String,
    tahun: Number,
    matkul: [matkulSchema],
    pdf: String,
  },
  { timestamps: true },
);

kurikulumSchema.index({ prodi: 1, tahun: 1 }, { unique: true });

module.exports = mongoose.model("Kurikulum", kurikulumSchema);
