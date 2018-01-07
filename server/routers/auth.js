const passportService = require('../services/passport');
const { signup, login } = require('../controllers/authControllers');
const { requireAuth, requireLogIn } = require('../middlewares/auth');

const express = require('express');
const router = express.Router();

router.get('/', requireAuth, (req, res, next) => {
    res.send({ message: 'here we go' });
});

router.post('/login', requireLogIn, login);

router.post('/signup', signup);

module.exports = router;