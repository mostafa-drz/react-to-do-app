const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not an valid email`
        }
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        default: null
    },
    tokens: {
        google: {
            type: String,
            default: null
        }
    }
});


//hash the password with salt before saving the user
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.googleId) {
        bcrypt.genSalt(10, function(error, salt) {
            if (error) {
                return next(error);
            }

            bcrypt.hash(user.password, salt, null, function(error, hash) {
                if (error) {
                    return next(error);
                }

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(enteredPassword, callback) {
    bcrypt.compare(enteredPassword, this.password, function(error, isMatch) {
        if (error) {
            return next(error);
        }

        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);