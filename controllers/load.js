const db = require("../routes/db.config");

const load = async function (req, res) {
  // get records from database, else an empty resource msg

  const loadingResourceQuery = `SELECT resource.id, resource.title FROM resource
  WHERE resource.id IN (SELECT resourceID from resource_analysed WHERE resource_analysed.userID = ${req.body.userId})`;
  db.query(loadingResourceQuery, function (error, results) {
    if (error) throw error;
    else {
      let data = [];

      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          data.push({ id: results[i].id, text: results[i].title });
        }
      } else {
        data.push({
          id: 0,
          text: `You dont have any resources for now 😶...`,
          disabled: true,
        });
      }

      res.send(data);
    }
  });
};

module.exports = load;
