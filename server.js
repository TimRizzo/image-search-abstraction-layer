var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Search = require('bing.search'),
    util = require('util');
    
    
    
require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);

var testSchema = mongoose.Schema({ name: String }),
    Test = mongoose.model('Test', testSchema);

var testDoc = new Test({ name: "George" });

// Save a test doc to db, uses methods on specific instance of model
testDoc.save(function(err, testDoc) {
    if(err) { console.log(err); }
    console.log(testDoc);
});

// Recall test doc, using model protoype
Test.find(function(err, tests) {
  if (err) { console.error(err); }
  console.log(tests);
});
    
    
var search = new Search(process.env.BING_KEY);

app.use('/imgsearch/*', function(req, res) {
    console.log(req.params['0']);
    if(req.params['0'] !== "favicon.ico" && req.params['0'] !== "") {
        
        search.web(req.params['0'],
          {top: 5},
          function(err, results) {
            if(err) { console.log(err); }
              
              
              var newDoc = new Test({ name: results });
              
              newDoc.save(function(err, newDoc) {
                if(err) { console.log(err); }
                console.log(newDoc);
              });
              
              res.send(results);
            }
        );
    }
});



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});