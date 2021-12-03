const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const markerSchema = new Schema({
  bizid: { type: String, required: true },
  bizname: { type: String, required: true },
  imageurl: { type: String, required: true },
  display_address: { type: String, required: true },
  address1: { type: String },
  address2: { type: String },
  address3: { type: String },
  city: { type: String, required: true },
  country: { type: String },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true }
});

markerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Marker', instanceSchema);