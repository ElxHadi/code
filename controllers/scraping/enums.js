
/// NON-DEPENDANT Enums data

const Percentages = {
    zeroPercent : 0,
    tenPercent : 10,
    twentyPercent: 20,
    thirthyPercent : 30,
    fourthyPercent: 40,
    fifthyPercent : 50,
    sixthyPercent: 60,
    seventyPercent : 70,
    eithyPercent: 80,
    ninthyPercent : 90,
    oneHundredPercent: 100,
  };
  
  const Levels = {
    VERY_HIGH: `very high`,
    HIGH: `high`,
    MEDIUM: `medium`,
    LOW: `low`,
    VERY_LOW: `very low`,
  };
  
  const Types = {
    ACTIVE: `active`,
    EXPOSITIVE: `expositive`,
    BOTH: `both`,
  };
  
  const Err = {
    TAG_NOT_FOUND: `TAG NOT FOUND!`,
    COULD_NOT_FIGURE_IT_OUT: `could not figure out?`,
  };
  
  const FleschScore = {
    VERY_EASY_TO_READ: `very easy to read`,
    EASY_TO_READ: `easy to read`,
    FAIRLY_EASY_TO_READ: `fairly easy to read`,
    PLAIN_ENGLISH: `plain english,understood by 13- to 15-year-old students`,
    FAIRLY_DIFFICULT: `fairly difficult`,
    DIFFICULT_TO_READ: `difficult to read`,
    VERY_DIFFICULT_TO_READ: `very difficult to read`,
    EXTREAMLY_DIFFICULT_TO_READ: `extremely difficult to read`,
  };
  
  const Language = {
    EN: `en`,
    EN_US: `en-US`,
    EN_GB: `en-GB`,
  };

  const InterActiveTags = [
    // mdn reference
    "a",
    "button",
    "form",
    "details",
    "embed",
    "iframe",
    "label",
    "select",
    "textarea",
    "dialog",
  
    "img[usemap]",
    'input:not([type="hidden"])',
    "audio[controls]",
    "object[usemap]",
    "video[controls]",
    'menu[type ="toolbar"]',
  ];


  const MultiMediaTags = ["img", "svg", "audio", "video", "object", "embed", "iframe"];
  
  const Tags = {

    HTML : `html`,
    LANG : `lang`,
    TITLE : `title`,
    BODY : `body`,
    HEADER1 : `h1`,
    HEADER2 : `h2`,
    HEADER3 : `h3`,
    HEADER4 : `h4`,
    HEADER5 : `h5`,
    HEADER6 : `h6`,




  }
  
  const Selectors = {

    EVERY_THING_IN_BODY : `body *`
  }



  Object.freeze(Levels, Percentages , Types, Language , FleschScore, Err, InterActiveTags, MultiMediaTags, Tags, Selectors);







  module.exports = {
    Levels, 
    Percentages,
    Types,
    Language,
    FleschScore,
    InterActiveTags,
    MultiMediaTags,
    Tags,
    Selectors,
    Err

  };





