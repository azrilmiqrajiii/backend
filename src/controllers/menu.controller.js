const Menu = require("../models/Menu");

exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ order: 1 });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil menu" });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { title, order } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ message: "Title dan gambar wajib" });
    }

    const menu = await Menu.create({
      title,
      order: order || 0,
      image: `${process.env.BASE_URL}/uploads/menus/${req.file.filename}`,
    });

    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat menu" });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus menu" });
  }
};
