const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const influencerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

influencerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Influencer', influencerSchema);