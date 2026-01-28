const mongoose = require("mongoose")

const rowSchema = new mongoose.Schema({
  bulanWisuda: { type: String, required: true },
  jumlahLulusan: { type: Number, required: true },
  terlacak: { type: Number, required: true },
  dipesan: { type: Number, required: true },
  wt3: { type: Number, required: true },
  wt6: { type: Number, required: true },
  wtlebih6: { type: Number, required: true },
})

const schema = new mongoose.Schema(
  {
    prodi: { type: String, required: true },
    tahun: { type: Number, required: true },
    rows: { type: [rowSchema], default: [] },
    file: String,
  },
  { timestamps: true }
)

schema.index({ prodi: 1, tahun: 1 }, { unique: true })

module.exports = mongoose.model("WaktuTungguLulusan", schema)
