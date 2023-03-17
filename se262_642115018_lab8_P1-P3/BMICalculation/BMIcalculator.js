var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.sendFile(
    __dirname + "/index.html"
  );
});

app.post("/", function (request, response) {
    var weight = request.body.weight;
    var height = request.body.height;
    var bmi = weight / (height * height);
    response.send("The result of the BMI calculation is " + bmi);
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});