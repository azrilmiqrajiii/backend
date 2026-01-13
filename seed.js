require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/Users");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany({ role: { $in: ["ADMIN_PRODI", "UNIT"] } });

    const passwordPlain = "Admin123!";
    const passwordHash = await bcrypt.hash(passwordPlain, 10);

    const users = [
      {
        name: "Admin Prodi Tata Hidang",
        email: "admin.tatahidang@poltekpar.ac.id",
        password: passwordHash,
        role: "ADMIN_PRODI",
        prodi: "TATA_HIDANG",
        unit: null,
      },
      {
        name: "Admin Prodi Divisi Kamar",
        email: "admin.divisikamar@poltekpar.ac.id",
        password: passwordHash,
        role: "ADMIN_PRODI",
        prodi: "DIVISI_KAMAR",
        unit: null,
      },
      {
        name: "Admin Prodi Seni Kuliner",
        email: "admin.senikuliner@poltekpar.ac.id",
        password: passwordHash,
        role: "ADMIN_PRODI",
        prodi: "SENI_KULINER",
        unit: null,
      },
      {
        name: "Admin Prodi Usaha Perjalanan Wisata",
        email: "admin.upw@poltekpar.ac.id",
        password: passwordHash,
        role: "ADMIN_PRODI",
        prodi: "USAHA_PERJALANAN_WISATA",
        unit: null,
      },

      {
        name: "Unit Pengadaan",
        email: "pengadaan@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "PENGADAAN",
      },
      {
        name: "Unit Humas",
        email: "humas@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "HUMAS",
      },
      {
        name: "Unit IT",
        email: "it@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "IT",
      },
      {
        name: "Unit BMN",
        email: "bmn@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "BMN",
      },
      {
        name: "Unit Bahasa",
        email: "bahasa@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "BAHASA",
      },
      {
        name: "Unit Kewirausahaan",
        email: "kewirausahaan@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "KEWIRAUSAHAAN",
      },
      {
        name: "Unit Perpustakaan",
        email: "perpustakaan@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "PERPUSTAKAAN",
      },
      {
        name: "Unit Tata Pamong",
        email: "tatapamong@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "TATA_PAMONG",
      },
      {
        name: "Unit Perencanaan",
        email: "perencanaan@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "PERENCANAAN",
      },
      {
        name: "Unit P3M",
        email: "p3m@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "P3M",
      },
      {
        name: "Unit PKN",
        email: "pkn@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "PKN",
      },
      {
        name: "Unit PUSAKA",
        email: "pusaka@poltekpar.ac.id",
        password: passwordHash,
        role: "UNIT",
        prodi: null,
        unit: "PUSAKA",
      },
    ];

    await User.insertMany(users);

    console.log("Seed ADMIN PRODI & UNIT berhasil");
    console.log("Password untuk semua akun:", passwordPlain);

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
