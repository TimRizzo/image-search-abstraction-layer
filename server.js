var express = require('express'),
    app = express(),
    Search = require('bing.search'),
    util = require('util');
    
    require('dotenv').load();
    
    var search = new Search(process.env.BING_KEY);

search.web('Tutta Bella Neapolitan Pizzeria',
  {top: 5},
  function(err, results) {
    if(err) { console.log(err); }
    console.log(util.inspect(results, 
      {colors: true, depth: null}));
  }
);
    