const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const influencerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  influencerId: { type: String, required: true }
});

influencerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Influencer', influencerSchema);