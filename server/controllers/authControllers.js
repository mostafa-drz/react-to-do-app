const User = require('../models/user');
const { tokenGenrator } = require('../utils/helper');
const login = (req, res, next) => {
    res.send({ token: tokenGenrator(req.user) });
};

const signup = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ message: 'you should provide valid email and password' });
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                return res.status(422).send({ message: 'email is in use' });
            }

            const user = new User({
                email,
                password
            });

            user.save()
                .then(() => {
                    res.status(200).send({ token: tokenGenrator(user) });
                })
                .catch((error) => {
                    res.status(400).send({ message: 'something went wrong' });
                    return next(error);
                });
        })
        .catch((error) => {
            res
                .status(400)
                .send({ message: "something went wrong" });
            return next(error);
        });
};

module.exports = { login, signup };