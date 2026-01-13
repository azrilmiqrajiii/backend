const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const { signToken } = require("../config/jwt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email dan password wajib" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Akun tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = signToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login berhasil",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        prodi: user.prodi,
        unit: user.unit,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR FULL:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};
