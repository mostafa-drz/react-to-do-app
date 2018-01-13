const passportService = require('../services/passport');
const { signup, login } = require('../controllers/authControllers');
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

router.post('/api/signup', signup);

router.get("/api/auth/google", requireGoogleAuth);

router.get('/api/auth/googleLogin', async(req, res) => {
    const user = await User.findOne({ 'tokens.google': req.headers.googletoken });
    if (user) {
        user.tokens.google = null;
        await user.save();
        return res.status(200).send({ token: tokenGenrator(user) });
    }
    return res.status(401).send({ message: `You don't have permission` });
});

router.get('/api/auth/google/callback', requireGoogleLogIn, async(req, res) => {
    const token = tokenGenrator(req.user);
    const user = await User.findOneAndUpdate({ googleId: req.user.googleId }, { 'tokens.google': token });
    res.redirect(`/auth/google/callback?token=${token}`);
});

module.exports = router;