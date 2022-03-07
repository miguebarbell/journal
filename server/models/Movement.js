const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema({
	user: {type: 'string', required: true},
	name: {type: 'string', required: true},
	body: {type: 'string'},

}, {timestamps: true})

module.exports = mongoose.model("Movement", MovementSchema)
