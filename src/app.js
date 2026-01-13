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
    origin: function (origin, callback) {
      // allow non-browser requests (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// static
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.get("/", (req, res) => {
  res.send("SPM Backend OK");
});

app.use("/api/visi-misi", require("./routes/visiMisi.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/menus", require("./routes/menu.routes"));

module.exports = app;
