var express = require("express");
var app = express();

var fs = require("fs");
app.use(express.urlencoded({ extended: true }));

const axios = require("axios");

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, response) {
  const city = request.body.cityName;
  const appKey = "90a61a99eed754e6eeec7aec940b3620";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appKey +
    "&units=" +
    unit;

  axios
    .get(url, function (res) {
      console.log(response.statusCode);
    })
    .then((res) => {
      console.log(res.data);
      const data = JSON.stringify(res.data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      response.setHeader("Content-Type", "text/html");
      response.write(
        "<h1>The temperature in " +
          city +
          " is " +
          temp +
          " degree Celcius.</h1>"
      );
      response.write(
        "<p>The weather currently is " + weatherDescription + ".</p>"
      );
      response.write(
        '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png"/>'
      );
      const polution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${appKey}`;
      axios
        .get(polution, function (res) {
          console.log(response.statusCode);
        })
        .then((res2) => {
          const airQuality = res2.data.list[0].main.aqi;
          const pm10 = res2.data.list[0].components.pm10;
          const pm2_5 = res2.data.list[0].components.pm2_5;

          response.write(
            "<h1>The quality of polution in " +
              city +
              " is " +
              airQuality +
              " </h1>"
          );
          response.write("<p>The pm2.5: " + pm2_5 + ".</p>");
          response.write("<p>The pm10: " + pm10 + ".</p>");
          response.end();
        });
    })

    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
