const mongoose = require('mongoose');

const PrintJobSchema = new mongoose.Schema({
  printId: { type: String, required: true, unique: true },
  file: { type: String, required: true },
  printer: { type: String, required: true },
  copies: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  sides: { type: String, required: true },
  pages: { type: String, required: true },
  schedule: { type: String, required: true },
});

module.exports = mongoose.model('PrintJob', PrintJobSchema);