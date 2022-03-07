const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
	name:  {type: String, required: true},
	weight: {type: Number},
	repetitions: {type: Number},
	distance: {type: Number},
	duration: {type: Number},
	date: {type: Date, required: true}
})

module.exports = mongoose.model("Log", LogSchema)
