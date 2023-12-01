const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(goalRoutes);
app.use(userRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));