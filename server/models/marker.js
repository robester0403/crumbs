const { Double, Decimal128 } = require('bson');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// issues with any of the URL string';
const markerSchema = new Schema({
  bizId: { type: String, required: true },
  bizName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address1: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  latitude: { type: Decimal128, required: true },
  longitude: { type: Decimal128, required: true }
});

markerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Marker', markerSchema);