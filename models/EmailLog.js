const mongoose = require('mongoose');

const EmailLogSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
  sentAt: { type: Date, default: Date.now },
  errorMessage: String
});

module.exports = mongoose.model('EmailLog', EmailLogSchema);