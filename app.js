const express = require('express');
const app = express();
const port = 3000;


// Yelp Fusion API
const yelp = require('yelp-fusion');
const yelpClientId = 'e3NDApeiWuqOe9WClGlvmA';
const apiKey = 'sV2UkyYyhY_cSRhnNgW6p3yOOUAKKgHwVxpu2kYE7VxFxx-uGp7MMHkksfr_JG0rxC98Tft-Fss5o7C8dzDcx8JSibpefqjV82wfBIiso1zplaYg8_oRjA5xYfWbXHYx';
const client = yelp.client(apiKey);

// Link to style.css in public folder
app.use(express.static('public'));

// Route handlers
app.get('/', function (req, res) {
    res.render("home.ejs");
});

app.get('/searchLocation', function (req, res) {
    // console.log(req.query.location);
    client.search({
      location: req.query.location,
      sort_by: 'distance',
      limit: 10
    }).then(response => {
      let data = response.jsonBody.businesses;
      // console.log(data);
      res.render('searchResults.ejs', {data: data})
    }).catch(e => {
      console.log(e);
    });
    res.end;
});

app.listen(port, function() {
    console.log(`Yelp App listening on port ⚡️ ${port}`);
});