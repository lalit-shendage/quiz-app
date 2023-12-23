const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, quizController.createQuiz);

router.get('/all', authMiddleware, quizController.getAllQuizzes);

router.get('/active', authMiddleware, quizController.getActiveQuiz);

router.post('/participate', authMiddleware, quizController.participateInQuiz);

router.get('/:quizId/result', authMiddleware, quizController.getQuizResult);

module.exports = router;
