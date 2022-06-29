const db = require(`../routes/db.config`);
const jwt = require(`jsonwebtoken`);

const loogedIn = (req, res, next) => {
  // if user is not loged in, execute next middlewear
  if (!req.cookies.userRegistered) return next()
  
  try {
    const decoded = jwt.verify(
      req.cookies.userRegistered,
      process.env.JWT_SECREAT_KEY
    );

    db.query(`SELECT * from users WHERE id= ?`, [decoded.id], (err, result) => {
      if (err) return next();
      req.user = result[0];
      return next();
    });
  } catch (error) {
    if (error) return next();
  }
};

module.exports = loogedIn;
