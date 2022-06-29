const db = require(`../routes/db.config`);
const bcrypt = require(`bcryptjs`);

const register = async (req, res) => {
  // get credentials from request body
  const { email, password: Npassword , role , grade , studyLevel } = req.body;
  if (!email || !Npassword)
    return res.json({
      status: "error",
      error: "Please enter your email and password",
    });
  else {
    db.query(
      `SELECT email from users WHERE email = ?`,
      [email],
      async (err, result) => {
        if (err) throw err;
        // if email is already been used
        if (result[0])
          return res.json({
            status: "error",
            error: "Email has already been registered",
          });
        else {
          //bcrypt est une fonction de hachage basée sur l'algorithme de chiffrement Blowfish => @wiki
          // 8 is length of salt in bytes
          const password = await bcrypt.hash(Npassword, 8);

          db.query(
            `INSERT INTO users SET ?`,
            { email: email, password: password , role:role , grade: grade , studyLevel: studyLevel },
            (error, results) => {
              if (error) throw error;

              return res.json({
                status: "success",
                success: "You have been successfully registered",
              });
            }
          );
        }
      }
    );
  }
};

module.exports = register;
