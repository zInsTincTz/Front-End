var express = require("express");
var app = express();

var fs = require("fs");

app.get("/", function (req, res) {

  fs.readFile("counter.txt", function (err, data) {
    if (err) throw err;
    var counter = parseInt(data.toString());
    if (counter <= 1) {
      res.send("There has been " + counter + " hit to this page.");
    } else {
      res.send("There have been " + counter + " hits to this page.");
    }

    fs.writeFile("counter.txt", String(++counter), function (err) {
      if (err) throw err;
    });
  });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
