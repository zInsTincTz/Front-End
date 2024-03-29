//jshint esversion:6
//Import express, body-parser and ejs to app.js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const lodash = require("lodash");

const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

//set the bodyParser to express app
app.use(bodyParser.urlencoded({ extended: true }));

var posts = [];

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//set the serving static files in the express in a directory named public
app.use(express.static("public"));

app.get("/", function (request, response) {
  response.render("home", { homeStartingContent, posts });
});

app.get("/about", function (request, response) {
  response.render("about", { aboutContent });
});

app.get("/contact", function (request, response) {
  response.render("contact", { contactContent });
});

app.get("/compose", function (request, response) {
  response.render("compose");
});

app.post("/compose", function (request, response) {
  const post = {
    title: request.body.postTitle,
    composeContent: request.body.postBody,
  };
  posts.push(post);
  response.redirect("/");
  console.log(posts);
});

app.get("/posts/:postName", (req, res) => {
  console.log(req.params.postName);
  const foundPost = posts.find((post) => {
    return (
      lodash.lowerCase(post.title) === lodash.lowerCase(req.params.postName)
    );
  });
  res.render("post", { foundPost });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
