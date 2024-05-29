// const logger = require('../logger/logger');

// const passport = require("passport");
// const localStrategy = require("passport-local").Strategy;
// const JWTStrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;

// const UserModel = require("../../model/userAuthAppModel");

// require('dotenv').config();


// passport.use(
//     'signup',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true
//         },
//         async (req, email, password, done) => {
//             const { userType } = req.body;
//             try {
//                 // const user = await UserModel.create({email, password, userType});
//                 // return done(null, user);
//                 const existingUser = await UserModel.findOne({email});
//                 if (!!existingUser) {
//                     done(null, false, {message: `User with email ${req.body.email} already exists`});
//                 } else {
//                     const user = await UserModel.create({email, password, userType});
//                     return done(null, user);
//                 }
//             } catch (error) {
//                 logger.error('Error during Sign Up - ', error);
//                 done(error);
//             }
//         }
//     )
// );

// passport.use(
//     'login',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password' // Enable passing additional fields in the request
//         },
//         async (email, password, done) => {
//             try {
//                 const user = await UserModel.findOne({email});
//                 if (!user) {
//                     return done(null, false, { message: `User with email ${email} not found`});
//                 }

//                 const validate = await user.isValidPassword(password);
//                 if (!validate) {
//                     return done(null, false, { message: 'Wrong Password'});
//                 }
                
//                 logger.debug(`LoggedIn successfully for user - {${user.email}, ${user.userType}}`);
//                 return done(null, user, { message: 'Logged In Successfully'});

//             } catch (error) {
//                 logger.error('Error while Logging In - ', error);
//                 return done(error);
//             }
//         }
//     )
// );

// const {JWT_SECRET_KEY} = process.env;
// passport.use(
//     new JWTStrategy(
//         {
//             secretOrKey: JWT_SECRET_KEY,
//             jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() //ExtractJWT.fromUrlQueryParameter('secret_token')
//         },
//         async (token, done) => {
//             try {
//                 return done(null, token.user);
//             } catch (error) {
//                 logger.error('Error while checking JWT Token - ', error);
//                 done(error);
//             }
//         }
//     )
// );