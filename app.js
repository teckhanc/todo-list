const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const _ = require('lodash');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const todoName = [];
const items = [];

const lists = [];

app.get("/", function(req, res) {
  let day = date.getDate();
  let timeDay = date.getTimeDate();
  res.render("index", {todoName: todoName, listTitle: day, timeStamp: timeDay});
})

app.post("/", function(req, res) {
  let listName = req.body.items;
  todoName.push(listName);
  res.redirect("/");
})

app.get("/create", function(req, res) {
  res.render("create")
})

app.post("/create", function(req, res) {
  var todoListName = req.body.todoName;
  todoName.push(todoListName);
  const list = {
    title: req.body.todoName,
    content: []
  }
  lists.push(list);
  res.redirect("/");
})

app.get("/list/:id", function(req, res) {
  let x = _.lowerCase(req.params.id);
  lists.forEach(function(list) {
    let y = _.lowerCase(list.title);
    if (y === x) {
      res.render("list", {todoName: list.title, items: list.content})
    } else {
      console.log("link not found");
    }
  })
})

app.post("/list/:id", function(req, res) {
  let x = _.lowerCase(req.params.id);
  let z = req.body.items
  lists.forEach(function(list) {
    let y = _.lowerCase(list.title);
    if (y === x) {
      list.content.push(z);
      res.redirect("/list/"+ x);
    } else {
      console.log("error");
    }
  })
})

app.listen(3000, function() {
  console.log("server started and listening on port 3000");
})
