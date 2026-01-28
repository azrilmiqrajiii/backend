const fs = require("fs")
const path = require("path")
const Prestasi = require("../models/PrestasiMahasiswa")

const unlinkSafe = (p) => {
  if (!p) return
  const full = path.join(process.cwd(), p)
  if (fs.existsSync(full)) fs.unlinkSync(full)
}

exports.list = async (req, res) => {
  try {
    const { prodi, jenis } = req.params
    const { tahun } = req.query

    const data = await Prestasi.find({
      prodi,
      jenis,
      tahun,
    }).sort({ createdAt: 1 })

    const base = `${req.protocol}://${req.get("host")}`

    res.json(
      data.map((d) => ({
        ...d.toObject(),
        bukti: d.bukti ? base + d.bukti : "",
      })),
    )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const payload = req.body
    const created = await Prestasi.create(payload)
    res.status(201).json(created)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File wajib" })

    const data = await Prestasi.findById(req.params.id)
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" })

    unlinkSafe(data.bukti)
    data.bukti = `/uploads/prestasi/${req.file.filename}`
    await data.save()

    res.json({ bukti: data.bukti })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    const data = await Prestasi.findById(req.params.id)
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" })

    unlinkSafe(data.bukti)
    await data.deleteOne()

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
