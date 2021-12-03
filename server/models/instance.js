const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const instanceSchema = new Schema({
  bizId: { type: String, required: true },
  bizName: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  address1: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String },
  state: { type: String, required: true },
  mediaLinkUrl: { type: String, required: true },
  mediaEmbed: { type: String },
  phone: { type: String }
});

instanceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Instance', instanceSchema);