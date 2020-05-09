const mongoose = require('mongoose');

const RefreshTokenShema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  }
});

module.exports = mongoose.model('RefreshToken', RefreshTokenShema);
