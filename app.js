const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const todoName = [];
const items = [];

app.get("/", function(req, res) {
  let day = date.getDate();
  let timeday = date.getTimeDate();
  res.render("index", {todoName: todoName, listTitle: day, timeStamp: timeDay});
})

app.post("/", function(req, res) {
  let listName = req.body.items;
  todoName.push(listName);
  res.redirect("/");
})



app.get("/list", function(req, res) {
  res.render("list", {todoName: todoName, items: items, timeStamp: timeDay});
})
//
app.post("/list", function(req, res) {

  if (req.body.create === "list") {
    var todoListName = req.body.todoName;
    todoName.push(todoListName);
    res.redirect("/list");
  } else if (req.body.create === "item") {
    var todoListItem = req.body.items;
    items.push(todoListItem);
    res.redirect("/list");
  } else {
    console.log(error);
  }
})


app.listen(3000, function() {
  console.log("server started and listening on port 3000");
})
