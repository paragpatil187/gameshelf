const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv= require('dotenv')
dotenv.config()

// Replace with your actual MongoDB Atlas connection string
const MONGO_URI = process.env.MONGO_URI

// Define Game Schema
const gameSchema = new mongoose.Schema({
  title: String,
  genres: [String],
  description: String,
  price: Number,
  previewVideo: String,
  screenshots: [String],
  rating: Number,
  comments: [
    {
      userId: String,
      text: String,
      timestamp: Date,
    },
  ],
  isFeatured: Boolean,
  isPopular: Boolean,
});

// Create Game Model
const Game = mongoose.model('Game', gameSchema);

// Read JSON File
const filePath = path.join(__dirname, 'games_data.json');
const gameData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Insert Data into MongoDB
const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Game.insertMany(gameData);
    console.log('✅ Game data inserted successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error inserting data:', error);
    mongoose.connection.close();
  }
};

importData();
