var express = require("express");
var app = express();

var axios = require("axios");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var listID = "71776081a2";

  const url = "https://us14.api.mailchimp.com/3.0/lists/" + listID;
  const options = {
    auth: {
      username: "coffee",
      password: "0a6881f05da22a47636a183f5aaeac89-us14",
    },
  };

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  axios
    .post(url, data, options)
    .then(function (response) {
      console.log(response.data);
      if (response.status === 200 && response.data.error_count === 0) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    })
    .catch(function (error) {
      console.error(error.response.data.errors);
      res.sendFile(__dirname + "/failure.html");
    });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});