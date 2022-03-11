const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema({
	// TODO: unique movement per user -> check in the frontend?
	user: {type: 'string', required: true},
	name: {type: 'string', required: true},
	body: {type: 'string'},
	description: {type: 'string'}
}, {timestamps: true});

module.exports = mongoose.model("Movement", MovementSchema);
