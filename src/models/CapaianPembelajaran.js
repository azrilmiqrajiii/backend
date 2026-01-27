const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    prodi: {
      type: String,
      required: true,
      index: true,
    },
    tahunLulus: {
      type: Number,
      required: true,
    },
    jumlahLulusan: {
      type: Number,
      required: true,
    },
    masaStudi: {
      type: Number,
      required: true,
    },
    ipkMin: {
      type: Number,
      required: true,
    },
    ipkAvg: {
      type: Number,
      required: true,
    },
    ipkMax: {
      type: Number,
      required: true,
    },
    skYudisium: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

schema.index({ prodi: 1, tahunLulus: 1 }, { unique: true });

module.exports = mongoose.model("CapaianPembelajaran", schema);
