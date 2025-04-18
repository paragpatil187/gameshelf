// src/lib/db.js (or wherever it's located)
import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log("🔄 Using existing MongoDB connection");
    return;
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ Please define the MONGO_URI environment variable");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // ❌ dbName not needed here if already in URI
    });

    isConnected = true;

    console.log("✅ Connected to MongoDB via Mongoose");
    console.log(`📡 URI: ${uri}`);
    console.log(`🗃️ Database: ${mongoose.connection.name}`);
    console.log(`🔗 Connection readyState: ${mongoose.connection.readyState}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}
