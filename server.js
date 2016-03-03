var express = require('express'),
    app = express(),
    Search = require('bing.search'),
    util = require('util');
    
require('dotenv').load();
    
var search = new Search(process.env.BING_KEY);

app.use('/*', function(req, res) {
    console.log(req.params['0']);
    if(req.params['0'] !== "favicon.ico" && req.params['0'] !== "") {
        
        search.web(req.params['0'],
          {top: 5},
          function(err, results) {
            if(err) { console.log(err); }
              var response = util.inspect(results, 
              {colors: true, depth: null});
              res.send(response);
            }
        );
    }
});



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});