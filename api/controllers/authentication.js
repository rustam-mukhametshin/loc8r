const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


/**
 * Registration
 *
 * @param req
 * @param res
 * @returns {*}
 */
const register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({message: 'All fields required'});
    }

    const user = new User();
    const body = req.body;
    user.name = body.name;
    user.email = body.email;
    user.setPassword(body.password);
    user.save((err) => {
        if (err) {
            res
                .status(404)
                .json(err);
        } else {
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        }
    })
}

/**
 * Login
 *
 * @param req
 * @param res
 * @returns {*}
 */
const login = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({message: 'All fields required'});
    }

    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) {
            res
                .status(404)
                .json(err);
        }
        if (user) {
            token = user.generateJwt();
            res
                .status(200)
                .json({token});
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
}

module.exports = {
    register,
    login
}

