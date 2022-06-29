const express = require(`express`);
const app = express();
const db = require(`../routes/db.config`);

const statistics = async (req, res) => {
  const allFieldsQuery = `SELECT * FROM annotation;`;

  db.query(allFieldsQuery, async function (err, results) {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
};

module.exports = statistics;
