const mongoose = require("mongoose");

const matkulSchema = new mongoose.Schema({
  semester: String,
  kodeMataKuliah: String,
  namaMataKuliah: String,
  sksKuliah: String,
  sksSeminar: String,
  sksPraktikum: String,
  rps: String,
});

const kurikulumSchema = new mongoose.Schema(
  {
    prodi: { type: String, required: true },
    tahun: { type: String, required: true },
    matkul: [matkulSchema],
    file: String,
  },
  { timestamps: true }
);

kurikulumSchema.index({ prodi: 1, tahun: 1 }, { unique: true });

module.exports = mongoose.model("Kurikulum", kurikulumSchema);
