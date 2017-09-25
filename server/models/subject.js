const mongoose = require('mongoose');

const FlashCardSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashCard' }]
})

module.exports = mongoose.model('FlashCardSubject', FlashCardSubjectSchema)
