const passportService = require('../services/passport');
const { signup, login, googleLogin, googleAuthCallback } = require('../controllers/authControllers');
const { requireAuth, requireLogIn, requireGoogleAuth, requireGoogleLogIn } = require('../middlewares/auth');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const { tokenGenrator } = require('../utils/helper');
const { JWT_SECRET_KEY } = require('../config/index');
const jwt = require('jwt-simple');

router.get('/api/dashboard', requireAuth, (req, res, next) => {
    res.status(200).send({ message: "here we go" });
});

router.post('/api/login', requireLogIn, login);

router.post('/api/logout', (req, res) => {
    req.logout();
    res.status(200);
    res.end();
});
router.post('/api/signup', signup);

router.get("/auth/google", requireGoogleAuth);

router.get('/api/auth/user', (req, res, next) => {
    if (req.user) {
        res.status(200).send({ token: tokenGenrator(req.user) });
    } else {
        res.status(401).send();
    }
});

router.get('/auth/google/callback', requireGoogleLogIn, (req, res, next) => {
    res.redirect('/dashboard');

});

module.exports = router;