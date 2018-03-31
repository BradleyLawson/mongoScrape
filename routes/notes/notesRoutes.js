var bodyParser = require('body-parser'),
mongoose       = require('mongoose'),
express        = require('express'),
app            = express();


// create /createNote
// read /allNotes
// update / updateNote
// destroy / destroyNote

// name        Path        HTTP Verb            Purpose
// Index      /notes           GET           List all Notes
// New       /dogs/new        GET           Show new Note form
// create    /notes            POST         Create a new Note, then redirect somewhere
// Show     /notes/:id       GET            Show info about one specific note
// Edit     /notes/:id/edit  GET            Show edit form for one note
// update  /notes/:id       PUT             Update a particular note then redirect somewhere
// Destroy  /notes/:id      DELETE          Delete a particular note then redirect somewhere

var db = require("./models");
