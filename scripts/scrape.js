alert("Connected");

$.getJSON("/Headlines", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });

  $('#scrapeArticles').on('click', function(){
    alert('Connected');
  });


  // A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("https://news.google.com/news/?ned=us&gl=US&hl=en").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within a c-wiz tag and M1Uqc class, and do the following:
    $("c-wiz.M1Uqc").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
console.log(result.title);
console.log(result.link);
//***********Commented out during testing */

      //Create a new Headline using the `result` object built from scraping
      db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          console.log(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    

    // If we were able to successfully scrape and save an Headline, send a message to the client
    //res.render("home");
    res.send("Scrape Complete");
  });
});