require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
// Lidhu me databazën
connectDB();

// Inicializimi i  Express
const app = express();

// marr fotot nga public uploads
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Middleware
app.use(cors());
app.use(express.json());

// Rruget
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
