const axios = require(`axios`);
const cheerio = require(`cheerio`);
const enums = require(`./enums`);
const _ = require(`underscore`);
const winkNLP = require(`wink-nlp`);
const its = require("wink-nlp/src/its.js");
const as = require("wink-nlp/src/as.js");
const model = require("wink-eng-lite-web-model");
const nlp = winkNLP(model);
const terms = require(`./terms`);
const utils = require(`wink-nlp-utils`);
const { set } = require("wink-nlp/src/as.js");

// levels mapping
function levelScale(average) {
  return between(
    average,
    enums.Percentages.fourthyPercent,
    enums.Percentages.fifthyPercent
  ) // nb > 80 and x <= 100
    ? enums.Levels.VERY_HIGH
    : between(
        average,
        enums.Percentages.thirthyPercent,
        enums.Percentages.fourthyPercent
      )
    ? enums.Levels.HIGH
    : between(
        average,
        enums.Percentages.twentyPercent,
        enums.Percentages.thirthyPercent
      )
    ? enums.Levels.MEDIUM
    : between(
        average,
        enums.Percentages.tenPercent,
        enums.Percentages.twentyPercent
      )
    ? enums.Levels.LOW
    : enums.Levels.VERY_LOW;
}

// Flesch–Kincaid readability maping
function feshScale(fleshResult) {
  return between(
    fleshResult,
    enums.Percentages.ninthyPercent,
    enums.Percentages.oneHundredPercent
  ) // nb > 90 and <= 100
    ? enums.FleschScore.VERY_EASY_TO_READ
    : between(
        fleshResult,
        enums.Percentages.eithyPercent,
        enums.Percentages.ninthyPercent
      )
    ? enums.FleschScore.EASY_TO_READ
    : between(
        fleshResult,
        enums.Percentages.seventyPercent,
        enums.Percentages.eithyPercent
      )
    ? enums.FleschScore.FAIRLY_EASY_TO_READ
    : between(
        fleshResult,
        enums.Percentages.sixthyPercent,
        enums.Percentages.seventyPercent
      )
    ? enums.FleschScore.PLAIN_ENGLISH
    : between(
        fleshResult,
        enums.Percentages.fifthyPercent,
        enums.Percentages.sixthyPercent
      )
    ? enums.FleschScore.FAIRLY_DIFFICULT
    : between(
        fleshResult,
        enums.Percentages.thirthyPercent,
        enums.Percentages.fifthyPercent
      )
    ? enums.FleschScore.DIFFICULT_TO_READ
    : between(
        fleshResult,
        enums.Percentages.tenPercent,
        enums.Percentages.thirthyPercent
      )
    ? enums.FleschScore.VERY_DIFFICULT_TO_READ
    : between(
        fleshResult,
        enums.Percentages.zeroPercent,
        enums.Percentages.tenPercent
      )
    ? enums.FleschScore.EXTREAMLY_DIFFICULT_TO_READ
    : enums.Err.COULD_NOT_FIGURE_IT_OUT;
}

// resource / data extraction
async function getCheerio(url) {
  const result = await axios(url);
  const $ = cheerio.load(result.data);
  return $;
}

// helper function
function between(x, min, max) {
  return x > min && x <= max;
}

class Annotation {
  constructor(cheerioObj, addtionalUrl) {
    this.$ = cheerioObj;
    this.URL = addtionalUrl;
  }

  getTitle() {
    return this.$(enums.Tags.TITLE).text();
  }

  getLang() {
    return this.$(enums.Tags.HTML).attr(enums.Tags.LANG);
  }

  getAllTags() {
    const allElements = this.$(enums.Selectors.EVERY_THING_IN_BODY);
    const allTagNames = [].map.call(allElements, (el) => el.name);
    return allTagNames;
  }

  getInterActivityType() {
    const allTags = this.getAllTags();
    const tmp = _.intersection(enums.InterActiveTags, allTags);
    const isAllAncor = tmp.length === 1 && tmp[0] === `a`;
    const isAllBtn = tmp.length === 1 && tmp[0] === `button`;

    const firstClause = tmp.length > enums.Percentages.zeroPercent;
    const secoundClause = !isAllAncor;
    const thirdClause = !isAllBtn;

    return firstClause && secoundClause && thirdClause
      ? enums.Types.ACTIVE
      : enums.Types.EXPOSITIVE;
  }

  getInteractivityCount() {
    // return the number of interactive tags found in the html document (including duplicates)
    let countActive = 0;

    for (let i = 0; i < enums.InterActiveTags.length; i++) {
      countActive += this.$(enums.InterActiveTags[i]).length;
    }

    return countActive;
  }

  getRawWordsCount() {
    const doc = nlp.readDoc(this.$(enums.Tags.BODY).text());
    return doc.tokens().out(its.type, as.freqTable)[0][1]; // see the the object structure to understand
  }

  getInteractivityLevel() {
    const interactivityCount = this.getInteractivityCount();
    const tagsCount = this.getAllTags().length;

    const average = Math.round(
      (interactivityCount / tagsCount) * enums.Percentages.oneHundredPercent
    );

    const result = levelScale(average);
    return result;
  }

  getTotalMediaCount() {
    let countMedia = 0;

    for (let i = 0; i < enums.MultiMediaTags.length; i++) {
      countMedia += this.$(enums.MultiMediaTags[i]).length;
    }

    return countMedia;
  }

  getSemanticDensity() {
    const rawWordsCount = this.getRawWordsCount();
    const totalMediaCount = this.getTotalMediaCount();
    const average = Math.round(
      (totalMediaCount / rawWordsCount) * enums.Percentages.oneHundredPercent
    );

    const result = levelScale(average);
    return result;
  }

  calcTTR(arr) {
    const wordsCount = arr.length;
    const uniqueWordsCount = new set(arr).size;

    return uniqueWordsCount / wordsCount;
  }

  getTextRichness() {
    const normalizedTxt = this.$(enums.Tags.BODY).text().toLowerCase();
    const doc = nlp.readDoc(normalizedTxt);
    const cleanedWords = doc
      .tokens()
      .filter((t) => t.out(its.type) === "word" && !t.out(its.stopWordFlag))
      .out(its.normal);

    const randomChuncked = _.chunk(cleanedWords, 200);

    let sum = 0;

    for (let i = 0; i < randomChuncked.length; i++) {
      sum += this.calcTTR(randomChuncked[i]);
    }

    const average = Math.round(
      (sum / randomChuncked.length) * enums.Percentages.oneHundredPercent
    );

    return levelScale(average);
  }

  getReadingTime() {
    const doc = nlp.readDoc(this.$(enums.Tags.BODY).text());
    const stats = doc.out(its.readabilityStats);
    return (stats.readingTimeMins + stats.readingTimeSecs / 60).toFixed(2);
  }

  getTextReadability() {
    const str = this.$(enums.Tags.BODY).text();
    const stats = nlp.readDoc(str).out(its.readabilityStats);
    const result = feshScale(stats.fres);

    return result;
  }

  async getDetectedDomaineTerms() {
    const domaineTermsEng = await terms.getDomaineTerms();
    const docText = this.$(enums.Tags.BODY).text().toLowerCase();

    let placeHolderText = ``;
    let regExp = {};
    let matches = 0;

    for (let j = 0; j < domaineTermsEng.length; j++) {
      regExp = new RegExp(
        `((` + domaineTermsEng[j] + `)[a-z]{0,5})` + `+\\b`,
        "g"
      );

      if (docText.match(regExp) === null) continue;
      else {
        matches = docText.match(regExp).length;
        placeHolderText += `${(domaineTermsEng[j] + `,`).repeat(matches)}`;
      }
    }

    const placeHolderArr = Object.entries(
      utils.tokens.bagOfWords(placeHolderText.split(`,`))
    );

    placeHolderArr.pop();
    placeHolderArr.sort((el1, el2) => {
      return el2[1] - el1[1];
    });

    let tmp = ``;
    for (let k = 0; k < placeHolderArr.length; k++) {
      tmp += `,` + placeHolderArr[k][0];
    }

    return tmp.slice(1);
  }

  //  async getDetectedDomaineTerms() {

  // getCleanWords() {
  //   const normalizedTxt = this.$.text().toLowerCase();
  //   const doc = nlp.readDoc(normalizedTxt);
  //   return doc
  //     .tokens()
  //     .filter((t) => t.out(its.type) === "word" && !t.out(its.stopWordFlag))
  //     .out(its.lemma, as.freqTable);
  // }
  //     const domaineTermsEng = await terms.getDomaineTerms();
  //     const cleanWords = this.getCleanWords();

  //     let tmpResults = yallist.create([]);
  //     let results = [];
  //     let k = 1;

  //     for (let i = 0; i < cleanWords.length; i++) {
  //       for (let j = 0; j < domaineTermsEng.length; j++) {
  //         if (cleanWords[i][0] === domaineTermsEng[j]) {
  //           tmpResults.push(cleanWords[i][0]);
  //         }
  //       }
  //     }

  //     results = tmpResults.toArray().join(` `);
  //     return results;
  //   }

  getShortDescription() {
    const firstParagraph = this.$(`p:nth-child(2)`).text();
    return firstParagraph.replace(/\s+|\s+/gm, " ").substring(0, 100) + `...`;
  }

  async getAllFields() {
    const terms = await this.getDetectedDomaineTerms();

    const allFiels = {
      url: this.URL,
      title: this.getTitle(),
      language: this.getLang(),

      //partie LOM metadata
      interActivityType: this.getInterActivityType(),
      interactivityLevel: this.getInteractivityLevel(),
      semanticDensity: this.getSemanticDensity(),

      // partie text processing metadata
      textRichness: this.getTextRichness(),
      readingTime: this.getReadingTime(),
      textReadability: this.getTextReadability(),

      // Partie Domaine Terms
      detectedTerms: terms,

      // Partie short description

      shortDescription: this.getShortDescription(),
    };
    return allFiels;
  }
}

class Resource {
  constructor(url, data) {
    if (typeof data === "undefined") {
      throw new Error("Cannot be called directly");
    } else {
      this.url = url;
      this.data = data;
    }
  }

  static async build(url) {
    const data = await getCheerio(url);
    return new Resource(url, data);
  }

  scrap() {
    return new Annotation(this.data, this.url);
  }
}

module.exports = {
  Resource,
};
