const { modelJSON } = require("wink-nlp/src/its");
const db = require("../routes/db.config");

const remove = async function (req, res) {
  // delets a record for db
  const resourceSelected = req.body.title;

  const sqlDelete = `DELETE FROM annotation WHERE title like '${resourceSelected}'`;

  db.query(sqlDelete, function (error, results) {
    if (error) throw error;
    else {
      console.log(results);
      res.send(results);
    }
  });
};

module.exports = remove;
