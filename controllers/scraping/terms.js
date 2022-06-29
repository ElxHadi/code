const fs = require('fs/promises');

async function getDomaineTerms() {
  try {
    // this is a local file
    const data = await fs.readFile('./controllers/scraping/ontology-terms-en.txt', { encoding: 'utf8' }) ; 
    return data.split(`\r\n`); 
  } catch (err) {
    console.log(err);
  }
}




module.exports = {

    getDomaineTerms
}



