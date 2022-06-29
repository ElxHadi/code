const scraper = require("./scraping/scraper");


const analyse =  async function (req, res) {

    // scrap then analyse the request
    try {
      const resource = await scraper.Resource.build(req.body.resourceUrl);
      const annotation = resource.scrap();
      const results = await annotation.getAllFields();
      res.send(results);
    } catch (err) {
      console.log(err);
    }
}


module.exports = analyse;


