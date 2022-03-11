const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
	user: { type: String, required: true},
	movement: {type: String, required: true},
	quantity: {type: String, required: true},
	unit: {type: String, required: true},
	done: { type: Boolean, default: false},
	gaveUp: { type: Boolean, default: false},
	notes: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("Goal", GoalSchema);
