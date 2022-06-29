const jwt = require(`jsonwebtoken`);
const db = require(`../routes/db.config`);
const bcrypt = require(`bcryptjs`);

const login = async (req, res) => {
  // get credentials from request body
  const { email, password } = req.body;

  // if any is empty
  if (!email || !password)
    return res.json({
      status: "error",
      error: "Please enter your email and password",
    });

  else {
    db.query(
      `SELECT * from users WHERE email = ?`,
      [email],
      async (err, result) => {
        if (err) throw err;
        // if account doesn't exist
        if (result.length === 0) {
          return res.json({
            status: "error",
            error: "Account doesn't exist !",
          });
        } else {
          const isSamePass = await bcrypt.compare(password, result[0].password);

          // if hashes are not equal 
          if (!isSamePass) {
            return res.json({
              status: "error",
              error: "Incorrect email or password", // to avoid bruteforce
            });
          }

          // password hashes  are equal
          else {

            // sign the token with secret key
            const token = jwt.sign(
              { id: result[0].id },
              process.env.JWT_SECREAT_KEY,
              {
                expiresIn: process.env.JWT_EXPIRES,
              }
            );
            
            // add expiration date
            const cookieOption = {
              expiresIn: new Date(
                Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };

            res.cookie("userRegistered", token, cookieOption);
            return res.json({
              status: `success`,
              success: `Succesfully logged in`,
            });
          }
        }
      }
    );
  }
};

module.exports = login;
