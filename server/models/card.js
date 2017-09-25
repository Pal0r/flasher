const mongoose = require('mongoose');


const FlashCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('FlashCard', FlashCardSchema)