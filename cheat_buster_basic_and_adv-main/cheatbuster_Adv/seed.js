const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/user.model');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Optional: Drop rogue index if exists
    const indexes = await mongoose.connection.db.collection('users').indexes();
    const usernameIndex = indexes.find(idx => idx.name === 'username_1');
    if (usernameIndex) {
      await mongoose.connection.db.collection('users').dropIndex('username_1');
      console.log("Dropped broken username index");
    }

    const count = await User.countDocuments();
    if (count > 0) {
      console.log("Database already seeded.");
      return;
    }

    const { data } = await axios.get('https://randomuser.me/api/?results=50&nat=us');
    const users = data.results.map(u => ({
      firstName: u.name.first,
      lastName: u.name.last,
      email: u.email,
      age: u.dob.age,
      city: u.location.city,
      picture: u.picture.large
    }));

    await User.insertMany(users);
    console.log("Seeded 50 users successfully!");
  } catch (e) {
    console.error("Seeding failed:", e);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
})();
