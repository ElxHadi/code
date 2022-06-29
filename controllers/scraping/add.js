const db = require("../../routes/db.config");

const add = async function (req, res) {
  // add record to DB
  const resourceData = req.body.result;
  const insertAnnotationQuery = `INSERT INTO
          annotation (
            url,
            title,
            language,
            interActivityType,
            interactivityLevel,
            semanticDensity,
            textRichness,
            textReadability,
            readingTime,
            detectedTerms,
            shortDescription
          )
        VALUES(
        '${resourceData.url}',
        '${resourceData.title}',
        '${resourceData.language}',
        '${resourceData.interActivityType}',
        '${resourceData.interactivityLevel}',
        '${resourceData.semanticDensity}', 
        '${resourceData.textRichness}',
        '${resourceData.textReadability}',
        '${resourceData.readingTime}',
        '${resourceData.detectedTerms}',
        '${resourceData.shortDescription}'
        )`;

  db.query(insertAnnotationQuery, function (error, results) {
    if (error) throw error;
    else {
      setTimeout(() => {
        const insertResource = `INSERT INTO resource (url , title, annotationId) VALUES('${resourceData.url}', '${resourceData.title}', ${results.insertId})`;
        db.query(insertResource, function (error, resourceResults) {
          if (error) throw error;
          else {
            setTimeout(() => {
              const insertResourceAnalysing = `INSERT INTO resource_analysed (userID , resourceID, analysing_Date) VALUES(${
                req.body.userId
              }, ${
                resourceResults.insertId
              }, '${new Date().toLocaleString()}')`;
              db.query(insertResourceAnalysing, function (error, results) {
                if (error) throw error;
                else {
                }
              });
            }, 2000);
          }
        });
      }, 2000);

      res.send(results);
    }
  });
};

module.exports = add;
