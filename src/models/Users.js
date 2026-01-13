const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN_PRODI", "DOSEN", "MAHASISWA", "UNIT"],
      required: true,
    },

    prodi: {
      type: String,
      enum: [
        "TATA_HIDANG",
        "DIVISI_KAMAR",
        "SENI_KULINER",
        "USAHA_PERJALANAN_WISATA",
      ],
      default: null,
    },

    unit: {
      type: String,
      enum: [
        "PENGADAAN",
        "HUMAS",
        "IT",
        "BMN",
        "BAHASA",
        "KEWIRAUSAHAAN",
        "PERPUSTAKAAN",
        "TATA_PAMONG",
        "PERENCANAAN",
        "P3M",
        "PKN",
        "PUSAKA",
      ],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
