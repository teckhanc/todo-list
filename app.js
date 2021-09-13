const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var items = [];
var todoName = [];

var today = new Date();

var options = {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "2-digit"
}

var day = today.toLocaleDateString("en-AU", options);

var timeToday = new Date();

var options2 = {
  day: "numeric",
  month: "numeric",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}

var timeDay = timeToday.toLocaleDateString("en-AU", options2);



app.get("/", function(req, res) {
  console.log(req.body);
  res.render("index", {todoName: todoName, listTitle: day, timeStamp: timeDay});
})

app.post("/", function(req, res) {
  var listName = req.body.items;
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
