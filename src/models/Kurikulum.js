const mongoose = require("mongoose");

const matkulSchema = new mongoose.Schema(
  {
    semester: Number,
    kode: String,
    nama: String,
    sksKuliah: Number,
    sksSeminar: Number,
    sksPraktikum: Number,
    rps: String,
  },
  { _id: true },
);

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
