var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

app.get("/", function(req, res) {
    res.send("Testing 1,2,3!");
  });
  

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  