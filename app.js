
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let tasks = [];
let workTasks = [];
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/todoListDB");

  const taskSchema = new mongoose.Schema({
    text: String
  });

  const workTaskSchema = new mongoose.Schema({
    text: String
  });

  const Task = mongoose.model("Task", taskSchema);
  const WorkTask = mongoose.model("WorkTask", workTaskSchema);


  const task = new Task ({text: "Prepare some good food."});
  const workTask = new WorkTask({text: "Finish this project by myself."});

  await task.save();
  await workTask.save();

  tasks = await Task.find();
  workTasks = await WorkTask.find();
}


app.get("/", function (req, res) {
  const currentDate = date.getDate();
  res.render("list", {listTitle: currentDate, newListItems: tasks});
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workTasks});
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
