const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const instanceSchema = new Schema({
  bizid: { type: String, required: true },
  bizname: { type: String, required: true },
  userid: { type: String, required: true },
  username: { type: String, required: true },
  display_address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String },
  state: { type: String, required: true },
  medialinkurl: { type: String, required: true },
  mediaembed: { type: String },
  phone: { type: String }
});

instanceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Instance', instanceSchema);