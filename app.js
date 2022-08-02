
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.send("<h1> Hello </h1>");
});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
