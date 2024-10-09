// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
