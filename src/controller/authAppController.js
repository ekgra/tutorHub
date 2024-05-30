const logger = require('../utils/logger/logger');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase-admin-config');
const User = require('../model/userAuthAppModel');
const dbConn = require('../utils/database/appDBConnection'); 

require('dotenv').config()

exports.auth = async (req, res) => {
    const googleToken = req.headers.authorization;
    const userType = req.body.userType;
    const db = await dbConn;
    const collection = db.collection('users');

    try {
        const decodedToken = await admin.auth().verifyIdToken(googleToken);
        const { email, name } = decodedToken;
    
        let user = await User.findOne({email});
    
        if (!user) {
          user = new User({ email, name, userType }); 
          await collection.insertOne({_id: email, name: name, userType: userType});
          await user.save();
        }
    
        const jwtToken = jwt.sign(
          { email: user.email, name: user.name, userType: user.userType },
          process.env.JWT_SECRET_KEY, // Ensure you have this in your environment variables
          { expiresIn: '4d' }
        );
    
        res.json({ jwtToken });
      } catch (error) {
        console.error('Error validating Firebase token:', error);
        res.status(401).json({ error: 'Unauthorized' });
      }
}
