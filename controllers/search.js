const db = require(`../routes/db.config`);
const winkNLP = require(`wink-nlp`);
const its = require("wink-nlp/src/its.js");
const model = require("wink-eng-lite-web-model");
const nlp = winkNLP(model);

const search = async (req, res) => {
  // get resource fields
  const desiredResource = req.body;

  // Clean the user's query
  const normalizedTerms = desiredResource.desiredTerms.toLowerCase();
  const cleanQueryTermsArr = nlp
    .readDoc(normalizedTerms)
    .tokens()
    .filter((t) => t.out(its.type) === "word" && !t.out(its.stopWordFlag))
    .out(its.lemma);
  const cleanQueryTerms = cleanQueryTermsArr.join(` `);

  // sql queries
  const detectedTermsClause = ` MATCH(annotation.detectedTerms) AGAINST('${cleanQueryTerms}') `;
  const maxReadingTimeClause = ` annotation.readingTime <= ${desiredResource.desiredReadingTime}`;
  const interactivityTypeClause = ` annotation.interActivityType like '${desiredResource.desiredInteractivityType}' `; // ok
  const interactivityLevelClause = ` annotation.interactivityLevel like '${desiredResource.desiredInteractivityLevel}' `; //ok
  const semanticDensityClause = ` annotation.semanticDensity like '${desiredResource.desiredSemanticDensity}' `; // ok
  const textRichnessLevelClause = ` annotation.textRichness like '${desiredResource.desiredTextRichnessLevel}' `; // ok
  const readabilityScoreClause = ` annotation.textReadability like '${desiredResource.desiredReadbilityScore}'`;


  const sqlConditions =
    detectedTermsClause +
    ` AND ` +
    maxReadingTimeClause +
    ` AND ` +
    interactivityTypeClause +
    ` AND ` +
    interactivityLevelClause +
    ` AND ` +
    semanticDensityClause +
    ` AND ` +
    textRichnessLevelClause +
    ` AND ` +
    readabilityScoreClause;



  const resourceSelect  = `SELECT resource.title, resource.id, resource.url from resource WHERE resource.annotationId  IN`;
  const annotationSelect = `(SELECT annotation.id from annotation WHERE`;
  const finalQuery = resourceSelect +  annotationSelect + sqlConditions + `)`; 
  db.query(finalQuery, async function (err, results) {
    if (err) console.log(err);
    else {
      res.send(results);
      let cosultSavingQuery = ``;
      results.forEach((element) => {
        cosultSavingQuery = `INSERT INTO resource_consulted (userID, resourceID , consulting_Date) VALUES(${
          req.body.userId
        }, ${element.id}, '${new Date().toLocaleString()}')`;
      
        setTimeout(()=>{
          db.query(cosultSavingQuery);
        },2000)


      });
    }
  });
};

module.exports = search;
