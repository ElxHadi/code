const db = require("../routes/db.config");

const view = async function (req, res) {
  // display info about a certain record
  const resourceSelected = req.body.title;

  const sqlSelect = `SELECT * FROM annotation WHERE title like '${resourceSelected}'`;
  db.query(sqlSelect, function (error, results) {
    if (error) throw(error)
    else {
      res.send(results);
    }
  });
};

module.exports = view;