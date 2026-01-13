const path = require("path");
require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("SPM Backend running on port " + PORT);
    });

    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });
