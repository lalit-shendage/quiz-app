const mongoose = require('mongoose');

const studentQuizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  selectedOptions: {
    type: [Number], 
    required: true,
  },
});

const StudentQuizResult = mongoose.model('StudentQuizResult', studentQuizResultSchema);

module.exports = StudentQuizResult;
