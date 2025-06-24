const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/vibes', require('./routes/vibes'));

app.get('/', (req, res) => {
  res.send('🌈 Welcome to the VibeCheck API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server blasting off on port ${PORT}`));
