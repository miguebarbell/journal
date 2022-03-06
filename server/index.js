if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth')

const app = express();
app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoute)

mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log('DB connection successful'))
	.catch((err) => console.log(err))

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend Server Listening.')
})
