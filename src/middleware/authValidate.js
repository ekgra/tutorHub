const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log("authHeader", req)
  // console.log(req);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userRbac) => {
      if (err) {
        return res.sendStatus(403);
      }

      console.log("validate", userRbac)
      req.userRbac = userRbac;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateToken;
