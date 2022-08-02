
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var currentDay = today.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: currentDay});
});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
