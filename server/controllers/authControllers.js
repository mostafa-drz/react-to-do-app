const User = require('../models/user');
const { tokenGenrator } = require('../utils/helper');

const login = (req, res, next) => {
    res.send({ token: tokenGenrator(req.user) });
};

const signup = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: 'you should provide valid email and password' });
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                return res.status(422).send({ error: 'email is in use' });
            }

            const user = new User({
                email,
                password
            });

            user.save()
                .then(() => {
                    res.send({ token: tokenGenrator(user) });
                })
                .catch((error) => {
                    return next(error);
                });
        })
        .catch((error) => {
            return next(error);
        });
};

module.exports = { login, signup };