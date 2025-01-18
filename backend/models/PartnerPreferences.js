const mongoose = require('mongoose');

const PartnerPreferencesSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  skinColor: { type: String, required: true },
  height: { type: Number, required: true },
  income: { type: Number, default: null },
  ip: { type: String, required: true }, // Add IP field
});

const PartnerPreferences = mongoose.model('PartnerPreferences', PartnerPreferencesSchema);

module.exports = PartnerPreferences;
