const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User"); // Assuming your User model is correctly placed

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("12345", salt);

    await User.create([
      {
        email: "test@gmail.com", // Owner
        password: hashedPassword,
        role: "Owner",
      },
      {
        email: "admin@gmail.com", // Admin
        password: hashedPassword,
        role: "Admin",
      },
      {
        email: "user@gmail.com", // User
        password: hashedPassword,
        role: "User",
      },
    ]);

    console.log("Users inserted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
