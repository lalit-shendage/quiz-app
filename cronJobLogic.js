const Quiz = require('./models/quiz');

const updateQuizStatuses = async () => {
  try {
    const quizzes = await Quiz.find();

    quizzes.forEach(async (quiz) => {
      if (quiz.startDate > new Date()) {
        quiz.status = 'incoming';
      } else if (quiz.startDate <= new Date() && quiz.endDate >= new Date()) {
        quiz.status = 'active';
      } else {
        quiz.status = 'finished';
      }

      await quiz.save();
    });

    console.log('Cron job running...');
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
};

module.exports = { updateQuizStatuses };
