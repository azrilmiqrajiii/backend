require("dotenv").config();
const mongoose = require("mongoose");
const Menu = require("./src/models/Menu");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Menu.deleteMany();

  await Menu.insertMany([
    {
      title: "Internal Quality Assurance",
      image: "/uploads/menus/iqa.jfif",
      order: 1,
    },
    {
      title: "Comunnity Engagement",
      image: "/uploads/menus/community.jfif",
      order: 2,
    },
    {
      title: "Certification",
      image: "/uploads/menus/certification.jfif",
      order: 3,
    },
    {
      title: "News",
      image: "/uploads/menus/news.jfif",
      order: 4,
    },
  ]);

  console.log("Menu seeded");
  process.exit();
}

seed();
