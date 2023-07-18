const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  business: {
    type: String,
    required: true
  },
  progress: [{
    week: {
      type: Number,
      required: true
    },
    moneySpent: {
      type: Number,
      required: true
    },
    itemsSold: {
      type: Number,
      required: true
    },
    moneyEarned: {
      type: Number,
      required: true
    },
    profitLoss: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model('Student', studentSchema);
