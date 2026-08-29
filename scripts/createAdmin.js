import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import "dotenv/config";
import connectDB from "../src/lib/mongodb.js";
import User from "../src/models/userModel.js";

async function createAdmin() {
  try {
    await connectDB();

    const email = "operator@sikhsapith.com";
    const password = "Admin@2026";

    const existingAdmin = await User.findOne({
      email,
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name: "Administrator",
      email,
      password: hashedPassword,
      role: "operator",
      isActive: true,
    });

    console.log("Admin created successfully.");
    console.log("Email:", admin.email);
    console.log("Password:", password);

  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin();