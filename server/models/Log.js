const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
	user:  {type: String, required: true},
	weight: {type: Number},
	repetitions: {type: Number},
	distance: {type: Number},
	duration: {type: Number},
	date: {type: Date},
	movement: {type: String, required: true}
})

module.exports = mongoose.model("Log", LogSchema)
