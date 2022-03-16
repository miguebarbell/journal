const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
	user:  {type: String, required: true},
	movement: {type: String, required: true},
	rep: {type: Number, default: 1},
	sets: {type: Number, default: 1},
	weight: {type: Number},
	distance: {type: Number, default: 1},
	unit: {type: String, required: true},
	duration: {type: Number},
	date: {type: Date},
	notes: {type: String},
});

module.exports = mongoose.model("Log", LogSchema);
