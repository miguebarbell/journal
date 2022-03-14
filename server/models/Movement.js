const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema({
	// TODO: unique movement per user -> check in the frontend?
	user: {type: 'string', required: true},
	name: {type: 'string', required: true},
	partOfTheBody: {type: 'string', required: true},
	description: {type: 'string'},
	execution: {type: 'string'}
}, {timestamps: true});

module.exports = mongoose.model("Movement", MovementSchema);
