var exphbs     = require("express-handlebars"),
methodOverride = require('method-override'),
bodyParser     = require('body-parser'),
mongoose       = require('mongoose'),
express        = require('express'),
cheerio        = require("cheerio"),
request        = require("request"),
axios          = require("axios");
app            = express();

//SERVER APP DB CONNECT CONFIG
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoArticles";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  //useMongoClient: true
});

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var db = require("./models");

var routes = require("./controllers");


// var Schema = mongoose.Schema;

// Article Schema
// var ArticleSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   link: {
//     type: String,
//     required: true
//   },
//   note: {
//     type: Schema.Types.ObjectId,
//     ref: "Note"
//   }
// });

// // Note Schema MONGOOSE/MODEL CONFIG
// var noteSchema = new Schema({
//     title: String,
//     body: String,
//     created: {
//         type: Date,
//         default: Date.now
//     }
// })

//Note model
// var Note = mongoose.model("Note", noteSchema);
//Article model
// var Article = mongoose.model("Article", ArticleSchema);

//RESTFUL ROUTES
app.get('/', function(req, res){
    res.redirect("/articles");
});
//Index route for notes
app.get('/notes', function(req, res){
    Note.find({}, function(err, notes){
        if (err){
            console.log("ERROR!");
        } else {
            res.render("home", {notes: notes})
        }
    });
});
//New Route
app.get('/notes/new', function(req, res){
    res.render("newNote");
});
//create route
app.post('/notes', function(req, res){
    //create note
    Note.create(req.body.note, function(err, newNote){
        if (err) {
            res.render("new");
        } else {
            res.redirect('/notes')
        }
    });
});
//show route
app.get('/notes/:id', function(req, res){
    Note.findOne({ _id: req.params.id }, function(err, foundNote){
        if (err){
            res.redirect('/notes');
            console.log("ERROR!!!")
        } else {
            res.render("show", {notes: foundNote});
        }
    });
});
//edit route
app.get('/notes/:id/edit', function(req, res){
    Note.findOne({ _id: req.params.id }, function(err, foundNote){
        console.log(foundNote);
        if (err){
            res.redirect('/notes');
            console.log("ERROR!!!")
        } else {
            res.render("editNote", {notes: foundNote});
        }
    });
});
//update route
app.put('/notes/:id', function(req, res){
    Note.findByIdAndUpdate(req.params.id, req.body.note, {new:true}, function(err, updatedNote){
        if (err) {
            console.log("error");
            res.redirect('/notes');
        } else {
            res.redirect('/notes/' + req.params.id);
        }
    })
});

//Delete route
app.delete('/notes/:id', function(req, res){
    res.send("You have reached the destroy route");
});

//Article routes

//Index route for notes
// app.get('/articles', function(req, res){
//     Article.find({}, function(err, articles){
//         if (err){
//             console.log("ERROR!");
//         } else {
//             res.render("home", {articles: articles})
//         }
//     });
// });
//New Route
app.get('/articles/new', function(req, res){
    res.render("newNote");
});

//create route
app.get('/articles', function(req, res){
     
    axios.get("https://www.rushlimbaugh.com/").then(function(response) {
        var $ = cheerio.load(response.data);
    
        $("h2.entry-title").each(function(i, element) {
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
  
         // Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
        });
    
        // If we were able to successfully scrape and save an Article, send a message to the client
        if (err){
            res.redirect('/notes');
            console.log("ERROR!!!")
        } else {
            res.render("articles", {articles: dbArticle});
        }
      });

    //create note
    // Article.create(req.body.note, function(err, newNote){
    //     if (err) {
    //         res.render("new");
    //     } else {
    //         res.redirect('/articles')
    //     }
    // });
});
//show route
app.get('/articles/:id', function(req, res){
    Note.findOne({ _id: req.params.id }, function(err, foundNote){
        if (err){
            res.redirect('/articles');
            console.log("ERROR!!!")
        } else {
            res.render("show", {articles: foundNote});
        }
    });
});
//edit route
app.get('/articles/:id/edit', function(req, res){
    Note.findOne({ _id: req.params.id }, function(err, foundNote){
        console.log(foundNote);
        if (err){
            res.redirect('/articles');
            console.log("ERROR!!!")
        } else {
            res.render("editNote", {articles: foundNote});
        }
    });
});
//update route
app.put('/articles/:id', function(req, res){
    Note.findByIdAndUpdate(req.params.id, req.body.note, {new:true}, function(err, updatedNote){
        if (err) {
            console.log("error");
            res.redirect('/articles');
        } else {
            res.redirect('/articles/' + req.params.id);
        }
    })
});

//Delete route
app.delete('/articles/:id', function(req, res){
    res.send("You have reached the destroy route");
});




var PORT = 3000;
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });