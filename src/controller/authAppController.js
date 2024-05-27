const logger = require('../utils/logger/logger');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('dotenv').config()


exports.signup = async(req, res, next) => {
    passport.authenticate(
        'signup',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    res.status(409);
                    res.json({ 
                        message: info.message
                    });
                    const error = new Error(info.message);
                    return next(error);
                }

                res.json({
                    message: 'Signup successful',
                    user: req.user
                });
                logger.info(res.statusCode);
            } catch (error) {
                logger.error(error)
                return next(error);
            }
        }
    )(req, res, next);
}

const {JWT_SECRET_KEY} = process.env;
exports.login = async(req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    res.status(404);
                    res.json({ 
                        message: info.message
                    });
                    const error = new Error(info.message);
                    return next(error);
                }

                req.login(
                    user, 
                    {session: false},
                    async (error) => {
                        if (error) {
                            res.status(401); // TBD: [401 || 500] - unsure if this is server or client error
                            logger.error(res.statusCode, error);
                            return next(error);
                        }

                        const body = { _id: user.email, userType: user.userType};
                        const token = jwt.sign({ user: body }, JWT_SECRET_KEY);

                        res.status(200);
                        logger.info(res.statusCode);
                        return res.json({ token });
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
}