const mongoose = require("mongoose");

const prestasiSchema = new mongoose.Schema(
  {
    prodi: { type: String, required: true },
    jenis: { type: String, enum: ["akademik", "non-akademik"], required: true },
    tahun: { type: Number, required: true },

    namaKegiatan: String,
    tingkat: { type: String, enum: ["wilayah", "nasional", "internasional"] },
    prestasi: String,
    bukti: String,
  },
  { timestamps: true },
);

prestasiSchema.index({ prodi: 1, jenis: 1, tahun: 1 });

module.exports = mongoose.model("PrestasiMahasiswa", prestasiSchema);
