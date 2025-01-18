require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const calculateRarity = require('./routes/calculateRarity');
const PartnerPreferences = require('./models/PartnerPreferences');

const app = express();

// Load environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas without deprecated options
mongoose
  .connect(MONGO_URI) // Removed useNewUrlParser and useUnifiedTopology
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to calculate rarity
app.post('/calculate', async (req, res) => {
  const preferences = req.body;

  // Get the user's IP address from the request
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Save preferences to the database along with the IP address
  const newPreference = new PartnerPreferences({ ...preferences, ip: ipAddress });
  await newPreference.save();

  // Calculate rarity
  const rarity = calculateRarity(preferences);

  res.json({ rarity });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
