const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// issues with any of the URL string';
const markerSchema = new Schema({
  bizId: { type: String, required: true },
  bizName: { type: String, required: true },
  imageUrl: { type: String },
  address1: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String },
  state: { type: String },
  phone: { type: String },
  latitude: { type: Decimal128, required: true },
  longitude: { type: Decimal128, required: true },
  price: { type: String },
  rating: { type: String },
  url: { type: String },
  reviewCount: { type: String },
});

markerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Marker', markerSchema);