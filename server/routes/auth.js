const passportService = require('../services/passport');
const { signup, login } = require('../controllers/authControllers');
const { requireAuth, requireLogIn, requireGoogleAuth, requireGoogleLogIn } = require('../middlewares/auth');

const express = require('express');
const router = express.Router();

router.get('/api/dashboard', requireAuth, (req, res, next) => {
    res.status(200).send({ message: "here we go" });
});

router.post('/api/login', requireLogIn, login);

router.post('/api/signup', signup);

router.get("/api/auth/google", requireGoogleAuth);

router.get("/api/auth/google/callback", requireGoogleLogIn, login);

module.exports = router;