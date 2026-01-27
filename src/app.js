const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const allowedOrigins = [
  "https://frontend-virid-ten-88.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/visi-misi", require("./routes/visiMisi.routes"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("SPM Backend OK");
});

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const menuRoutes = require("./routes/menu.routes");
app.use("/api/menus", menuRoutes);

const kurikulumRoutes = require("./routes/kurikulum.routes");
app.use("/api/kurikulum", kurikulumRoutes);

const capaianRoutes = require("./routes/capaianPembelajaran.routes");
app.use("/api/capaian-pembelajaran", capaianRoutes);

module.exports = app;
