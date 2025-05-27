const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  trending: {
    type: Boolean,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number, // Corrected: Specify the type as Number
  },
  createdAt: {
    type: Date,
    default: Date.now, // Corrected: Use default to set the initial value
  },
}, {
  timestamps: true, // Corrected: Moved timestamps to the options object
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;