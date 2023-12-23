const Quiz = require('../models/quiz');
const StudentQuizResult = require('../models/studentQuizResult');

// Admin - Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden - Only admins can create quizzes' });
    }

    const newQuiz = new Quiz(req.body);
    await newQuiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Admin - Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden - Only admins can get all quizzes' });
    }

    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error('Error getting all quizzes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Student - Get the active quiz
exports.getActiveQuiz = async (req, res) => {
  try {
   
    const activeQuiz = await Quiz.findOne({ startDate: { $lte: new Date() }, endDate: { $gte: new Date() } });

    if (!activeQuiz) {
      return res.status(404).json({ message: 'No active quiz found' });
    }

    res.status(200).json({ activeQuiz });
  } catch (error) {
    console.error('Error getting active quiz:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Student - Participate in a quiz
exports.participateInQuiz = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Forbidden - Only students can participate in quizzes' });
    }

    const { quizId, selectedOptions } = req.body;

    const activeQuiz = await Quiz.findOne({ _id: quizId, startDate: { $lte: new Date() }, endDate: { $gte: new Date() } });

    if (!activeQuiz) {
      return res.status(404).json({ error: 'Quiz not found or not active' });
    }

    const correctAnswers = activeQuiz.questions.map((question) => question.rightAnswer);

    const score = selectedOptions.reduce((totalScore, selectedOption, index) => {
      if (selectedOption === correctAnswers[index]) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);

    const result = new StudentQuizResult({
      userId: req.user._id,
      quizId,
      score,
      selectedOptions,
    });

    await result.save();

    res.status(200).json({ message: 'Quiz participation successful', score });
  } catch (error) {
    console.error('Error participating in quiz:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getQuizResult = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (req.user.role === 'admin') {
      const results = await StudentQuizResult.find({ quizId });
      return res.status(200).json({ results });
    }

    if (req.user.role === 'student') {
      const result = await StudentQuizResult.findOne({ userId: req.user._id, quizId });

      const quiz = await Quiz.findById(quizId);
      const quizEndTime = new Date(quiz.endDate);
      const currentTime = new Date();

      if (quizEndTime.getTime() + 5 * 60 * 1000 <= currentTime.getTime()) {
        if (result) {
          const correctAnswers = quiz.questions.map((question) => question.rightAnswer);

          return res.status(200).json({
            result: {
              ...result.toObject(),
              correctAnswers,
            },
          });
        } else {
          return res.status(404).json({ message: 'Result not found for the given quiz and user' });
        }
      } else {
        return res.status(403).json({ error: 'Forbidden - Quiz result is not yet available' });
      }
    }

    return res.status(403).json({ error: 'Forbidden - Access not allowed' });
  } catch (error) {
    console.error('Error getting quiz result:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

