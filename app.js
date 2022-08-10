
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/todoListDB");
}

const itemSchema = new mongoose.Schema({
  text: String
});

const Item = mongoose.model("Item", itemSchema);
const WorkItem = mongoose.model("WorkItem", itemSchema);


app.get("/", function (req, res) {
  const currentDate = date.getDate();

  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {listTitle: currentDate, newListItems: foundItems});
    }
  });
});

app.post("/", function (req, res) {

  if (req.body.list === "Work List") {
    const workItem = new WorkItem ({text: req.body.newItem});
    workItem.save();
    res.redirect("/work");
  } else {
    const item = new Item ({text: req.body.newItem});
    item.save();
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  WorkItem.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {listTitle: "Work List", newListItems: foundItems});
    }
  });
});

app.post("/delete", function(req, res) {
  const itemId = req.body.myCheck;

  Item.findByIdAndRemove(itemId, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
