if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth');
const logRoute = require('./routes/log');
const movRoute = require('./routes/movement');
const goalRoute = require('./routes/goal');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/log", logRoute);
app.use("/api/movement", movRoute);
app.use("/api/goal", goalRoute);

mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log('DB connection successful'))
	.catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend Server Listening.');
});

module.exports = app;
