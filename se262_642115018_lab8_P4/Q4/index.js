var express = require("express");
var app = express();

var fs = require("fs");
app.use(express.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/guestbook", function (request, response) {
  response.setHeader("Content-Type", "text/html");
  fs.readFile(__dirname + "/guest.txt", "utf8", function (err, data) {
    if (err) throw err;
    var guestList = data.trim().split("\n");
    response.write(`<h1>The number of guest${guestList.length>1 ? "s":""} is ${guestList.length}</h1>`);
    console.log(guestList);
    guestList.forEach((value, key) => {
      var guest = value.split(",");
      response.write(`<div>
            <b>No: ${++key}</b> <br>
            First name: ${guest[0]} <br>
            Last name: ${guest[1]}</div><br>`);
    });
    response.end();
  });
});
app.post("/", function (request, response) {
  if (request.body.first_name == "" || request.body.last_name == "") {
    return response.send("You must enter both your first name and last name!");
  }
  fs.appendFile(
    __dirname + "/guest.txt",
    `${request.body.first_name},${request.body.last_name}\n`,
    function (err) {
      if (err) throw err;
    }
  );

  response.sendFile(__dirname + "/thankyou.html");
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
